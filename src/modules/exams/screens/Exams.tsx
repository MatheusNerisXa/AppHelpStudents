import { useNavigation } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import { isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

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

  const navigation = useNavigation();

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
          filteredExams.map((exam) => {
            const today = new Date();
            const isExam2DateValid = !exam.exam2Date || isAfter(parseISO(exam.exam2Date), today);
            const isResultDateValid = !exam.resultDate || isAfter(parseISO(exam.resultDate), today);

            if (isExam2DateValid && isResultDateValid) {
              return (
                <TouchableOpacity
                  key={exam.id}
                  style={ExamsStyle.examContainer}
                  onPress={() => navigation.navigate('ExamDetails', { exam })}
                >
                  <Text style={ExamsStyle.examTitle}>{exam.title}</Text>
                  <View style={ExamsStyle.dateInfoContainer}>
                    <DateInfo
                      label="Inscrição:"
                      date={`${format(parseISO(exam.registrationStart), 'dd/MM/yyyy', {
                        locale: ptBR,
                      })} a ${format(parseISO(exam.registrationEnd), 'dd/MM/yyyy', {
                        locale: ptBR,
                      })}`}
                    />
                    <View style={ExamsStyle.provaContainer}>
                      <DateInfo
                        label="Prova 1:"
                        date={format(parseISO(exam.exam1Date), 'dd/MM/yyyy', {
                          locale: ptBR,
                        })}
                      />
                      {exam.exam2Date && (
                        <DateInfo
                          label="Prova 2:"
                          date={format(parseISO(exam.exam2Date), 'dd/MM/yyyy', {
                            locale: ptBR,
                          })}
                        />
                      )}
                    </View>
                    {exam.resultDate && (
                      <DateInfo
                        label="Resultado:"
                        date={format(parseISO(exam.resultDate), 'dd/MM/yyyy', {
                          locale: ptBR,
                        })}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              );
            } else {
              return null;
            }
          })
        )}
      </ScrollView>
    </View>
  );
};

const DateInfo = ({ label, date }: { label: string; date: string }) => (
  <View style={ExamsStyle.dateInfo}>
    <Text>
      <Text style={ExamsStyle.dateLabelBold}>{label}</Text>
      {label === 'Prova 1:' ? (
        <Text style={ExamsStyle.provaDate}> {date}</Text>
      ) : (
        <Text style={ExamsStyle.prova2Date}> {date}</Text>
      )}
    </Text>
  </View>
);

export default ExamComponent;
