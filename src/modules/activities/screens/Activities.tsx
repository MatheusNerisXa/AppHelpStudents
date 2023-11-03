/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { format, isValid, parse } from 'date-fns';
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
import { TextInputMask } from 'react-native-masked-text';
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
  const [showCompleted, setShowCompleted] = useState(false);

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Activity | null>(null);

  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const [totalConcluidas, setTotalConcluidas] = useState(0);
  const [totalNaoConcluidas, setTotalNaoConcluidas] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskName, setEditTaskName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDueDate, setEditDueDate] = useState('');
  const [editItem, setEditItem] = useState<Activity | null>(null);
  const [showCompletionMessage, setShowCompletionMessage] = useState(false);
  const [completionMessageType, setCompletionMessageType] = useState('');
  const [completedActivityName, setCompletedActivityName] = useState('');

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

          const totalConcluidas = userActivities.filter((activity) => activity.isCompleted).length;
          const totalNaoConcluidas = userActivities.filter(
            (activity) => !activity.isCompleted,
          ).length;

          setTotalConcluidas(totalConcluidas);
          setTotalNaoConcluidas(totalNaoConcluidas);

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

  const isOverdue = (dueDate: string) => {
    const dueDateDate = new Date(dueDate);
    const currentDate = new Date();
    return dueDateDate < currentDate;
  };

  const formatDateBrazil = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
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

  const openEditModal = (activity: Activity) => {
    setEditItem(activity);
    setEditTaskName(activity.taskName);
    setEditDescription(activity.description);

    setEditDueDate(format(new Date(activity.dueDate), 'dd/MM/yyyy'));

    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
    setEditTaskName('');
    setEditDescription('');
    setEditDueDate('');
    setEditItem(null);
  };

  const confirmEditActivity = async () => {
    if (editItem) {
      const parsedDueDate = parse(editDueDate, 'dd/MM/yyyy', new Date(), {
        awareOfUnicodeTokens: true,
      });

      if (isValid(parsedDueDate)) {
        const dayEdited = parsedDueDate.getDate();
        const existingDate = new Date(editItem.dueDate);
        existingDate.setDate(dayEdited);

        try {
          const response = await axios.put(URL_ACTIVITIES_EDIT + `${editItem.id}`, {
            taskName: editTaskName,
            description: editDescription,
            dueDate: existingDate.toISOString().split('T')[0],
          });

          if (response.status === 200) {
            const updatedActivities = activities.map((activity) => {
              if (activity.id === editItem.id) {
                return {
                  ...activity,
                  taskName: editTaskName,
                  description: editDescription,
                  dueDate: existingDate.toISOString().split('T')[0],
                };
              }
              return activity;
            });

            setActivities(updatedActivities);
            closeEditModal();
          }
        } catch (error) {
          console.error('Error editing activity:', error);
        }
      } else {
        console.error('Data inválida. Insira uma data no formato DD/MM/YYYY.');
      }
    }
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

        const updatedTotalConcluidas = updatedActivities.filter(
          (activity) => activity.isCompleted,
        ).length;
        const updatedTotalNaoConcluidas = updatedActivities.filter(
          (activity) => !activity.isCompleted,
        ).length;

        setTotalConcluidas(updatedTotalConcluidas);
        setTotalNaoConcluidas(updatedTotalNaoConcluidas);

        setExpandedCard(null);

        // Defina o nome da atividade que foi movida
        setCompletedActivityName(item.taskName);

        // Defina a mensagem e o tipo com base no estado da atividade
        const message = item.isCompleted ? 'Pendentes' : 'Concluídas';
        setCompletionMessageType(message);
        setShowCompletionMessage(true);
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

  const filteredActivitiesByCompletion = showCompleted
    ? filteredActivities.filter((activity) => activity.isCompleted)
    : filteredActivities.filter((activity) => !activity.isCompleted);

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

      <View style={ActivitiesStyle.filterButtons}>
        <TouchableOpacity
          style={[
            ActivitiesStyle.filterButton,
            !showCompleted ? ActivitiesStyle.activeFilterButton : null,
          ]}
          onPress={() => setShowCompleted(false)}
        >
          <Text style={ActivitiesStyle.filterButtonText}>Pendentes ({totalNaoConcluidas})</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            ActivitiesStyle.filterButton,
            showCompleted ? ActivitiesStyle.activeFilterButton : null,
          ]}
          onPress={() => setShowCompleted(true)}
        >
          <Text style={ActivitiesStyle.filterButtonText}>Concluídas ({totalConcluidas})</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#f09d5c" style={ActivitiesStyle.loadingIndicator} />
      ) : (
        <View>
          {filteredActivitiesByCompletion.map((item) => (
            <View key={item.id}>
              <View
                style={[
                  ActivitiesStyle.activityCard,
                  {
                    borderColor: item.isCompleted ? 'green' : 'red',
                    borderWidth: 2,
                  },
                ]}
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
                  {item.isCompleted
                    ? null
                    : isOverdue(item.dueDate) && (
                        <View style={ActivitiesStyle.overdueMessageContainer}>
                          <Text style={ActivitiesStyle.overdueMessage}>Atrasado</Text>
                        </View>
                      )}
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
                <View style={ActivitiesStyle.cardActions}>
                  <TouchableOpacity
                    style={ActivitiesStyle.editButton}
                    onPress={() => openEditModal(item)}
                  >
                    <Icon name="pencil" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={ActivitiesStyle.completeButton}
                    onPress={() => handleToggleCompletion(item)}
                  >
                    <Icon name={item.isCompleted ? 'cross' : 'checkmark'} size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={ActivitiesStyle.deleteButton}
                    onPress={() => openDeleteModal(item)}
                  >
                    <Icon name="bin" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      <View style={ActivitiesStyle.addButtonContainer}>
        <TouchableOpacity
          style={ActivitiesStyle.addButton}
          onPress={() => navigation.navigate('ActivitiesCreation')}
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
              <Text>Prazo: {itemToDelete ? formatDateBrazil(itemToDelete.dueDate) : ''}</Text>

              <Text>Descrição: {itemToDelete ? itemToDelete.description || 'N/A' : ''}</Text>
              <View style={ActivitiesStyle.modalButtons}>
                <Button title="Cancelar" onPress={closeDeleteModal} color="#FF0000" />
                <Button title="Confirmar" onPress={confirmDeleteActivity} color="#007AFF" />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={showCompletionMessage} transparent={true} animationType="slide">
        <View style={ActivitiesStyle.modalContainer}>
          <View style={ActivitiesStyle.modalBackground}>
            <View style={ActivitiesStyle.modalContent}>
              <Text style={ActivitiesStyle.modalTitle}>
                Atividade "{completedActivityName}" movida para {completionMessageType}
              </Text>
              <View style={ActivitiesStyle.modalButtons}>
                <Button
                  title="Fechar"
                  onPress={() => setShowCompletionMessage(false)}
                  color="#007AFF"
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal visible={isEditing} transparent={true} animationType="slide">
        <View style={ActivitiesStyle.modalContainer}>
          <View style={ActivitiesStyle.modalBackground}>
            <View style={ActivitiesStyle.modalContent}>
              <Text style={ActivitiesStyle.modalTitle}>Editar Atividade</Text>
              <View>
                <Text>Título:</Text>
                <TextInput
                  style={[ActivitiesStyle.input]}
                  placeholder="Título"
                  multiline={true}
                  value={editTaskName}
                  onChangeText={(text) => setEditTaskName(text)}
                />
              </View>
              <View>
                <Text>Descrição:</Text>
                <TextInput
                  style={[ActivitiesStyle.input]}
                  placeholder="Descrição"
                  multiline={true}
                  value={editDescription}
                  onChangeText={(text) => setEditDescription(text)}
                />
              </View>
              <View>
                <Text>Prazo:</Text>
                <TextInputMask
                  style={ActivitiesStyle.input}
                  type={'datetime'}
                  options={{
                    format: 'DD/MM/YYYY',
                  }}
                  placeholder="DD/MM/YYYY"
                  value={editDueDate}
                  onChangeText={(text) => setEditDueDate(text)}
                />
              </View>
              <View style={ActivitiesStyle.modalButtons}>
                <Button title="Cancelar" onPress={closeEditModal} color="#FF0000" />
                <Button title="Salvar" onPress={confirmEditActivity} color="#007AFF" />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ActivitiesScreen;
