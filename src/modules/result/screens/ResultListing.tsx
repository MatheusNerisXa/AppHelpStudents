import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { URL_RESULT } from '../../../shared/constants/urls';
import resultStyle from '../styles/result.style';

const ResultListingScreen = ({ route }) => {
  const { disciplineId } = route.params;
  const [grade, setGrade] = useState('');
  const [workNotes, setWorkNotes] = useState('');

  const handleGradeChange = (text) => {
    setGrade(text);
  };

  const handleWorkNotesChange = (text) => {
    setWorkNotes(text);
  };

  const handleAddResult = async () => {
    try {
      const response = await axios.post(URL_RESULT, {
        grade: parseFloat(grade),
        workNotes: workNotes,
        disciplineId: disciplineId,
      });

      if (response.status === 201) {
        Alert.alert('Sucesso', 'Resultado criado com sucesso.');
        setGrade('');
        setWorkNotes('');
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao criar o resultado.');
      }
    } catch (error) {
      console.error('Erro ao criar o resultado: ', error);
      Alert.alert('Erro', 'Ocorreu um erro ao criar o resultado.');
    }
  };

  return (
    <View style={resultStyle.container}>
      <Text style={resultStyle.label}>Nota:</Text>
      <TextInput
        style={resultStyle.input}
        onChangeText={handleGradeChange}
        value={grade}
        keyboardType="numeric"
      />

      <Text style={resultStyle.label}>Observações do Trabalho:</Text>
      <TextInput style={resultStyle.input} onChangeText={handleWorkNotesChange} value={workNotes} />

      <TouchableOpacity style={resultStyle.button} onPress={handleAddResult}>
        <Text style={resultStyle.buttonText}>Cadastrar Falta</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResultListingScreen;
