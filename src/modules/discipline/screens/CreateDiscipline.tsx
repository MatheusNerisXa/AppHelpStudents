/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import { isDate } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Keyboard, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
  1: 'Aprov',
  2: 'Reprov',
  3: 'Cursa',
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
  const [room, setRoom] = useState('');
  const [minGrade, setMinGrade] = useState('');
  const [maxAbsences, setMaxAbsences] = useState('');
  const [hour, setHour] = useState('');
  const [monday, setMonday] = useState(false);
  const [tuesday, setTuesday] = useState(false);
  const [wednesday, setWednesday] = useState(false);
  const [thursday, setThursday] = useState(false);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);
  const [sunday, setSunday] = useState(false);
  const [teacher, setTeacher] = useState('');
  const [gradeWeight1, setGradeWeight1] = useState('');
  const [gradeWeight2, setGradeWeight2] = useState('');
  const [assignmentsWeight, setAssignmentsWeight] = useState('');

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
      room,
      minGrade,
      maxAbsences,
      hour,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
      teacher,
      gradeWeight1,
      gradeWeight2,
      assignmentsWeight,
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
        Keyboard.dismiss();
      } else {
        console.error('Erro ao criar matéria:', response.status);
      }
    } catch (error) {
      console.error('Erro ao criar matéria:', error);
    }
  };

  return (
    <ScrollView style={CreateDisciplineStyle.container}>
      <View style={CreateDisciplineStyle.container}>
        <View style={CreateDisciplineStyle.inputContainer}>
          <Text style={CreateDisciplineStyle.label}>Matéria:</Text>
          <TextInput
            style={CreateDisciplineStyle.input}
            onChangeText={(text) => setName(text)}
            value={name}
            placeholder="Digite o nome da matéria"
            placeholderTextColor="#000"
          />
        </View>

        <View style={CreateDisciplineStyle.inputContainer}>
          <Text style={CreateDisciplineStyle.label}>Professor(a):</Text>
          <TextInput
            style={CreateDisciplineStyle.input}
            onChangeText={(text) => setTeacher(text)}
            value={teacher}
            placeholder="Digite o nome do professor(a)"
            placeholderTextColor="#000"
          />
        </View>

        <View style={CreateDisciplineStyle.inputContainer}>
          <Text style={CreateDisciplineStyle.label}>Sala:</Text>
          <TextInput
            style={CreateDisciplineStyle.input}
            onChangeText={(text) => setRoom(text)}
            value={room}
            placeholder="Digite o nome da sala"
            placeholderTextColor="#000"
          />
        </View>

        <View style={CreateDisciplineStyle.inputContainer}>
          <Text style={CreateDisciplineStyle.label}>Nota Mínima:</Text>
          <TextInput
            style={CreateDisciplineStyle.input}
            onChangeText={(text) => setMinGrade(text)}
            value={minGrade}
            placeholder="Digite a nota mínima"
            placeholderTextColor="#000"
            keyboardType="numeric"
          />
        </View>

        <View style={CreateDisciplineStyle.inputContainer}>
          <Text style={CreateDisciplineStyle.label}>Falta Máxima:</Text>
          <TextInput
            style={CreateDisciplineStyle.input}
            onChangeText={(text) => setMaxAbsences(text)}
            value={maxAbsences}
            placeholder="Digite a falta máxima"
            placeholderTextColor="#000"
            keyboardType="numeric"
          />
        </View>

        <View style={CreateDisciplineStyle.inputContainer}>
          <Text style={CreateDisciplineStyle.label}>Horário:</Text>
          <TextInput
            style={CreateDisciplineStyle.input}
            onChangeText={(text) => setHour(text)}
            value={hour}
            placeholder="Digite o horário"
            placeholderTextColor="#000"
          />
        </View>

        <View style={CreateDisciplineStyle.inputContainer}>
          <Text style={CreateDisciplineStyle.label}>Dias de Aula:</Text>
          <View style={CreateDisciplineStyle.statusContainer}>
            <TouchableOpacity
              style={[
                CreateDisciplineStyle.statusButton,
                monday ? CreateDisciplineStyle.selectedStatus : { backgroundColor: '#ccc' },
              ]}
              onPress={() => {
                setMonday(!monday);
              }}
              disabled={false}
            >
              <Text style={CreateDisciplineStyle.statusText}>Seg</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                CreateDisciplineStyle.statusButton,
                tuesday ? CreateDisciplineStyle.selectedStatus : { backgroundColor: '#ccc' },
              ]}
              onPress={() => {
                setTuesday(!tuesday);
              }}
              disabled={false}
            >
              <Text style={CreateDisciplineStyle.statusText}>Ter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                CreateDisciplineStyle.statusButton,
                wednesday ? CreateDisciplineStyle.selectedStatus : { backgroundColor: '#ccc' },
              ]}
              onPress={() => {
                setWednesday(!wednesday);
              }}
              disabled={false}
            >
              <Text style={CreateDisciplineStyle.statusText}>Qua</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                CreateDisciplineStyle.statusButton,
                thursday ? CreateDisciplineStyle.selectedStatus : { backgroundColor: '#ccc' },
              ]}
              onPress={() => {
                setThursday(!thursday);
              }}
              disabled={false}
            >
              <Text style={CreateDisciplineStyle.statusText}>Qui</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                CreateDisciplineStyle.statusButton,
                friday ? CreateDisciplineStyle.selectedStatus : { backgroundColor: '#ccc' },
              ]}
              onPress={() => {
                setFriday(!friday);
              }}
              disabled={false}
            >
              <Text style={CreateDisciplineStyle.statusText}>Sex</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                CreateDisciplineStyle.statusButton,
                saturday ? CreateDisciplineStyle.selectedStatus : { backgroundColor: '#ccc' },
              ]}
              onPress={() => {
                setSaturday(!saturday);
              }}
              disabled={true}
            >
              <Text style={CreateDisciplineStyle.statusText}>Sáb</Text>
            </TouchableOpacity>
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

        <View style={CreateDisciplineStyle.inputContainer}>
          <Text style={CreateDisciplineStyle.label}>Peso da Nota 1:</Text>
          <TextInput
            style={CreateDisciplineStyle.input}
            onChangeText={(text) => setGradeWeight1(text)}
            value={gradeWeight1}
            placeholder="Digite o peso da Nota 1"
            placeholderTextColor="#000"
            keyboardType="numeric"
          />
        </View>

        <View style={CreateDisciplineStyle.inputContainer}>
          <Text style={CreateDisciplineStyle.label}>Peso da Nota 2:</Text>
          <TextInput
            style={CreateDisciplineStyle.input}
            onChangeText={(text) => setGradeWeight2(text)}
            value={gradeWeight2}
            placeholder="Digite o peso da Nota 2"
            placeholderTextColor="#000"
            keyboardType="numeric"
          />
        </View>

        <View style={CreateDisciplineStyle.inputContainer}>
          <Text style={CreateDisciplineStyle.label}>Peso das Atividades:</Text>
          <TextInput
            style={CreateDisciplineStyle.input}
            onChangeText={(text) => setAssignmentsWeight(text)}
            value={assignmentsWeight}
            placeholder="Digite o peso das Atividades"
            placeholderTextColor="#000"
            keyboardType="numeric"
          />
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
    </ScrollView>
  );
};

export default DisciplineCreation;
