import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { KEY_CHAT } from '../../../../config'; // Importe a chave de API do arquivo config.js
import chatStyle from '../styles/chat.style';

const OPENAI_API_KEY = KEY_CHAT;

const Chat = () => {
  const [inputText, setInputText] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [chatLog]);

  const sendMessage = async () => {
    if (inputText.trim() === '') return;
    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', text: inputText }]);
    setInputText('');

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: inputText },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        },
      );

      console.log('API Response:', response.data);

      const assistantReply = response.data.choices[0].message.content.trim();
      if (assistantReply) {
        setChatLog((prevChatLog) => [...prevChatLog, { type: 'ai', text: assistantReply }]);
      }
    } catch (error) {
      console.error(
        'Error sending message to the API:',
        error.response ? error.response.data : error,
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={chatStyle.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Ajuste o valor conforme necessário
    >
      <ScrollView
        style={chatStyle.chatContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        {chatLog.map((message, index) => (
          <View key={index}>
            {message.type === 'user' && (
              <View style={chatStyle.userMessage}>
                <Text style={chatStyle.messageText}>{message.text}</Text>
              </View>
            )}
            {message.type === 'ai' && (
              <View style={chatStyle.aiMessage}>
                <Text style={chatStyle.messageText}>{message.text}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      <View style={chatStyle.inputContainer}>
        <TextInput
          style={chatStyle.input}
          onChangeText={setInputText}
          value={inputText}
          placeholder="Digite sua mensagem..."
        />
        <TouchableOpacity style={chatStyle.sendButton} onPress={sendMessage}>
          <Text style={chatStyle.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Chat;
