import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, Text, TextInput, View } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';

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

  const formatBrazilianDate = (date: string) => {
    return format(new Date(date), 'dd/MM/yyyy');
  };

  const filteredExams = exams.filter((exam) =>
    exam.title.toLowerCase().includes(searchText.toLowerCase()),
  );

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
        {filteredExams.map((exam) => (
          <View key={exam.id} style={ExamsStyle.cardContainer}>
            <Card>
              <View style={ExamsStyle.cardContent}>
                <Title style={ExamsStyle.title}>{exam.title}</Title>
                {exam.description && (
                  <Paragraph style={ExamsStyle.paragraph}>
                    <Text>{exam.description}</Text>
                  </Paragraph>
                )}
                <Paragraph style={ExamsStyle.paragraph}>
                  <Text style={ExamsStyle.boldText}>Inscrições:</Text>{' '}
                  {formatBrazilianDate(exam.registrationStart)} a{' '}
                  {formatBrazilianDate(exam.registrationEnd)}
                </Paragraph>
                <Paragraph style={ExamsStyle.paragraph}>
                  <Text style={ExamsStyle.boldText}>Prova 1ª Fase:</Text>{' '}
                  {formatBrazilianDate(exam.exam1Date)}
                </Paragraph>
                {exam.exam2Date && (
                  <Paragraph style={ExamsStyle.paragraph}>
                    <Text style={ExamsStyle.boldText}>Prova 2ª Fase:</Text>{' '}
                    {formatBrazilianDate(exam.exam2Date)}
                  </Paragraph>
                )}
                {exam.resultDate && (
                  <Paragraph style={ExamsStyle.paragraph}>
                    <Text style={ExamsStyle.boldText}>Resultado Final:</Text>{' '}
                    {formatBrazilianDate(exam.resultDate)}
                  </Paragraph>
                )}
              </View>
            </Card>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ExamComponent;
