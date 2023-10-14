/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Linking, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { URL_COURSES } from '../../../shared/constants/urls';
import CoursesStyle from '../styles/couses.style';

const CoursesComponent = () => {
  const navigation = useNavigation();

  const [courses, setCourses] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = () => {
    fetch(URL_COURSES)
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .finally(() => setRefreshing(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const openLink = (url) => {
    Linking.openURL(url);
  };

  const navigateToDetails = (course) => {
    navigation.navigate('CoursesDetails', { course });
  };

  const filteredCourses = courses.filter((course) =>
    course.course_name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <View style={CoursesStyle.container}>
      <View style={CoursesStyle.searchContainer}>
        <TextInput
          placeholder="Buscar cursos"
          placeholderTextColor="#666"
          value={searchText}
          onChangeText={handleSearch}
          style={CoursesStyle.searchInput}
        />
      </View>
      <ScrollView contentContainerStyle={CoursesStyle.coursesContainer}>
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            navigateToDetails={() => navigateToDetails(course)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const CourseCard = ({ course, navigateToDetails }) => (
  <TouchableOpacity style={CoursesStyle.card} onPress={navigateToDetails}>
    <Image source={{ uri: course.url_image }} style={CoursesStyle.courseImage} />
    <View style={CoursesStyle.infoContainer}>
      <Text style={CoursesStyle.courseName}>{course.course_name}</Text>
      <Text style={CoursesStyle.institution}>
        <Text style={CoursesStyle.institutionText}>Instituição:</Text> {course.institution}
      </Text>
    </View>
  </TouchableOpacity>
);

export default CoursesComponent;
