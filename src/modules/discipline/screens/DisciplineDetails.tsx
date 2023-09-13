import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { URL_DISCIPLINEID } from '../../../shared/constants/urls';

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

const DisciplineDetails = ({ route }) => {
  const { disciplineId } = route.params;
  const [discipline, setDiscipline] = useState<Discipline | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDisciplineDetails = () => {
    fetch(URL_DISCIPLINEID + `${disciplineId}`)
      .then((response) => response.json())
      .then((data: Discipline) => {
        console.log('Dados da disciplina:', data);
        // Mapeia o status para a string correspondente
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

  // Função para formatar a data no formato brasileiro
  const formatBrazilianDate = (dateString) => {
    if (!dateString) {
      return 'Data desconhecida'; // Trata datas ausentes
    }

    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0'); // Mês começa em 0
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Text style={styles.headerText}>Detalhes da Disciplina</Text> */}
      </View>

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.value}>{discipline.name}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.label}>Status:</Text>
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusColorIndicator,
                { backgroundColor: discipline.status_color || '#000' },
              ]}
            />
            <Text style={styles.statusValue}>{discipline.status_discipline || 'Desconhecido'}</Text>
          </View>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.label}>Data de Início:</Text>
          <Text style={styles.value}>{formatBrazilianDate(discipline.dateStart)}</Text>
        </View>

        <View style={styles.detailItem}>
          <Text style={styles.label}>Data de Término:</Text>
          <Text style={styles.value}>{formatBrazilianDate(discipline.dateEnd)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  details: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusColorIndicator: {
    width: 16,
    height: 16,
    marginRight: 8,
    borderRadius: 8,
  },
  statusValue: {
    fontSize: 16,
  },
});

export default DisciplineDetails;
