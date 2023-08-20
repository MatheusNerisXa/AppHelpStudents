import { format } from 'date-fns';
import React from 'react';
import { Image, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import ExamDetailsStyle from '../styles/examsDetails.style';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ExamDetails = ({ route }: { route: any }) => {
  const { exam } = route.params;

  const formatDescription = (description: string) => {
    const paragraphs = description.split('\n\n');
    const indentedParagraphs = paragraphs.map((paragraph) => `\t${paragraph}`);
    return indentedParagraphs.join('\n\n');
  };

  return (
    <ScrollView contentContainerStyle={ExamDetailsStyle.container}>
      <Text style={ExamDetailsStyle.examTitle}>{exam.title}</Text>
      <View style={ExamDetailsStyle.divider} />

      {exam.image && (
        <View style={ExamDetailsStyle.imageContainer}>
          <View style={ExamDetailsStyle.imageWrapper}>
            <Image source={{ uri: exam.image }} style={ExamDetailsStyle.image} />
          </View>
        </View>
      )}

      {(exam.image || exam.description) && <View style={ExamDetailsStyle.divider} />}

      <Text style={ExamDetailsStyle.examDescription}>{formatDescription(exam.description)}</Text>

      <View style={ExamDetailsStyle.infoContainer}>
        <DateInfo
          label="Inscrições:"
          date={`${format(new Date(exam.registrationStart), 'dd/MM/yyyy')} a ${format(
            new Date(exam.registrationEnd),
            'dd/MM/yyyy',
          )}`}
        />
        <View style={ExamDetailsStyle.provaContainer}>
          <DateInfo label="Prova 1:" date={format(new Date(exam.exam1Date), 'dd/MM/yyyy')} />
          {exam.exam2Date && (
            <DateInfo label="  Prova 2:" date={format(new Date(exam.exam2Date), 'dd/MM/yyyy')} />
          )}
        </View>
        {exam.resultDate && (
          <DateInfo label="Resultado:" date={format(new Date(exam.resultDate), 'dd/MM/yyyy')} />
        )}

        {exam.linkEnrollment && (
          <TouchableOpacity
            onPress={() => Linking.openURL(exam.linkEnrollment)}
            style={ExamDetailsStyle.linkEnrollment}
          >
            <Text style={ExamDetailsStyle.linkText}>Link para inscrição</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const DateInfo = ({ label, date }: { label: string; date: string }) => (
  <View style={ExamDetailsStyle.dateInfo}>
    <Text style={ExamDetailsStyle.dateLabel}>{label}</Text>
    <Text style={ExamDetailsStyle.dateText}>{date}</Text>
  </View>
);

export default ExamDetails;
