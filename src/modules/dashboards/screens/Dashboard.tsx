import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import { URL_DISCIPLINE } from '../../../shared/constants/urls';
import { useRequest } from '../../../shared/hooks/useRequest';
import dashboardStyles from '../styles/dashboard.style';

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
    <View style={dashboardStyles.container}>
      <Text style={dashboardStyles.heading}> Matérias</Text>
      <View style={dashboardStyles.statsContainer}>
        {[1, 2, 3, 4].map((status) => (
          <View style={dashboardStyles.statsItem} key={status}>
            <ProgressBar
              progress={calculateProgress(status)}
              color={statusColors[status]}
              style={dashboardStyles.progressBar}
            />
            <Text style={dashboardStyles.statsValue}>{countDisciplinesByStatus(status)}</Text>
            <Text style={dashboardStyles.statsLabel}>{statusLabels[status]}</Text>
          </View>
        ))}
      </View>
      <View style={dashboardStyles.totalContainer}>
        <ProgressBar progress={1} color="#555" style={dashboardStyles.totalProgressBar} />
        <Text style={dashboardStyles.totalText}>{disciplines.length} Total Disciplinas</Text>
      </View>
    </View>
  );
};

const statusColors = {
  1: '#2ecc71',
  2: '#e74c3c',
  3: '#3498db',
  4: '#f39c12',
};

const statusLabels = {
  1: 'Aprovadas',
  2: 'Reprovadas',
  3: 'Cursando',
  4: 'Sub',
};

export default Dashboard;
