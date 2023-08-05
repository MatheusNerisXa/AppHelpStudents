import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
  const [searchText, setSearchText] = useState('');

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
      '#a4375b',
      '#c85629',
      '#716d38',
      '#6133be',
      '#95479a',
      '#2a6b70',
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

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredDisciplines = disciplines.filter((discipline) =>
    discipline.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={disciplineStyle.container}>
      <View style={disciplineStyle.searchContainer}>
        <TextInput
          style={disciplineStyle.searchInput}
          placeholder="Digite o nome da matéria"
          placeholderTextColor="#FFFFFF"
          value={searchText}
          onChangeText={handleSearch}
          autoFocus
        />
      </View>

      <View>
        <FlatList
          data={filteredDisciplines}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>

      <TouchableOpacity style={disciplineStyle.addButton} onPress={handleCreateDiscipline}>
        <Text style={disciplineStyle.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Discipline;
