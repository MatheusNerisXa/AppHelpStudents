import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import { URL_DISCIPLINE } from '../../../shared/constants/urls';
import { useRequest } from '../../../shared/hooks/useRequest';

const Dashboard = () => {
  const [disciplines, setDisciplines] = useState([]);
  const { getUserFromStorage } = useRequest();
  const [userId, setUserId] = useState(null);

  const fetchDisciplines = () => {
    fetch(URL_DISCIPLINE + `${userId}`)
      .then((response) => response.json())
      .then((data) => setDisciplines(data))
      .catch((error) => console.error('Error fetching disciplines:', error));
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserFromStorage();
      setUserId(userData?.id);
    };

    fetchUserData();
  }, [getUserFromStorage]);

  const calculateProgress = (status) => {
    const totalDisciplines = disciplines.length;
    if (totalDisciplines > 0) {
      return countDisciplinesByStatus(status) / totalDisciplines;
    }
    return 0;
  };

  useEffect(() => {
    if (isFocused && userId !== null) {
      fetchDisciplines();
    }
  }, [isFocused, userId]);

  const countDisciplinesByStatus = (status) => {
    return disciplines.filter((discipline) => discipline.status_discipline === status).length;
  };

  const isFocused = useIsFocused();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}> Matérias</Text>
      <View style={styles.statsContainer}>
        <View style={styles.statsItem}>
          <ProgressBar progress={calculateProgress(3)} color="#3498db" style={styles.progressBar} />
          <Text style={styles.statsValue}>{countDisciplinesByStatus(3)}</Text>
          <Text style={styles.statsLabel}>Cursando</Text>
        </View>
        <View style={styles.statsItem}>
          <ProgressBar progress={calculateProgress(1)} color="#2ecc71" style={styles.progressBar} />
          <Text style={styles.statsValue}>{countDisciplinesByStatus(1)}</Text>
          <Text style={styles.statsLabel}>Aprovadas</Text>
        </View>
        <View style={styles.statsItem}>
          <ProgressBar progress={calculateProgress(2)} color="#e74c3c" style={styles.progressBar} />
          <Text style={styles.statsValue}>{countDisciplinesByStatus(2)}</Text>
          <Text style={styles.statsLabel}>Reprovadas</Text>
        </View>
        <View style={styles.statsItem}>
          <ProgressBar progress={calculateProgress(4)} color="#f39c12" style={styles.progressBar} />
          <Text style={styles.statsValue}>{countDisciplinesByStatus(4)}</Text>
          <Text style={styles.statsLabel}>Sub</Text>
        </View>
      </View>
      <View style={styles.totalContainer}>
        <ProgressBar progress={1} color="#555" style={styles.totalProgressBar} />
        <Text style={styles.totalText}>{disciplines.length} Total Disciplinas</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statsItem: {
    flex: 1,
    alignItems: 'center',
  },
  progressBar: {
    width: Dimensions.get('window').width * 0.15,
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statsLabel: {
    fontSize: 14,
    color: '#555',
  },
  totalContainer: {
    alignItems: 'center',
  },
  totalProgressBar: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
});

export default Dashboard;
