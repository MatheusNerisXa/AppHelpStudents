import React from 'react';
import { Image, Linking, ScrollView, Text, TouchableOpacity } from 'react-native';

import CoursesDetailsStyle from '../styles/cousesDetails.style';

const CoursesDetails = ({ route }) => {
  const { course } = route.params;

  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={CoursesDetailsStyle.container}>
      <Image source={{ uri: course.url_image }} style={CoursesDetailsStyle.courseImage} />
      <Text style={CoursesDetailsStyle.courseName}>{course.course_name}</Text>
      <Text style={CoursesDetailsStyle.description}>{course.description}</Text>
      <Text style={CoursesDetailsStyle.institution}>
        <Text style={CoursesDetailsStyle.institutionText}>Instituição:</Text> {course.institution}
      </Text>
      <TouchableOpacity
        style={CoursesDetailsStyle.button}
        onPress={() => openLink(course.course_link)}
      >
        <Text style={CoursesDetailsStyle.buttonText}>Inscrever-se</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CoursesDetails;
