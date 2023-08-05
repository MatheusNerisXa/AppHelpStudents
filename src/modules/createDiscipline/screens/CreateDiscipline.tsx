import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
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
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserFromStorage();
      setUserId(userData?.id);
    };

    fetchUserData();
  }, [getUserFromStorage]);

  const navigation = useNavigation();

  const handleCreate = async () => {
    console.log('Criando materia...');

    const newDiscipline = {
      name,
      disciplineStatusId: status,
      userId,
      dateStart: startDate.toISOString(),
      dateEnd: endDate.toISOString(),
    };

    console.log('New discipline:', newDiscipline);

    try {
      const response = await fetch(URL_DISCIPLINE_CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDiscipline),
      });

      if (response.ok) {
        console.log('Materia criada com sucesso!');
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          navigation.navigate('Discipline', { refresh: true });
        }, 1500);
      } else {
        console.error('Erro ao criar materia:', response.status);
      }
    } catch (error) {
      console.error('Erro ao criar materia:', error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const formatBrazilianDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <View style={CreateDisciplineStyle.container}>
      <Text style={CreateDisciplineStyle.label}>Noma da matéria:</Text>
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

      <Text style={CreateDisciplineStyle.label}>Data de ínicio:</Text>
      <DatePicker
        style={CreateDisciplineStyle.datePicker}
        date={startDate}
        mode="date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
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
      />

      <Text style={CreateDisciplineStyle.label}>Data de conclusão:</Text>
      <DatePicker
        style={CreateDisciplineStyle.datePicker}
        date={endDate}
        mode="date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
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
      />

      <TouchableOpacity style={CreateDisciplineStyle.addButton} onPress={handleCreate}>
        <Text style={CreateDisciplineStyle.addButtonText}>Cadastrar matéria</Text>
      </TouchableOpacity>

      {showSuccessMessage && (
        <View style={CreateDisciplineStyle.successMessage}>
          <Text style={CreateDisciplineStyle.successText}>Matéria cadastrada com sucesso!</Text>
        </View>
      )}
    </View>
  );
};

export default DisciplineCreationScreen;
