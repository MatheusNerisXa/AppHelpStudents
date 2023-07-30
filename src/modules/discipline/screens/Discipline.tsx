import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import { useRequest } from '../../../shared/hooks/useRequest';
import disciplineStyle from '../styles/discipline.style';

const Discipline = () => {
  const [disciplines, setDisciplines] = useState([]);
  const { getUserFromStorage } = useRequest();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserFromStorage();
      setUserId(userData?.id);
    };

    fetchUserData();
  }, [getUserFromStorage]);

  useEffect(() => {
    if (userId !== null) {
      fetchDisciplines();
    }
  }, [userId]);

  const fetchDisciplines = () => {
    fetch(`http://192.168.1.8:8080/discipline/user/${userId}`)
      .then((response) => response.json())
      .then((data) => setDisciplines(data))
      .catch((error) => console.error('Error fetching disciplines:', error));
  };

  const formatBrazilianDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  const renderItem = ({ item }) => {
    return (
      <View style={disciplineStyle.item}>
        <Text style={disciplineStyle.name}>{item.name}</Text>
        <Text>{item.status_discipline}</Text>
        <Text>Início: {formatBrazilianDate(item.dateStart)}</Text>
        <Text>Fim: {formatBrazilianDate(item.dateEnd)}</Text>
      </View>
    );
  };

  return (
    <View style={disciplineStyle.container}>
      <FlatList
        data={disciplines}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Discipline;
