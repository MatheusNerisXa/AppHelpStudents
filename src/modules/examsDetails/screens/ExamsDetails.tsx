import { format } from 'date-fns';
import React from 'react';
import { Text, View } from 'react-native';

import ExamDetailsStyle from '../styles/examsDetails.style';

const ExamDetails = ({ route }) => {
  const { exam } = route.params;

  return (
    <View style={ExamDetailsStyle.container}>
      <Text style={ExamDetailsStyle.examTitle}>{exam.title}</Text>
      <Text style={ExamDetailsStyle.examDescription}>{exam.description}</Text>
      <View style={ExamDetailsStyle.dateInfoContainer}>
        <DateInfo
          label="Inscrição:"
          date={`${format(new Date(exam.registrationStart), 'dd/MM/yyyy')} a ${format(
            new Date(exam.registrationEnd),
            'dd/MM/yyyy',
          )}`}
        />
        <View style={ExamDetailsStyle.provaContainer}>
          <DateInfo label="Prova 1:" date={format(new Date(exam.exam1Date), 'dd/MM/yyyy')} />
          {exam.exam2Date && (
            <DateInfo label="Prova 2:" date={format(new Date(exam.exam2Date), 'dd/MM/yyyy')} />
          )}
        </View>
        {exam.resultDate && (
          <DateInfo label="Resultado:" date={format(new Date(exam.resultDate), 'dd/MM/yyyy')} />
        )}
      </View>
    </View>
  );
};

const DateInfo = ({ label, date }) => (
  <View style={ExamDetailsStyle.dateInfo}>
    <Text>
      <Text style={ExamDetailsStyle.dateLabelBold}>{label}</Text>
      {label === 'Prova 1:' ? (
        <Text style={ExamDetailsStyle.provaDate}> {date}</Text>
      ) : (
        <Text style={ExamDetailsStyle.prova2Date}> {date}</Text>
      )}
    </Text>
  </View>
);

export default ExamDetails;
