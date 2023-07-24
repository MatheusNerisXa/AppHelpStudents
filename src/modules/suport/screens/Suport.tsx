import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import email from 'react-native-email';

import suportStyle from '../styles/suport.style';

const Support = () => {
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const handleSendEmail = () => {
    if (!subject.trim() || !description.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const to = ['matheus.nerisxa@outlook.com'];

    email(to, {
      subject,
      body: description,
    }).catch(console.error);
  };

  return (
    <View style={suportStyle.container}>
      <Text style={suportStyle.headerText}>Precisa de ajuda?</Text>
      <View style={suportStyle.inputContainer}>
        <TextInput
          style={suportStyle.input}
          value={subject}
          onChangeText={setSubject}
          placeholder="Assunto"
          placeholderTextColor="#a8a8a8"
        />
      </View>

      <View style={suportStyle.inputContainer}>
        <TextInput
          style={[suportStyle.input, suportStyle.descriptionInput]}
          value={description}
          onChangeText={setDescription}
          placeholder="Descreva seu problema ou dúvida"
          placeholderTextColor="#a8a8a8"
          multiline
        />
      </View>

      <TouchableOpacity onPress={handleSendEmail} style={suportStyle.button}>
        <Text style={suportStyle.buttonText}>Enviar E-mail</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Support;
