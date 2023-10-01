/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { URL_ACTIVITIES } from '../../../shared/constants/urls';
import { useRequest } from '../../../shared/hooks/useRequest';
import ActivitiesStyle from '../styles/activities';

interface Activity {
  id: number;
  taskName: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
}

const ActivitiesScreen: React.FC = () => {
  const route = useRoute();
  const { getUserFromStorage } = useRequest();
  const navigation = useNavigation();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserFromStorage();
      setUserId(userData?.id);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUserActivities = async () => {
      if (userId) {
        try {
          const activitiesResponse = await axios.get(URL_ACTIVITIES + `${userId}`);

          const userActivities: Activity[] = activitiesResponse.data;

          setActivities(userActivities);
          setLoading(false);
        } catch (error) {
          console.error('Erro ao buscar atividades:', error);
          setLoading(false);
        }
      }
    };

    fetchUserActivities();
  }, [userId]);

  const formatDueDate = (dueDate: string) => {
    return format(new Date(dueDate), 'dd/MM/yyyy');
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const handleToggleCompletion = async (activity: Activity) => {
    try {
      const updatedActivities = activities.map((item) =>
        item.id === activity.id ? { ...item, isCompleted: !item.isCompleted } : item,
      );

      setActivities(updatedActivities);

      await axios.put(`http://192.168.1.7:8080/activities/${activity.id}`, {
        isCompleted: !activity.isCompleted,
      });
    } catch (error) {
      console.error('Erro ao atualizar atividade:', error);
      setActivities(activities);
    }
  };

  const filteredActivities = searchText
    ? activities.filter((activity) =>
        activity.taskName.toLowerCase().includes(searchText.toLowerCase()),
      )
    : activities;

  return (
    <View style={ActivitiesStyle.container}>
      <View style={ActivitiesStyle.searchContainer}>
        <TextInput
          style={ActivitiesStyle.searchInput}
          placeholder="Digite o nome da tarefa"
          placeholderTextColor="#666"
          value={searchText}
          onChangeText={handleSearch}
          autoFocus={false}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#f09d5c" style={ActivitiesStyle.loadingIndicator} />
      ) : (
        <FlatList
          data={filteredActivities}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                ActivitiesStyle.activityCard,
                {
                  borderColor: item.isCompleted ? 'green' : 'red',
                  borderWidth: 2,
                },
              ]}
              onPress={() => {
                // Ação ao tocar em uma atividade (opcional)
              }}
            >
              <Text style={ActivitiesStyle.activityTitle}>{item.taskName}</Text>
              <View style={ActivitiesStyle.descriptionContainer}>
                <Text style={ActivitiesStyle.descriptionLabel}>Descrição: </Text>
                <Text style={ActivitiesStyle.activityDescription}>{item.description}</Text>
              </View>
              <View style={ActivitiesStyle.infoContainer}>
                <View style={ActivitiesStyle.infoItem}>
                  <Text style={ActivitiesStyle.infoLabel}>Prazo:</Text>
                  <Text style={ActivitiesStyle.infoText}>{formatDueDate(item.dueDate)}</Text>
                </View>
                <View style={ActivitiesStyle.infoItem}>
                  <Text
                    style={[
                      ActivitiesStyle.infoLabel,
                      { color: item.isCompleted ? 'green' : 'red' },
                    ]}
                  >
                    Concluído:
                  </Text>
                  <Text
                    style={[
                      ActivitiesStyle.infoText,
                      { color: item.isCompleted ? 'green' : 'red' },
                    ]}
                  >
                    {item.isCompleted ? 'Sim' : 'Não'}
                  </Text>
                </View>
              </View>
              {/* Caracteres de texto para representar o estado de conclusão */}
              <TouchableOpacity
                onPress={() => handleToggleCompletion(item)}
                style={{ position: 'absolute', top: 10, right: 10 }}
              >
                <Text style={{ fontSize: 24, color: item.isCompleted ? 'green' : 'red' }}>
                  {item.isCompleted ? '✔' : '◯'}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default ActivitiesScreen;
