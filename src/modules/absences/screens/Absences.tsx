import axios from 'axios';
import { format } from 'date-fns';
import React, { useRef, useState } from 'react';
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
  const [selectedDate, setSelectedDate] = useState(null);
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const buttonRef = useRef(null);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    hideDatePicker();
    setSelectedDate(date);
  };

  const handleAbsenceSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    if (!selectedDate) {
      Alert.alert('Erro', 'Selecione uma data válida.');
      return;
    }

    if (numberOfAbsences.trim() === '' || parseInt(numberOfAbsences, 10) === 0) {
      Alert.alert('Erro', 'Número de faltas deve ser maior que zero.');
      return;
    }

    if (reason.trim() === '' || reason.length < 3) {
      Alert.alert('Erro', 'Motivo da falta deve conter pelo menos 3 caracteres.');
      return;
    }

    try {
      setIsSubmitting(true);
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      const response = await axios.post(URL_ABSENCES, {
        numberOfAbsences: parseInt(numberOfAbsences, 10),
        disciplineId: disciplineId,
        date: formattedDate,
        reason: reason,
      });

      if (response.status === 201) {
        const formattedDisplayDate = format(selectedDate, 'dd/MM/yyyy');
        Alert.alert('Sucesso', 'Falta cadastrada com sucesso em ' + formattedDisplayDate);
        setNumberOfAbsences('');
        setReason('');
        setSelectedDate(null);
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar a falta.');
    } finally {
      setIsSubmitting(false);
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
        <Text style={AbsencesStyle.datePickerText}>
          {selectedDate ? format(selectedDate, 'dd/MM/yyyy') : 'Selecionar Data'}
        </Text>
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
        monthNames={Array.from({ length: 12 }, (_, i) => translateMonth(i + 1))}
      />
      <TouchableOpacity
        style={AbsencesStyle.button}
        onPress={handleAbsenceSubmit}
        disabled={isSubmitting}
        ref={buttonRef}
      >
        <Text style={AbsencesStyle.buttonText}>
          {isSubmitting ? 'Enviando...' : 'Cadastrar Falta'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AbsencesScreen;
