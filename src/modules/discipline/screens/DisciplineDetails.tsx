import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import { URL_DISCIPLINEID } from '../../../shared/constants/urls';
import disciplineDetailsStyle from '../styles/disciplineDetails';

interface Discipline {
  id: number;
  name: string;
  status_discipline: number;
  dateStart: string;
  dateEnd: string;
}

const statusMap = {
  1: { label: 'Aprovado', color: '#057a11' },
  2: { label: 'Reprovado', color: '#ff0d0d' },
  3: { label: 'Cursando', color: '#13035cce' },
  4: { label: 'Sub', color: '#636302' },
};

const DisciplineDetails = ({ route, navigation }) => {
  const { disciplineId } = route.params;
  const [discipline, setDiscipline] = useState<Discipline | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDisciplineDetails = () => {
    fetch(URL_DISCIPLINEID + `${disciplineId}`)
      .then((response) => response.json())
      .then((data: Discipline) => {
        console.log('Dados da disciplina:', data);
        const statusInfo = statusMap[data.status_discipline] || {
          label: 'Desconhecido',
          color: '#000',
        };
        data.status_discipline = statusInfo.label;
        data.status_color = statusInfo.color;
        setDiscipline(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar detalhes da disciplina:', error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchDisciplineDetails();
  }, [disciplineId]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }

  if (!discipline) {
    return <Text>Nenhum detalhe da disciplina encontrado.</Text>;
  }

  const formatBrazilianDate = (dateString) => {
    if (!dateString) {
      return 'Data desconhecida';
    }

    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleAddGrade = () => {
    navigation.navigate('CadastroNotaScreen', { disciplineId: discipline.id });
  };

  const handleAddAttendance = () => {
    navigation.navigate('CadastroFaltaScreen', { disciplineId: discipline.id });
  };

  const handleConfigure = () => {
    navigation.navigate('ConfiguracoesScreen');
  };

  return (
    <View style={disciplineDetailsStyle.container}>
      <View style={disciplineDetailsStyle.header}>
        {/* <Text style={styles.headerText}>Detalhes da Disciplina</Text> */}
      </View>

      <View style={disciplineDetailsStyle.details}>
        <View style={disciplineDetailsStyle.detailItem}>
          <Text style={disciplineDetailsStyle.label}>Nome:</Text>
          <Text style={disciplineDetailsStyle.value}>{discipline.name}</Text>
        </View>

        <View style={disciplineDetailsStyle.detailItem}>
          <Text style={disciplineDetailsStyle.label}>Status:</Text>
          <View style={disciplineDetailsStyle.statusContainer}>
            <View
              style={[
                disciplineDetailsStyle.statusColorIndicator,
                { backgroundColor: discipline.status_color || '#000' },
              ]}
            />
            <Text style={disciplineDetailsStyle.statusValue}>
              {discipline.status_discipline || 'Desconhecido'}
            </Text>
          </View>
        </View>

        <View style={disciplineDetailsStyle.detailItem}>
          <Text style={disciplineDetailsStyle.label}>Data de Início:</Text>
          <Text style={disciplineDetailsStyle.value}>
            {formatBrazilianDate(discipline.dateStart)}
          </Text>
        </View>

        <View style={disciplineDetailsStyle.detailItem}>
          <Text style={disciplineDetailsStyle.label}>Data de Término:</Text>
          <Text style={disciplineDetailsStyle.value}>
            {formatBrazilianDate(discipline.dateEnd)}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={disciplineDetailsStyle.button} onPress={handleAddGrade}>
        <Text style={disciplineDetailsStyle.buttonText}>Cadastrar Nota</Text>
      </TouchableOpacity>

      <TouchableOpacity style={disciplineDetailsStyle.button} onPress={handleAddAttendance}>
        <Text style={disciplineDetailsStyle.buttonText}>Cadastrar Falta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={disciplineDetailsStyle.button} onPress={handleConfigure}>
        <Text style={disciplineDetailsStyle.buttonText}>Configurar Matéria</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DisciplineDetails;
