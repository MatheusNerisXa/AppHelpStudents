/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import { format, isDate } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { URL_DISCIPLINE_CREATE } from '../../../shared/constants/urls';
import { useRequest } from '../../../shared/hooks/useRequest';
import CreateDisciplineStyle from '../styles/createDiscipline.style';

const translateMonth = (month) => {
  const months = {
    1: 'Janeiro',
    2: 'Fevereiro',
    3: 'Março',
    4: 'Abril',
    5: 'Maio',
    6: 'Junho',
    7: 'Julho',
    8: 'Agosto',
    9: 'Setembro',
    10: 'Outubro',
    11: 'Novembro',
    12: 'Dezembro',
  };
  return months[month];
};

const statusMap = {
  1: 'Aprovado',
  2: 'Reprovado',
  3: 'Cursando',
  4: 'Sub',
};

const DisciplineCreation = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState(3);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { getUserFromStorage } = useRequest();
  const [userId, setUserId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserFromStorage();
      setUserId(userData?.id);
    };

    fetchUserData();
  }, []);

  const navigation = useNavigation();
  const [createdDisciplineName, setCreatedDisciplineName] = useState('');

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };

  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };

  const handleStartDateConfirm = (date) => {
    if (isDate(date)) {
      hideStartDatePicker();
      setStartDate(date);
    }
  };

  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };

  const handleEndDateConfirm = (date) => {
    if (isDate(date)) {
      hideEndDatePicker();
      setEndDate(date);
    }
  };

  const handleCreate = async () => {
    const newDiscipline = {
      name,
      disciplineStatusId: status,
      userId,
      dateStart: startDate.toISOString(),
      dateEnd: endDate.toISOString(),
    };

    try {
      const response = await fetch(URL_DISCIPLINE_CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDiscipline),
      });

      if (response.ok) {
        setCreatedDisciplineName(name);
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
          navigation.navigate('Discipline', { refresh: true });
        }, 1500);
      } else {
        console.error('Erro ao criar matéria:', response.status);
      }
    } catch (error) {
      console.error('Erro ao criar matéria:', error);
    }
  };

  return (
    <View style={CreateDisciplineStyle.container}>
      <View style={CreateDisciplineStyle.inputContainer}>
        <Text style={CreateDisciplineStyle.label}>Matéria:</Text>
        <TextInput
          style={CreateDisciplineStyle.input}
          onChangeText={(text) => setName(text)}
          value={name}
        />
      </View>

      <View style={CreateDisciplineStyle.inputContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={CreateDisciplineStyle.label}>Data de início:</Text>
            <TouchableOpacity
              style={CreateDisciplineStyle.datePickerButton}
              onPress={showStartDatePicker}
            >
              <Text style={CreateDisciplineStyle.datePickerText}>
                {format(startDate, 'dd/MM/yyyy')}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isStartDatePickerVisible}
              mode="date"
              onConfirm={handleStartDateConfirm}
              onCancel={hideStartDatePicker}
              locale="pt_BR"
              headerTextIOS="Selecione uma data"
              cancelTextIOS="Cancelar"
              confirmTextIOS="Confirmar"
              is24Hour
              display="spinner"
              minimumDate={new Date('2023-01-01')}
              maximumDate={new Date('2050-12-31')}
              datePickerModeAndroid="spinner"
              monthNames={Array.from({ length: 12 }, (_, i) => translateMonth(i + 1))}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={CreateDisciplineStyle.label}>Data de conclusão:</Text>
            <TouchableOpacity
              // style={CreateDisciplineStyle.datePickerButton}
              onPress={showEndDatePicker}
            >
              <Text>{format(endDate, 'dd/MM/yyyy')}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isEndDatePickerVisible}
              mode="date"
              onConfirm={handleEndDateConfirm}
              onCancel={hideEndDatePicker}
              locale="pt_BR"
              headerTextIOS="Selecione uma data"
              cancelTextIOS="Cancelar"
              confirmTextIOS="Confirmar"
              is24Hour
              display="spinner"
              minimumDate={new Date('2023-01-01')}
              maximumDate={new Date('2050-12-31')}
              datePickerModeAndroid="spinner"
              monthNames={Array.from({ length: 12 }, (_, i) => translateMonth(i + 1))}
            />
          </View>
        </View>
      </View>

      <View style={CreateDisciplineStyle.inputContainer}>
        <Text style={CreateDisciplineStyle.label}>Status:</Text>
        <View style={CreateDisciplineStyle.statusContainer}>
          {Object.keys(statusMap).map((statusKey) => (
            <TouchableOpacity
              key={statusKey}
              style={[
                CreateDisciplineStyle.statusButton,
                status === parseInt(statusKey, 10)
                  ? CreateDisciplineStyle.selectedStatus
                  : { backgroundColor: '#ccc' },
              ]}
              onPress={() => {
                setStatus(parseInt(statusKey, 10));
              }}
              disabled={false}
            >
              <Text style={CreateDisciplineStyle.statusText}>{statusMap[statusKey]}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={CreateDisciplineStyle.addButton} onPress={handleCreate}>
        <Text style={CreateDisciplineStyle.addButtonText}>Cadastrar</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={CreateDisciplineStyle.modalContainer}>
          <View style={CreateDisciplineStyle.modalContent}>
            <Text style={CreateDisciplineStyle.modalText}>
              Matéria {createdDisciplineName} cadastrada com sucesso!
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DisciplineCreation;
