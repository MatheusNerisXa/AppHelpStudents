/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ModalDropdown from 'react-native-modal-dropdown';

import { useRequest } from '../../../shared/hooks/useRequest';
import AbsencesStyle from '../../absences/styles/absences.style';
import ActivitiesCreationStyle from '../styles/activitiesCreation';

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

const ActivitiesCreation = ({ navigation }) => {
  const [taskName, setTaskName] = useState('');
  const { getUserFromStorage } = useRequest();

  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [user, setUser] = useState(null);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [disciplines, setDisciplines] = useState([]);
  const [selectedDiscipline, setSelectedDiscipline] = useState(null);
  const [selectedDisciplineValue, setSelectedDisciplineValue] = useState('Selecione uma matéria');

  const [taskNameError, setTaskNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserFromStorage();
      setUser(user);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchUserDisciplines = async () => {
      try {
        const response = await axios.get(`http://192.168.1.4:8080/discipline/user/${user.id}`);

        if (response.status === 200) {
          const userDisciplines = response.data;
          setDisciplines(userDisciplines);
        } else {
          console.error('Erro ao obter as disciplinas do usuário:', response.data);
        }
      } catch (error) {
        console.error('Erro ao obter as disciplinas do usuário:', error);
      }
    };

    if (user) {
      fetchUserDisciplines();
    }
  }, [user]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    hideDatePicker();
    setSelectedDate(date);

    const formattedDisplayDate = format(date, 'dd/MM/yyyy');

    setDueDate(formattedDueDate);
  };

  const handleSaveActivity = async () => {
    try {
      if (taskName.length < 3) {
        setTaskNameError(true);
        return;
      } else {
        setTaskNameError(false);
      }

      if (description.length < 3) {
        setDescriptionError(true);
        return;
      } else {
        setDescriptionError(false);
      }

      const formattedDueDate = format(selectedDate, 'yyyy-MM-dd');

      const activityData = {
        taskName,
        description,
        dueDate: formattedDueDate,
        isCompleted,
        user,
        discipline: selectedDiscipline ? selectedDiscipline.id : null,
      };

      const response = await axios.post('http://192.168.1.4:8080/activities', activityData);

      if (response.status === 201) {
        navigation.navigate('Activities');
        setTaskName('');
        setDescription('');
        setSelectedDiscipline(null);
        setSelectedDisciplineValue('Selecione uma disciplina');
      } else {
        console.error('Erro ao criar a atividade:', response.data);
      }
    } catch (error) {
      console.error('Erro ao criar a atividade:', error);
    }
  };

  return (
    <View style={ActivitiesCreationStyle.container}>
      <Text style={ActivitiesCreationStyle.label}>Nome da Tarefa:</Text>
      <TextInput
        placeholder="Digite o nome da tarefa"
        value={taskName}
        onChangeText={(text) => setTaskName(text)}
        style={[
          ActivitiesCreationStyle.inputField,
          taskNameError ? { borderColor: 'red', borderWidth: 1 } : null,
        ]}
        placeholderTextColor="#000"
      />

      {taskNameError && (
        <Text style={{ color: 'red' }}>O nome da tarefa deve ter pelo menos 3 caracteres.</Text>
      )}

      <Text style={ActivitiesCreationStyle.label}>Descrição:</Text>
      <TextInput
        placeholder="Digite a descrição da tarefa"
        value={description}
        onChangeText={(text) => setDescription(text)}
        style={[
          ActivitiesCreationStyle.inputField,
          { height: 'auto' },
          descriptionError ? { borderColor: 'red', borderWidth: 1 } : null,
        ]}
        multiline={true}
        numberOfLines={4}
        placeholderTextColor="#000"
      />

      {descriptionError && (
        <Text style={{ color: 'red' }}>A descrição deve ter pelo menos 3 caracteres.</Text>
      )}

      <Text style={ActivitiesCreationStyle.label}>Data de Vencimento:</Text>
      <TouchableOpacity style={AbsencesStyle.datePickerButton} onPress={showDatePicker}>
        <Text style={AbsencesStyle.datePickerText}>{format(selectedDate, 'dd/MM/yyyy')}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
        locale="pt_BR"
        headerTextIOS="Selecione uma data"
        cancelTextIOS="Cancelar"
        confirmTextIOS="Confirmar"
        is24Hour
        display="spinner"
        minimumDate={new Date('2023-01-01')}
        maximumDate={new Date('2030-12-31')}
        datePickerModeAndroid="spinner"
        monthNames={Array.from({ length: 12 }, (_, i) => translateMonth(i + 1))}
      />
      <Text style={ActivitiesCreationStyle.label}>Matéria:</Text>
      <ModalDropdown
        options={disciplines.map((discipline) => discipline.name)}
        defaultIndex={0}
        onSelect={(index) => {
          const selectedDiscipline = disciplines[index];
          setSelectedDiscipline(selectedDiscipline);
          setSelectedDisciplineValue(selectedDiscipline.name);
          console.log('ID da disciplina selecionada:', selectedDiscipline.id);
        }}
        defaultValue={selectedDisciplineValue}
        style={ActivitiesCreationStyle.dropdown}
        textStyle={ActivitiesCreationStyle.dropdownText}
        dropdownStyle={ActivitiesCreationStyle.dropdownContainer}
        dropdownTextStyle={{ fontSize: 16, color: 'black', textAlign: 'center' }}
      />

      <View style={ActivitiesCreationStyle.toggleContainer}>
        <Text style={ActivitiesCreationStyle.label}>Concluído:</Text>
        <Switch
          value={isCompleted}
          onValueChange={(value) => setIsCompleted(value)}
          style={ActivitiesCreationStyle.toggleButton}
        />
      </View>
      <TouchableOpacity style={ActivitiesCreationStyle.addButton} onPress={handleSaveActivity}>
        <Text style={ActivitiesCreationStyle.addButtonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActivitiesCreation;
