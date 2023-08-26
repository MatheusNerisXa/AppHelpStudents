import { useNavigation } from '@react-navigation/native';
import { format, parseISO } from 'date-fns';
import { isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import React, { useEffect, useState } from 'react';
import {
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { PermissionsAndroid } from 'react-native';
import CalendarEvents from 'react-native-calendar-events';

import { Icon } from '../../../shared/components/icon/Icon';
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

  const addToCalendarIOS = async (eventTitle: string, startDate: Date) => {
    try {
      await CalendarEvents.requestPermissions();

      const utcStartDate = new Date(startDate.getTime() + startDate.getTimezoneOffset() * 60000);

      await CalendarEvents.saveEvent(eventTitle, {
        startDate: utcStartDate.toISOString(),
        endDate: new Date(utcStartDate.getTime() + 1 * 60 * 60 * 1000).toISOString(),
      });

      console.log('Evento adicionado ao calendário (iOS).');
    } catch (error) {
      console.error('Erro ao adicionar evento ao calendário (iOS):', error);
    }
  };

  const addToCalendarAndroid = async (eventTitle: string, startDate: Date) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_CALENDAR,
        {
          title: 'Permissão para Adicionar ao Calendário',
          message: 'Esta aplicação precisa de permissão para adicionar eventos ao calendário.',
          buttonPositive: 'Permitir',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const eventDetails = {
          title: eventTitle,
          startDate: startDate.toISOString(),
          endDate: new Date(startDate.getTime() + 1 * 60 * 60 * 1000).toISOString(),
        };

        const eventID = await CalendarEvents.saveEvent(eventDetails);

        console.log('Evento adicionado ao calendário (Android) com ID:', eventID);
      } else {
        console.log('Permissão do calendário não concedida (Android).');
      }
    } catch (error) {
      console.error('Erro ao adicionar evento ao calendário (Android):', error);
    }
  };

  const handleAcompanharClick = (exam: Exam) => {
    const { registrationStart, exam1Date, exam2Date, resultDate, title } = exam;

    const eventDetails = [
      { date: registrationStart, title: `Início da Inscrição - ${title}` },
      { date: exam1Date, title: `Prova 1 - ${title}` },
      { date: exam2Date, title: `Prova 2 - ${title}` },
      { date: resultDate, title: `Resultado - ${title}` },
    ];

    for (const detail of eventDetails) {
      if (detail.date) {
        const startDate = new Date(detail.date);

        if (Platform.OS === 'ios') {
          addToCalendarIOS(detail.title, startDate);
        } else if (Platform.OS === 'android') {
          addToCalendarAndroid(detail.title, startDate);
        }
      }
    }
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
                      <View style={ExamsStyle.provaColumn}>
                        <DateInfo
                          label="Prova 1:"
                          date={format(parseISO(exam.exam1Date), 'dd/MM/yyyy', {
                            locale: ptBR,
                          })}
                        />
                      </View>
                      {exam.exam2Date && (
                        <View style={ExamsStyle.provaColumn}>
                          <DateInfo
                            label=" Prova 2:"
                            date={format(parseISO(exam.exam2Date), 'dd/MM/yyyy', {
                              locale: ptBR,
                            })}
                          />
                        </View>
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
                    <TouchableOpacity
                      style={ExamsStyle.calendarButton}
                      onPress={() => handleAcompanharClick(exam)}
                    >
                      <Icon
                        name="calendar"
                        size={20}
                        color="#007AFF"
                        style={ExamsStyle.calendarIcon}
                      />
                      <Text style={ExamsStyle.acompanharButtonText}>Adicionar ao Calendário</Text>
                    </TouchableOpacity>
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
      <Text style={label === 'Prova 1:' ? ExamsStyle.provaDate : ExamsStyle.prova2Date}>
        {' '}
        {date}
      </Text>
    </Text>
  </View>
);

export default ExamComponent;
