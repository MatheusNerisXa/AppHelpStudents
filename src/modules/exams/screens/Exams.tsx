import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  contentContainer: {
    paddingBottom: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    backgroundColor: '#FFFFFF',
  },
  cardContent: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 12,
  },
  paragraph: {
    color: '#444444',
    marginBottom: 8,
  },
  boldText: {
    fontWeight: 'bold',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
});

const Exam = () => {
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

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Digite a universidade ou escola"
          placeholderTextColor="#000000"
          value={searchText}
          onChangeText={handleSearch}
          autoFocus
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#007AFF" />
        }
      >
        {filteredExams.map((exam) => (
          <Card key={exam.id} style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Title style={styles.title}>{exam.title}</Title>
              <Paragraph style={styles.paragraph}>
                <Text>{exam.description}</Text>
              </Paragraph>
              <Paragraph style={styles.paragraph}>
                <Text style={styles.boldText}>Inscrições:</Text> {exam.registrationStart} a{' '}
                {exam.registrationEnd}
              </Paragraph>
              <Paragraph style={styles.paragraph}>
                <Text style={styles.boldText}>Prova 1ª Fase:</Text> {exam.exam1Date}
              </Paragraph>
              <Paragraph style={styles.paragraph}>
                <Text style={styles.boldText}>Prova 2ª Fase:</Text> {exam.exam2Date}
              </Paragraph>
              <Paragraph style={styles.paragraph}>
                <Text style={styles.boldText}>Resultado Final:</Text> {exam.resultDate}
              </Paragraph>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

export default Exam;
