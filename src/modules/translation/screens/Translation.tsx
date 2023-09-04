import axios from 'axios';
import React, { useState } from 'react';
import { Clipboard, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

import { KEY_TRANSLATION } from '../../../../config';
import { Icon } from '../../../shared/components/icon/Icon';
import { URL_TRANSLATION } from '../../../shared/constants/urls';
import { translationStyles } from '../styles/translation.style';

const languageOptions = [
  { label: 'Português', value: 'pt' },
  { label: 'Inglês', value: 'en' },
  { label: 'Espanhol', value: 'es' },
  { label: 'Francês', value: 'fr' },
  { label: 'Alemão', value: 'de' },
  { label: 'Italiano', value: 'it' },
  { label: 'Holandês', value: 'nl' },
  { label: 'Russo', value: 'ru' },
];

const Translation = () => {
  const [sourceText, setSourceText] = useState('');
  const [targetText, setTargetText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('pt');
  const [targetLanguage, setTargetLanguage] = useState('en');

  const handleTranslation = async () => {
    try {
      const url = URL_TRANSLATION;
      const payload = {
        source_language: sourceLanguage,
        target_language: targetLanguage,
        text: sourceText,
      };
      const headers = {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': KEY_TRANSLATION,
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com',
      };

      const response = await axios.post(url, payload, { headers });
      setTargetText(response.data.data.translatedText);
    } catch (error) {
      console.error('Erro na tradução:', error);
    }
  };

  const handleCloseKeyboard = () => {
    Keyboard.dismiss();
    setSourceText('');
    setTargetText('');
  };

  const handleCopyText = () => {
    Clipboard.setString(targetText);
  };

  return (
    <View style={translationStyles.container}>
      <View style={translationStyles.languageContainer}>
        <View style={translationStyles.languagePicker}>
          <Text style={translationStyles.languageLabel}>De:</Text>
          <ModalDropdown
            style={translationStyles.languageDropdown}
            options={languageOptions.map((option) => option.label)}
            onSelect={(index) => setSourceLanguage(languageOptions[index].value)}
          >
            <Text style={translationStyles.languageDropdownText}>
              {languageOptions.find((option) => option.value === sourceLanguage)?.label}
            </Text>
          </ModalDropdown>
        </View>

        <View style={translationStyles.languagePicker}>
          <Text style={translationStyles.languageLabel}>Para:</Text>
          <ModalDropdown
            style={translationStyles.languageDropdown}
            options={languageOptions.map((option) => option.label)}
            onSelect={(index) => setTargetLanguage(languageOptions[index].value)}
          >
            <Text style={translationStyles.languageDropdownText}>
              {languageOptions.find((option) => option.value === targetLanguage)?.label}
            </Text>
          </ModalDropdown>
        </View>
      </View>

      <View style={translationStyles.inputContainer}>
        <TextInput
          style={translationStyles.input}
          multiline
          placeholder="Insira o texto para tradução"
          placeholderTextColor={'#000'}
          value={sourceText}
          onChangeText={setSourceText}
          autoFocus={false}
        />
        <TouchableOpacity style={translationStyles.closeIcon} onPress={handleCloseKeyboard}>
          <Text style={translationStyles.closeIconText}>X</Text>
        </TouchableOpacity>
      </View>

      <View style={translationStyles.resultContainer}>
        <Text style={translationStyles.outputLabel}>Resultado:</Text>
        <View>
          <Text style={translationStyles.outputText}>{targetText}</Text>
          <TouchableOpacity onPress={handleCopyText} style={translationStyles.copyIconContainer}>
            <Icon name="copy" size={20} color="#f09d5c" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={translationStyles.buttonContainer}>
        <TouchableOpacity style={translationStyles.button} onPress={handleTranslation}>
          <Text style={translationStyles.buttonText}>Traduzir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Translation;
