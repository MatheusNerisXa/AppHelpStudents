import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-datepicker';

import { URL_DISCIPLINE_CREATE } from '../../../shared/constants/urls';
import { useRequest } from '../../../shared/hooks/useRequest';
import CreateDisciplineStyle from '../styles/createDiscipline.style';

const statusMap = {
  1: 'Aprovado',
  2: 'Reprovado',
  3: 'Cursando',
  4: 'Sub',
};

const DisciplineCreationScreen = () => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState(3);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { getUserFromStorage } = useRequest();
  const [userId, setUserId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserFromStorage();
      setUserId(userData?.id);
    };

    fetchUserData();
  }, [getUserFromStorage]);

  const navigation = useNavigation();

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

  const getMonthName = (month) => {
    const months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ];
    return months[month - 1];
  };

  return (
    <View style={CreateDisciplineStyle.container}>
      <Text style={CreateDisciplineStyle.label}>Nome da matéria:</Text>
      <TextInput
        style={CreateDisciplineStyle.input}
        onChangeText={(text) => setName(text)}
        value={name}
      />

      <Text style={CreateDisciplineStyle.label}>Status:</Text>
      <View style={CreateDisciplineStyle.statusContainer}>
        {Object.keys(statusMap).map((statusKey) => (
          <TouchableOpacity
            key={statusKey}
            style={[
              CreateDisciplineStyle.statusButton,
              status === parseInt(statusKey, 10) && CreateDisciplineStyle.selectedStatus,
            ]}
            onPress={() => setStatus(parseInt(statusKey, 10))}
          >
            <Text style={CreateDisciplineStyle.statusText}>{statusMap[statusKey]}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={CreateDisciplineStyle.label}>Data de início:</Text>
      <DatePicker
        style={CreateDisciplineStyle.datePicker}
        date={startDate}
        mode="date"
        format="DD-MM-YYYY"
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 36,
            borderWidth: 0,
            backgroundColor: 'white',
          },
          dateText: {
            color: 'black',
          },
        }}
        onDateChange={(date) => setStartDate(new Date(date))}
        locale={'pt-br'}
        // eslint-disable-next-line react-native/no-inline-styles
        renderMonth={(month) => <Text style={{ color: 'black' }}>{getMonthName(month)}</Text>}
      />

      <Text style={CreateDisciplineStyle.label}>Data de conclusão:</Text>
      <DatePicker
        style={CreateDisciplineStyle.datePicker}
        date={endDate}
        mode="date"
        format="DD-MM-YYYY"
        confirmBtnText="Confirmar"
        cancelBtnText="Cancelar"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
          },
          dateInput: {
            marginLeft: 36,
            borderWidth: 0,
            backgroundColor: 'white',
          },
          dateText: {
            color: 'black',
          },
        }}
        onDateChange={(date) => setEndDate(new Date(date))}
        locale={'pt-br'}
        // eslint-disable-next-line react-native/no-inline-styles
        renderMonth={(month) => <Text style={{ color: 'black' }}>{getMonthName(month)}</Text>}
      />

      <TouchableOpacity style={CreateDisciplineStyle.addButton} onPress={handleCreate}>
        <Text style={CreateDisciplineStyle.addButtonText}>Cadastrar matéria</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={CreateDisciplineStyle.modalContainer}>
          <View style={CreateDisciplineStyle.modalContent}>
            <Text style={CreateDisciplineStyle.modalText}>Matéria cadastrada com sucesso!</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DisciplineCreationScreen;
