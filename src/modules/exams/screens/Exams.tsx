import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, Text, TextInput, View } from 'react-native';

import { URL_EXAM } from '../../../shared/constants/urls';
import ExamsStyle from '../styles/exams.style';

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
    fetch(URL_EXAM)
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

  return (
    <View style={ExamsStyle.container}>
      <View style={ExamsStyle.searchContainer}>
        <TextInput
          style={ExamsStyle.searchInput}
          placeholder="Buscar universidade ou escola"
          placeholderTextColor="#FFF"
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
        {filteredExams.length === 0 && searchText.length > 0 ? (
          <View style={ExamsStyle.noResultsContainer}>
            <Text style={ExamsStyle.noResultsText}>
              Nenhuma faculdade ou escola encontrada com o nome "{searchText}"
            </Text>
          </View>
        ) : (
          filteredExams.map((exam) => (
            <View key={exam.id} style={ExamsStyle.examContainer}>
              <Text style={ExamsStyle.examTitle}>{exam.title}</Text>
              <View style={ExamsStyle.dateInfoContainer}>
                <DateInfo
                  label="Inscrição:"
                  date={`${format(new Date(exam.registrationStart), 'dd/MM/yyyy')} a ${format(
                    new Date(exam.registrationEnd),
                    'dd/MM/yyyy',
                  )}`}
                />
                <DateInfo label="Prova 1:" date={format(new Date(exam.exam1Date), 'dd/MM/yyyy')} />
                {exam.exam2Date && (
                  <DateInfo
                    label="Prova 2:"
                    date={format(new Date(exam.exam2Date), 'dd/MM/yyyy')}
                  />
                )}
                {exam.resultDate && (
                  <DateInfo
                    label="Resultado:"
                    date={format(new Date(exam.resultDate), 'dd/MM/yyyy')}
                  />
                )}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const DateInfo = ({ label, date }: { label: string; date: string }) => (
  <View style={ExamsStyle.dateInfo}>
    <Text>
      <Text style={ExamsStyle.dateLabelBold}>{label}</Text> {date}
    </Text>
  </View>
);
export default ExamComponent;
