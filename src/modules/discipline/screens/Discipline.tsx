import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { URL_DISCIPLINE } from '../../../shared/constants/urls';
import { useRequest } from '../../../shared/hooks/useRequest';
import disciplineStyle from '../styles/discipline.style';

const statusMap = {
  1: { label: 'Aprovado', color: '#057a11' },
  2: { label: 'Reprovado', color: '#ff0d0d' },
  3: { label: 'Cursando', color: '#13035cce' },
  4: { label: 'Sub', color: '#636302' },
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

  const cardColors = [
    '#82C2E2',
    '#B8A8D3',
    '#F5B090',
    '#8AC6D0',
    '#F3D250',
    '#F0A3A3',
    '#9CD7A9',
    '#E6AF4B',
  ];

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
    const statusInfo = statusMap[item.status_discipline] || {};
    return (
      <TouchableOpacity
        style={[disciplineStyle.item, { backgroundColor: cardColors[index % cardColors.length] }]}
      >
        <View style={disciplineStyle.cardHeader}>
          <Text style={disciplineStyle.name}>{item.name}</Text>
          <View
            style={[
              disciplineStyle.statusIndicator,
              { backgroundColor: statusInfo.color || '#000' },
            ]}
          />
        </View>
        <Text style={disciplineStyle.dateText}>
          {formatBrazilianDate(item.dateStart)} - {formatBrazilianDate(item.dateEnd)}
        </Text>
        <Text style={[disciplineStyle.statusText, { color: statusInfo.color || '#000' }]}>
          {statusInfo.label || 'Sem Status'}
        </Text>
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
          placeholderTextColor="#666"
          value={searchText}
          onChangeText={handleSearch}
          autoFocus
        />
      </View>

      <FlatList
        data={filteredDisciplines}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        // eslint-disable-next-line react/no-unstable-nested-components
        ItemSeparatorComponent={() => <View style={disciplineStyle.separator} />}
        // eslint-disable-next-line react/no-unstable-nested-components
        ListEmptyComponent={() => (
          <Text style={disciplineStyle.emptyText}>Nenhuma matéria encontrada.</Text>
        )}
      />

      <TouchableOpacity style={disciplineStyle.addButton} onPress={handleCreateDiscipline}>
        <Text style={disciplineStyle.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Discipline;
