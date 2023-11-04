/* eslint-disable no-catch-shadow */
/* eslint-disable react-native/no-inline-styles */
import { useRoute } from '@react-navigation/native';
import { isValid, parse } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  RefreshControl,
  Text,
  TextInput,
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
  date: string;
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

const formatDateForDatabase = (dateString: string) => {
  const parts = dateString.split('/');
  const day = parts[0];
  const month = parts[1];
  const year = parts[2];
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

const AbsencesDetails = () => {
  const [absenceDetails, setAbsenceDetails] = useState<AbsenceDetails[]>([]);
  const [totalFaltas, setTotalFaltas] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [absenceToDelete, setAbsenceToDelete] = useState<AbsenceDetails | null>(null);

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editedAbsence, setEditedAbsence] = useState<AbsenceDetails | null>(null);
  const [editedDate, setEditedDate] = useState('');
  const [editedReason, setEditedReason] = useState('');
  const [editedNumberOfAbsences, setEditedNumberOfAbsences] = useState('');
  const [error, setError] = useState<string | null>(null);

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
      // eslint-disable-next-line @typescript-eslint/no-shadow
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

  const handleEditAbsence = (item: AbsenceDetails) => {
    setEditedAbsence(item);
    setEditedDate(formatDate(item.created_at));
    setEditedReason(item.reason || '');
    setEditedNumberOfAbsences(item.number_of_absences.toString());
    setIsEditModalVisible(true);
  };

  const saveEditedAbsence = async () => {
    if (!editedAbsence) {
      closeEditModal();
      return;
    }

    const editedDateTrimmed = editedDate.trim();

    if (editedDateTrimmed === '') {
      setError('A data não pode ser vazia.');
      return;
    }

    const editedReasonTrimmed = editedReason.trim();

    if (editedReasonTrimmed === '' || editedReasonTrimmed.length < 3) {
      setError('O motivo não pode estar em branco e deve ter pelo menos 3 caracteres.');
      return;
    }

    const parsedDate = parse(editedDateTrimmed, 'dd/MM/yyyy', new Date());

    if (!isValid(parsedDate)) {
      setError('A data não é válida!');
      return;
    }

    const formattedDateForDatabase = formatDateForDatabase(editedDate);
    if (!isValidDate(formattedDateForDatabase)) {
      setError('Data de formato inválido.');
      return;
    }

    const editedNumberOfAbsencesTrimmed = editedNumberOfAbsences.trim();
    if (editedNumberOfAbsencesTrimmed === '') {
      setError('O número de faltas não pode ser vazio!');
      return;
    }

    const numberOfAbsences = parseInt(editedNumberOfAbsencesTrimmed, 10);

    if (isNaN(numberOfAbsences) || numberOfAbsences <= 0) {
      setError('O número de faltas deve ser maior que 0!');
      return;
    }
    try {
      const updatedAbsence = {
        ...editedAbsence,
        created_at: formattedDateForDatabase,
        reason: editedReason,
        number_of_absences: numberOfAbsences,
      };

      console.log('Dados a serem enviados:', updatedAbsence);

      await fetch(URL_ABSENCES + `${updatedAbsence.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAbsence),
      });

      const updatedDetails = absenceDetails.map((item) =>
        item.id === updatedAbsence.id ? updatedAbsence : item,
      );

      setAbsenceDetails(updatedDetails);
      setIsEditModalVisible(false);
      // eslint-disable-next-line @typescript-eslint/no-shadow
    } catch (error) {
      console.error('Erro ao atualizar a ausência:', error);
      setError('Erro ao atualizar a ausência. Por favor, tente novamente.');
    }
  };

  const openDeleteModal = (item: AbsenceDetails) => {
    setAbsenceToDelete(item);
    setIsModalVisible(true);
  };

  const closeEditModal = () => {
    setIsEditModalVisible(false);
    setError(null);
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
        // eslint-disable-next-line @typescript-eslint/no-shadow
      } catch (error) {
        console.error('Erro ao excluir ausência:', error);
      }
    }
  };

  const isValidDate = (dateString: string) => {
    const pattern = /^(\d{4})-(\d{2})-(\d{2})$/;
    return pattern.test(dateString);
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }

  if (!absenceDetails || absenceDetails.length === 0) {
    return <Text>Nenhum detalhe da falta encontrado.</Text>;
  }

  return (
    <View style={AbsencesDetailsStyle.container}>
      <Text style={AbsencesDetailsStyle.totalFaltas}>Total de faltas: {totalFaltas}</Text>
      <FlatList
        data={absenceDetails}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={AbsencesDetailsStyle.item}>
            <View>
              <Text>
                <Text style={AbsencesDetailsStyle.bold}>Data:</Text> {formatDate(item.date)}
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
                <Icon name="pencil" size={20} color="#253494" />
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
      {/* Modal de exclusão */}
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
      {/* Modal de edição */}
      <Modal visible={isEditModalVisible} transparent={true} animationType="slide">
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          <View style={AbsencesDetailsStyle.modalContainerEdit}>
            <View
              style={[
                AbsencesDetailsStyle.modalContentEdit,
                { borderColor: error ? 'red' : '#253494' },
              ]}
            >
              <Text style={AbsencesDetailsStyle.modalTitle}>Editar Falta</Text>

              {/* Campo de Data */}
              <View style={AbsencesDetailsStyle.inputContainer}>
                <Text style={AbsencesDetailsStyle.inputLabel}>Data:</Text>
                <TextInput
                  style={AbsencesDetailsStyle.inputValue}
                  placeholder="DD/MM/AAAA"
                  value={editedDate}
                  onChangeText={(text) => setEditedDate(text)}
                  keyboardType="numeric"
                />
              </View>

              {/* Campo de Motivo */}
              <View style={AbsencesDetailsStyle.inputContainer}>
                <Text style={AbsencesDetailsStyle.inputLabel}>Motivo:</Text>
                <TextInput
                  style={AbsencesDetailsStyle.inputValue}
                  placeholder="Motivo"
                  value={editedReason}
                  onChangeText={(text) => setEditedReason(text)}
                />
              </View>

              {/* Campo de Número de Faltas */}
              <View style={AbsencesDetailsStyle.inputContainer}>
                <Text style={AbsencesDetailsStyle.inputLabel}>Número de Faltas:</Text>
                <TextInput
                  style={AbsencesDetailsStyle.inputValue}
                  placeholder="Número de faltas"
                  value={editedNumberOfAbsences}
                  onChangeText={(text) => setEditedNumberOfAbsences(text.replace(/[^0-9]/g, ''))}
                  keyboardType="numeric"
                />
              </View>

              {error && <Text style={{ color: 'red' }}>{error}</Text>}
              <View style={AbsencesDetailsStyle.buttonContainer}>
                <Button title="Cancelar" onPress={closeEditModal} color="#FF0000" />
                <Button title="Salvar" onPress={saveEditedAbsence} />
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
};

export default AbsencesDetails;
