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
        <View style={dashboardStyles.statsItem}>
          <ProgressBar
            progress={calculateProgress(3)}
            color="#3498db"
            style={dashboardStyles.progressBar}
          />
          <Text style={dashboardStyles.statsValue}>{countDisciplinesByStatus(3)}</Text>
          <Text style={dashboardStyles.statsLabel}>Cursando</Text>
        </View>
        <View style={dashboardStyles.statsItem}>
          <ProgressBar
            progress={calculateProgress(1)}
            color="#2ecc71"
            style={dashboardStyles.progressBar}
          />
          <Text style={dashboardStyles.statsValue}>{countDisciplinesByStatus(1)}</Text>
          <Text style={dashboardStyles.statsLabel}>Aprovadas</Text>
        </View>
        <View style={dashboardStyles.statsItem}>
          <ProgressBar
            progress={calculateProgress(2)}
            color="#e74c3c"
            style={dashboardStyles.progressBar}
          />
          <Text style={dashboardStyles.statsValue}>{countDisciplinesByStatus(2)}</Text>
          <Text style={dashboardStyles.statsLabel}>Reprovadas</Text>
        </View>
        <View style={dashboardStyles.statsItem}>
          <ProgressBar
            progress={calculateProgress(4)}
            color="#f39c12"
            style={dashboardStyles.progressBar}
          />
          <Text style={dashboardStyles.statsValue}>{countDisciplinesByStatus(4)}</Text>
          <Text style={dashboardStyles.statsLabel}>Sub</Text>
        </View>
      </View>
      <View style={dashboardStyles.totalContainer}>
        <ProgressBar progress={1} color="#555" style={dashboardStyles.totalProgressBar} />
        <Text style={dashboardStyles.totalText}>{disciplines.length} Total Disciplinas</Text>
      </View>
    </View>
  );
};

export default Dashboard;
