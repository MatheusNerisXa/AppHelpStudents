import { useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Modal,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Icon } from '../../../shared/components/icon/Icon';
import { URL_ABSENCES } from '../../../shared/constants/urls';
import AbsencesDetailsStyle from '../styles/absencesDetails.style';

interface AbsenceDetails {
  id: number;
  reason: string | null;
  created_at: string;
  number_of_absences: number;
  discipline_id: number;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const AbsencesDetails = () => {
  const [absenceDetails, setAbsenceDetails] = useState<AbsenceDetails[]>([]);
  const [totalFaltas, setTotalFaltas] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [absenceToDelete, setAbsenceToDelete] = useState<AbsenceDetails | null>(null);

  const route = useRoute();
  const { disciplineId } = route.params;

  const fetchAbsenceDetails = useCallback(async () => {
    try {
      const response = await fetch(URL_ABSENCES + `${disciplineId}`);
      const data: AbsenceDetails[] = await response.json();

      console.log('Received data from server:', data);

      data.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      setAbsenceDetails(data);

      const total = data.reduce((acc, item) => acc + item.number_of_absences, 0);
      setTotalFaltas(total);

      setIsLoading(false);
      setRefreshing(false);
    } catch (error) {
      console.error('Erro ao buscar detalhes da falta:', error);
      setIsLoading(false);
      setRefreshing(false);
    }
  }, [disciplineId]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchAbsenceDetails();
  };

  useEffect(() => {
    fetchAbsenceDetails();
  }, [fetchAbsenceDetails]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleEditAbsence = (item: AbsenceDetails) => {
    // Implemente a lógica de edição aqui
  };

  const openDeleteModal = (item: AbsenceDetails) => {
    setAbsenceToDelete(item);
    setIsModalVisible(true);
  };

  const closeDeleteModal = () => {
    setIsModalVisible(false);
  };

  const confirmDeleteAbsence = async () => {
    if (absenceToDelete) {
      try {
        console.log('Deleting absence:', absenceToDelete);

        await fetch(URL_ABSENCES + `${absenceToDelete.id}`, {
          method: 'DELETE',
        });

        setAbsenceDetails((prevAbsenceDetails) =>
          prevAbsenceDetails.filter((absence) => absence.id !== absenceToDelete.id),
        );

        setTotalFaltas((prevTotalFaltas) => prevTotalFaltas - absenceToDelete.number_of_absences);

        setIsModalVisible(false);
        setAbsenceToDelete(null);
      } catch (error) {
        console.error('Erro ao excluir ausência:', error);
      }
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }

  if (!absenceDetails || absenceDetails.length === 0) {
    return <Text>Nenhum detalhe da falta encontrado.</Text>;
  }

  return (
    <View style={AbsencesDetailsStyle.container}>
      <Text style={AbsencesDetailsStyle.totalFaltas}>Faltas do dia: {totalFaltas}</Text>
      <FlatList
        data={absenceDetails}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={AbsencesDetailsStyle.item}>
            <View>
              <Text>
                <Text style={AbsencesDetailsStyle.bold}>Data:</Text> {formatDate(item.created_at)}
              </Text>
              <Text>
                <Text style={AbsencesDetailsStyle.bold}>Motivo:</Text> {item.reason || 'N/A'}
              </Text>
              <Text>
                <Text style={AbsencesDetailsStyle.bold}>Faltas no dia:</Text>{' '}
                {item.number_of_absences}
              </Text>
            </View>

            <View style={AbsencesDetailsStyle.itemIcons}>
              <TouchableOpacity
                style={AbsencesDetailsStyle.iconContainer}
                onPress={() => handleEditAbsence(item)}
              >
                <Icon name="pencil" size={20} color="#007AFF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={AbsencesDetailsStyle.iconContainer}
                onPress={() => openDeleteModal(item)}
              >
                <Icon name="bin" size={20} color="#FF0000" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#007AFF" />
        }
      />

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={AbsencesDetailsStyle.modalContainer}>
          <View style={AbsencesDetailsStyle.modalBackground}>
            <View style={AbsencesDetailsStyle.modalContent}>
              <Text style={AbsencesDetailsStyle.modalTitle}>
                Tem certeza que deseja excluir esta falta?
              </Text>
              <Text>Data: {absenceToDelete ? formatDate(absenceToDelete.created_at) : ''}</Text>
              <Text>Motivo: {absenceToDelete ? absenceToDelete.reason || 'N/A' : ''}</Text>

              <View style={AbsencesDetailsStyle.modalButtons}>
                <Button title="Cancelar" onPress={closeDeleteModal} color="#FF0000" />
                <Button title="Confirmar" onPress={confirmDeleteAbsence} color="#007AFF" />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AbsencesDetails;
