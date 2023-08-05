import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

import { URL_DISCIPLINE } from '../../../shared/constants/urls';
import { useRequest } from '../../../shared/hooks/useRequest';
import disciplineStyle from '../styles/discipline.style';

const statusMap = {
  1: 'Aprovado',
  2: 'Reprovado',
  3: 'Cursando',
  4: 'Sub',
};

const Discipline = () => {
  const [disciplines, setDisciplines] = useState([]);
  const { getUserFromStorage } = useRequest();
  const [userId, setUserId] = useState(null);

  const fetchDisciplines = () => {
    fetch(URL_DISCIPLINE + `${userId}`)
      .then((response) => response.json())
      .then((data) => setDisciplines(data))
      .catch((error) => console.error('Error fetching disciplines:', error));
  };

  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserFromStorage();
      setUserId(userData?.id);
    };

    fetchUserData();
  }, [getUserFromStorage]);

  useEffect(() => {
    if (isFocused && userId !== null) {
      fetchDisciplines();
    }
  }, [isFocused, userId]);

  const formatBrazilianDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  const renderItem = ({ item, index }) => {
    const fixedColors = [
      '#27cd5e',
      '#11697fce',
      '#0be754',
      '#f9d2c2',
      '#f9f5c2',
      '#c2f9f5',
      '#f5c2f9',
      '#c2f5f9',
    ];
    return (
      <TouchableOpacity
        style={[disciplineStyle.item, { backgroundColor: fixedColors[index % fixedColors.length] }]}
      >
        <Text style={disciplineStyle.name}>{item.name}</Text>
        <Text>{statusMap[item.status_discipline as keyof typeof statusMap]}</Text>
        <Text>Início: {formatBrazilianDate(item.dateStart)}</Text>
        <Text>Fim: {formatBrazilianDate(item.dateEnd)}</Text>
      </TouchableOpacity>
    );
  };

  const navigation = useNavigation();

  const handleCreateDiscipline = () => {
    navigation.navigate('DisciplineCreationScreen');
  };

  return (
    <View style={disciplineStyle.container}>
      <FlatList
        data={disciplines}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />

      <TouchableOpacity style={disciplineStyle.addButton} onPress={handleCreateDiscipline}>
        <Text style={disciplineStyle.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Discipline;
