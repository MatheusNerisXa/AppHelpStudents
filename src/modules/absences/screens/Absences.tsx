import axios from 'axios';
import { format, isDate } from 'date-fns';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { URL_ABSENCES } from '../../../shared/constants/urls';
import AbsencesStyle from '../styles/absences.style';

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

const AbsencesScreen = ({ route }) => {
  const { disciplineId } = route.params;
  const [numberOfAbsences, setNumberOfAbsences] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reason, setReason] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    if (isDate(date)) {
      hideDatePicker();
      setSelectedDate(date);
    }
  };

  const handleAbsenceSubmit = async () => {
    try {
      const response = await axios.post(URL_ABSENCES, {
        numberOfAbsences: parseInt(numberOfAbsences, 10),
        disciplineId: disciplineId,
        date: format(selectedDate, 'dd/MM/yyyy'),
        reason: reason,
      });

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Falta cadastrada com sucesso.');
        setNumberOfAbsences('');
        setReason('');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar a falta.');
    }
  };

  return (
    <View style={AbsencesStyle.container}>
      <Text style={AbsencesStyle.label}>Motivo da Falta:</Text>
      <TextInput
        style={AbsencesStyle.input}
        onChangeText={(text) => setReason(text)}
        value={reason}
        placeholder="Digite o motivo da falta"
        placeholderTextColor="#000"
      />
      <Text style={AbsencesStyle.label}>Número de Faltas:</Text>
      <TextInput
        style={AbsencesStyle.input}
        onChangeText={(text) => setNumberOfAbsences(text)}
        value={numberOfAbsences}
        keyboardType="numeric"
        placeholder="Digite o número de faltas"
        placeholderTextColor="#000"
      />
      <Text style={AbsencesStyle.label}>Data da Falta:</Text>
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
        maximumDate={new Date()}
        datePickerModeAndroid="spinner"
        monthNames={Array.from({ length: 12 }, (_, i) => translateMonth(i + 1))}
      />
      <TouchableOpacity style={AbsencesStyle.button} onPress={handleAbsenceSubmit}>
        <Text style={AbsencesStyle.buttonText}>Cadastrar Falta</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AbsencesScreen;
