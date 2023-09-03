import { format, parseISO } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Image, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import ExamDetailsStyle from '../styles/examsDetails.style';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ExamDetails = ({ route }: { route: any }) => {
  const { exam } = route.params;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageUri, setImageUri] = useState(exam.image);

  const formatDescription = (description: string) => {
    const paragraphs = description.split('\n\n');
    const indentedParagraphs = paragraphs.map((paragraph) => `\t${paragraph}`);
    return indentedParagraphs.join('\n\n');
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    setImageUri(`${exam.image}?timestamp=${Date.now()}`);
    setImageLoaded(false);
  }, [exam.image]);

  return (
    <ScrollView contentContainerStyle={ExamDetailsStyle.container}>
      <Text style={ExamDetailsStyle.examTitle}>{exam.title}</Text>
      <View style={ExamDetailsStyle.divider} />

      {exam.image && (
        <View style={ExamDetailsStyle.imageContainer}>
          <View style={ExamDetailsStyle.imageWrapper}>
            <Image
              source={{ uri: imageUri }}
              // eslint-disable-next-line react-native/no-inline-styles
              style={[ExamDetailsStyle.image, { opacity: imageLoaded ? 1 : 0 }]}
              onLoad={handleImageLoad}
            />
            {!imageLoaded && <Text>Carregando...</Text>}
          </View>
        </View>
      )}

      {(exam.image || exam.description) && <View />}

      {exam.description && (
        <Text style={ExamDetailsStyle.examDescription}>{formatDescription(exam.description)}</Text>
      )}

      <View style={ExamDetailsStyle.divider} />

      <View style={ExamDetailsStyle.infoContainer}>
        <DateInfo
          label="Inscrições:"
          date={`${format(parseISO(exam.registrationStart), 'dd/MM/yyyy')} a ${format(
            parseISO(exam.registrationEnd),
            'dd/MM/yyyy',
          )}`}
        />
        <View style={ExamDetailsStyle.provaContainer}>
          <DateInfo label="Prova 1:" date={format(parseISO(exam.exam1Date), 'dd/MM/yyyy')} />
          {exam.exam2Date && (
            <DateInfo label="  Prova 2:" date={format(parseISO(exam.exam2Date), 'dd/MM/yyyy')} />
          )}
        </View>
        {exam.resultDate && (
          <DateInfo label="Resultado:" date={format(parseISO(exam.resultDate), 'dd/MM/yyyy')} />
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
