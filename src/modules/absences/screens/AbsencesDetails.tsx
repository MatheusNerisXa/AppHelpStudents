import { useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native';

import { URL_ABSENCES } from '../../../shared/constants/urls';
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
  const [refreshing, setRefreshing] = useState(false);

  const fetchAbsenceDetails = useCallback(async () => {
    try {
      const response = await fetch(URL_ABSENCES + `${disciplineId}`);
      const data: AbsenceDetails[] = await response.json();

      data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setAbsenceDetails(data);

      const total = data.reduce((acc, item) => acc + item.number_of_absences, 0);
      setTotalFaltas(total);

      setIsLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error('Erro ao buscar detalhes da falta:', error);
      setIsLoading(false);
      setRefreshing(false);
    }
  }, [disciplineId]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchAbsenceDetails();
  };

  useEffect(() => {
    fetchAbsenceDetails();
  }, [fetchAbsenceDetails]);

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
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={AbsencesDetailsStyle.item}>
            <Text style={AbsencesDetailsStyle.info}>
              <Text style={AbsencesDetailsStyle.bold}>Data:</Text> {formatDate(item.created_at)}
            </Text>
            <Text style={AbsencesDetailsStyle.info}>
              <Text style={AbsencesDetailsStyle.bold}>Motivo:</Text> {item.reason || 'N/A'}
            </Text>
            <Text style={AbsencesDetailsStyle.info}>
              <Text style={AbsencesDetailsStyle.bold}>Faltas no dia:</Text>{' '}
              {item.number_of_absences}
            </Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#007AFF" />
        }
      />
    </View>
  );
};

export default AbsencesDetails;
