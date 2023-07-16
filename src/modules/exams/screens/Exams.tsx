import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, Text, TextInput, View } from 'react-native';
import { List } from 'react-native-paper';

import { ExamsStyle } from '../styles/exams.style';

interface Exam {
  id: number;
  description: string;
  title: string;
  registrationStart: string;
  registrationEnd: string;
  exam1Date: string;
  exam2Date: string;
  resultDate: string;
}

const ExamItem = ({ exam }: { exam: Exam }) => {
  const formatBrazilianDate = (date: string) => {
    return format(new Date(date), 'dd/MM/yyyy');
  };

  return (
    <List.Item
      key={exam.id}
      title={exam.title}
      titleNumberOfLines={2}
      // eslint-disable-next-line react/no-unstable-nested-components
      description={() => (
        <View style={ExamsStyle.descriptionContainer}>
          <Text style={ExamsStyle.descriptionText}>
            <Text style={ExamsStyle.boldText}>Data de Inscrição:</Text>{' '}
            {formatBrazilianDate(exam.registrationStart)} a{' '}
            {formatBrazilianDate(exam.registrationEnd)}
          </Text>
          <Text style={ExamsStyle.descriptionText}>
            <Text style={ExamsStyle.boldText}>Data da Prova:</Text>{' '}
            {formatBrazilianDate(exam.exam1Date)}
          </Text>
          {exam.exam2Date && (
            <Text style={ExamsStyle.descriptionText}>
              <Text style={ExamsStyle.boldText}>2ª Fase da Prova:</Text>{' '}
              {formatBrazilianDate(exam.exam2Date)}
            </Text>
          )}
          {exam.resultDate && (
            <Text style={ExamsStyle.descriptionText}>
              <Text style={ExamsStyle.boldText}>Data do Resultado:</Text>{' '}
              {formatBrazilianDate(exam.resultDate)}
            </Text>
          )}
        </View>
      )}
      titleStyle={ExamsStyle.title}
      style={ExamsStyle.listItem}
    />
  );
};

const ExamComponent = () => {
  const [exams, setExams] = useState<Exam[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');

  const fetchData = () => {
    fetch('http://192.168.1.13:8080/exams')
      .then((response) => response.json())
      .then((data) => setExams(data))
      .finally(() => setRefreshing(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const filteredExams = exams.filter((exam) =>
    exam.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  const renderExams = () => {
    if (filteredExams.length === 0 && searchText.length > 0) {
      return (
        <View style={ExamsStyle.container}>
          <Text>Nenhuma faculdade ou escola encontrada com o nome "{searchText}"</Text>
        </View>
      );
    }

    return filteredExams.map((exam) => <ExamItem key={exam.id} exam={exam} />);
  };

  return (
    <View style={ExamsStyle.container}>
      <View style={ExamsStyle.searchContainer}>
        <TextInput
          style={ExamsStyle.searchInput}
          placeholder="Digite a universidade ou escola"
          placeholderTextColor="#FFFFFF"
          value={searchText}
          onChangeText={handleSearch}
          autoFocus
        />
      </View>
      <ScrollView
        contentContainerStyle={ExamsStyle.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#007AFF" />
        }
      >
        {renderExams()}
      </ScrollView>
    </View>
  );
};

export default ExamComponent;
