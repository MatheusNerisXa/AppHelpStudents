/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

import { Icon } from '../../../shared/components/icon/Icon';
import {
  URL_ACTIVITIES,
  URL_ACTIVITIES_DELETE,
  URL_ACTIVITIES_EDIT,
  URL_ADD_ACTIVITY,
} from '../../../shared/constants/urls';
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
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Activity | null>(null);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

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

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const formatDueDate = (dueDate: string) => {
    return format(new Date(dueDate), 'dd/MM/yyyy');
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const openDeleteModal = (activity: Activity) => {
    setItemToDelete(activity);
    setIsDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalVisible(false);
  };

  const confirmDeleteActivity = async () => {
    if (itemToDelete) {
      try {
        await axios.delete(URL_ACTIVITIES_DELETE + `${itemToDelete.id}`);
        const updatedActivities = activities.filter((item) => item.id !== itemToDelete.id);
        setActivities(updatedActivities);
        closeDeleteModal();
      } catch (error) {
        console.error('Error deleting activity:', error);
      }
    }
  };

  const handleToggleCompletion = async (item: Activity) => {
    try {
      const response = await axios.put(URL_ACTIVITIES_EDIT + `${item.id}`, {
        isCompleted: !item.isCompleted,
      });

      if (response.status === 200) {
        const updatedActivities = activities.map((activity) => {
          if (activity.id === item.id) {
            return {
              ...activity,
              isCompleted: !activity.isCompleted,
            };
          }
          return activity;
        });

        setActivities(updatedActivities);

        setExpandedCard(null);
      }
    } catch (error) {
      console.error('Error toggling completion:', error);
    }
  };

  const filteredActivities = searchText
    ? activities.filter((activity) =>
        activity.taskName.toLowerCase().includes(searchText.toLowerCase()),
      )
    : activities;

  const addTask = async () => {
    try {
      const response = await axios.post(URL_ADD_ACTIVITY, {
        taskName,
        description,
        dueDate,
        isCompleted,
        userId,
      });

      if (response.status === 201) {
        const newActivity: Activity = response.data;
        setActivities([...activities, newActivity]);
        setIsAddModalVisible(false);
        setTaskName('');
        setDescription('');
        setDueDate('');
        setIsCompleted(false);
      }
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  };

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
        <SwipeListView
          data={filteredActivities}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={1}
              style={[
                ActivitiesStyle.activityCard,
                {
                  borderColor: item.isCompleted ? 'green' : 'red',
                  borderWidth: 2,
                  transform: [{ translateX: expandedCard === item.id ? 150 : 0 }],
                },
              ]}
              onPress={() => {
                // Ação ao tocar em uma atividade (opcional)
              }}
            >
              <View style={ActivitiesStyle.activityHeader}>
                <Text style={ActivitiesStyle.activityTitle}>{item.taskName}</Text>
              </View>
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
            </TouchableOpacity>
          )}
          renderHiddenItem={({ item }) => (
            <View style={ActivitiesStyle.rowBack}>
              <TouchableOpacity
                style={ActivitiesStyle.editButton}
                onPress={() => {
                  // Ação ao tocar em editar
                }}
              >
                <Icon name="pencil" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={ActivitiesStyle.completeButton}
                onPress={() => handleToggleCompletion(item)}
              >
                <Icon name={item.isCompleted ? 'checkmark' : 'cross'} size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                style={ActivitiesStyle.deleteButton}
                onPress={() => openDeleteModal(item)}
              >
                <Icon name="bin" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}
          leftOpenValue={150}
          rightOpenValue={-190}
          disableRightSwipe={true}
          onRowOpen={(rowKey) => setExpandedCard(rowKey)}
          onRowClose={() => setExpandedCard(null)}
        />
      )}

      <View style={ActivitiesStyle.addButtonContainer}>
        <TouchableOpacity
          style={ActivitiesStyle.addButton}
          onPress={() => setIsAddModalVisible(true)}
        >
          <Text style={ActivitiesStyle.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isDeleteModalVisible} transparent={true} animationType="slide">
        <View style={ActivitiesStyle.modalContainer}>
          <View style={ActivitiesStyle.modalBackground}>
            <View style={ActivitiesStyle.modalContent}>
              <Text style={ActivitiesStyle.modalTitle}>
                Tem certeza que deseja excluir a atividade "
                {itemToDelete ? itemToDelete.taskName : ''}"?
              </Text>
              <Text>Prazo: {itemToDelete ? formatDueDate(itemToDelete.dueDate) : ''}</Text>
              <Text>Descrição: {itemToDelete ? itemToDelete.description || 'N/A' : ''}</Text>
              <View style={ActivitiesStyle.modalButtons}>
                <Button title="Cancelar" onPress={closeDeleteModal} color="#FF0000" />
                <Button title="Confirmar" onPress={confirmDeleteActivity} color="#007AFF" />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ActivitiesScreen;
