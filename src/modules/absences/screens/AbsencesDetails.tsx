import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import AbsencesDetailsStyle from '../styles/absencesDetails.style';

interface AbsenceDetails {
  reason: string | null;
  created_at: string;
  number_of_absences: number;
  discipline_id: number;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const AbsencesDetails = () => {
  const route = useRoute();
  const { disciplineId } = route.params;

  const [absenceDetails, setAbsenceDetails] = useState<AbsenceDetails[]>([]);
  const [totalFaltas, setTotalFaltas] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAbsenceDetails = async () => {
      try {
        const response = await fetch(`http://192.168.1.5:8080/absences/${disciplineId}`);
        const data: AbsenceDetails[] = await response.json();
        setAbsenceDetails(data);

        const total = data.reduce((acc, item) => acc + item.number_of_absences, 0);
        setTotalFaltas(total);

        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar detalhes da falta:', error);
        setIsLoading(false);
      }
    };

    fetchAbsenceDetails();
  }, [disciplineId]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }

  if (!absenceDetails || absenceDetails.length === 0) {
    return <Text>Nenhum detalhe da falta encontrado.</Text>;
  }

  return (
    <View style={AbsencesDetailsStyle.container}>
      <Text style={AbsencesDetailsStyle.totalFaltas}>Faltas do dia: {totalFaltas}</Text>
      <FlatList
        data={absenceDetails}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={AbsencesDetailsStyle.item}>
            <Text style={AbsencesDetailsStyle.info}>
              <Text style={AbsencesDetailsStyle.bold}>Data:</Text> {formatDate(item.created_at)}
            </Text>
            <Text style={AbsencesDetailsStyle.info}>
              <Text style={AbsencesDetailsStyle.bold}>Motivo:</Text> {item.reason || 'N/A'}
            </Text>
            <Text style={AbsencesDetailsStyle.info}>
              <Text style={AbsencesDetailsStyle.bold}>Total de Faltas:</Text>{' '}
              {item.number_of_absences}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default AbsencesDetails;
