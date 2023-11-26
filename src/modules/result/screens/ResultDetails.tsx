import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { URL_RESULT } from '../../../shared/constants/urls';
import ResultDetailsStyle from '../styles/resultDetails.style';

const ResultDetails = ({ route }) => {
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { disciplineId } = route.params;

  console.log('Discipline ID from route:', disciplineId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL_RESULT + 'discipline/' + `${disciplineId}`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            console.log('Data from API:', data);
            setResult(data);
          } else {
            setResult(null);
          }
        } else {
          setResult(null);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Erro ao buscar detalhes do resultado:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [disciplineId]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }

  if (!result) {
    return <Text>Nenhum detalhe do resultado encontrado.</Text>;
  }

  const renderNotes = () => {
    const filteredNotes = result.filter((item) => item.grade !== null && item.grade !== 'N/A');

    if (filteredNotes.length === 0) {
      return null;
    }

    return (
      <View>
        <Text style={ResultDetailsStyle.sectionTitle}>Notas:</Text>
        <View style={ResultDetailsStyle.notesContainer}>
          {filteredNotes.map((item, index) => (
            <View key={index} style={ResultDetailsStyle.noteItem}>
              <Text style={ResultDetailsStyle.label}>Nota:</Text>
              <Text style={ResultDetailsStyle.value}>{item.grade}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderActivities = () => {
    const filteredActivities = result.filter(
      (item) => item.workNotes !== null && item.workNotes.trim() !== '',
    );

    if (filteredActivities.length === 0) {
      return null;
    }

    return (
      <View>
        <Text style={ResultDetailsStyle.sectionTitle}>Atividades:</Text>
        <View style={ResultDetailsStyle.activitiesContainer}>
          {filteredActivities.map((item, index) => (
            <View key={index} style={ResultDetailsStyle.activityItem}>
              <Text style={ResultDetailsStyle.label}>Atividades:</Text>
              <Text style={ResultDetailsStyle.value}>{item.workNotes}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={ResultDetailsStyle.container}>
      {renderNotes()}
      {renderActivities()}
    </View>
  );
};

export default ResultDetails;
