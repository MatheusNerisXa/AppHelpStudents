import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
  const { getUserFromStorage } = useRequest();
  const [userId, setUserId] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [disciplines, setDisciplines] = useState([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const fetchDisciplines = () => {
    if (userId) {
      fetch(URL_DISCIPLINE + `${userId}`)
        .then((response) => response.json())
        .then((data) => setDisciplines(data))
        .catch((error) => console.error('Error fetching disciplines:', error))
        .finally(() => setRefreshing(false));
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchDisciplines();
  };
  const formatDaysOfWeek = (item) => {
    const daysOfWeek = [];
    if (item.monday) {
      daysOfWeek.push('Seg');
    }
    if (item.tuesday) {
      daysOfWeek.push('Ter');
    }
    if (item.wednesday) {
      daysOfWeek.push('Qua');
    }
    if (item.thursday) {
      daysOfWeek.push('Qui');
    }
    if (item.friday) {
      daysOfWeek.push('Sex');
    }
    if (item.saturday) {
      daysOfWeek.push('Sáb');
    }
    if (item.sunday) {
      daysOfWeek.push('Dom');
    }
    return daysOfWeek.join(', ');
  };

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

  const handleCreateDiscipline = () => {
    navigation.navigate('DisciplineCreationScreen');
  };

  const renderItem = ({ item, index }) => {
    if (item.status_discipline === 5) {
      return null;
    }

    const statusInfo = statusMap[item.status_discipline] || {};
    const navigateToDetails = () => {
      navigation.navigate('DisciplineDetails', { disciplineId: item.id });
    };
    return (
      <TouchableOpacity
        style={[disciplineStyle.item, { backgroundColor: cardColors[index % cardColors.length] }]}
        onPress={navigateToDetails}
      >
        <View style={disciplineStyle.cardHeader}>
          <Text style={disciplineStyle.name}>{item.name}</Text>
          <View style={disciplineStyle.statusAndLabel}>
            <View
              style={[
                disciplineStyle.statusIndicator,
                { backgroundColor: statusInfo.color || '#000' },
              ]}
            />
            <Text style={[disciplineStyle.statusText, { color: statusInfo.color || '#000' }]}>
              {statusInfo.label || 'Sem Status'}
            </Text>
          </View>
        </View>
        <Text style={disciplineStyle.dateText}>
          Período: {formatBrazilianDate(item.dateStart)} até {formatBrazilianDate(item.dateEnd)}
        </Text>
        <Text style={disciplineStyle.roomText}>Sala: {item.room}</Text>
        <Text style={disciplineStyle.hourText}>Horário: {item.hour}</Text>
        <Text style={disciplineStyle.daysText}>Dias de Aula: {formatDaysOfWeek(item)}</Text>
        <Text style={disciplineStyle.teacherText}>Professor: {item.teacher}</Text>
      </TouchableOpacity>
    );
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredDisciplines = searchText
    ? disciplines.filter((discipline) =>
        discipline.name.toLowerCase().includes(searchText.toLowerCase()),
      )
    : disciplines;

  const cardColors = [
    '#7d89d9',
    '#f281db',
    '#f09d5c',
    '#8AC6D0',
    '#e4ce75',
    '#F0A3A3',
    '#9ee8ae',
    '#b7a481',
  ];

  return (
    <View style={disciplineStyle.container}>
      <View style={disciplineStyle.searchContainer}>
        <TextInput
          style={disciplineStyle.searchInput}
          placeholder="Digite o nome da matéria"
          placeholderTextColor="#666"
          value={searchText}
          onChangeText={handleSearch}
          autoFocus={false}
        />
      </View>

      {isFocused && (
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
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#007AFF" />
          }
        />
      )}
      <TouchableOpacity style={disciplineStyle.addButton1} onPress={handleCreateDiscipline}>
        <View style={disciplineStyle.addCircle}>
          <Text style={disciplineStyle.addText}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Discipline;
