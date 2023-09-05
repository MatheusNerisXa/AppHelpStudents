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
import * as Animatable from 'react-native-animatable';

import { KEY_CHAT } from '../../../../config';
import { Icon } from '../../../shared/components/icon/Icon';
import { URL_CHATGPT } from '../../../shared/constants/urls';
import chatStyle from '../styles/chat.style';

const OPENAI_API_KEY = KEY_CHAT;

const Chat = () => {
  const [inputText, setInputText] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [chatLog]);

  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    if (characterCount + inputText.length > 4000) {
      console.log('Limite de 4000 caracteres atingido!');
      return;
    }

    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', text: inputText }]);
    setInputText('');
    setIsThinking(true);

    try {
      const response = await axios.post(
        URL_CHATGPT,
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

      setIsThinking(false);

      const assistantReply = response.data.choices[0].message.content.trim();
      if (assistantReply) {
        setChatLog((prevChatLog) => [...prevChatLog, { type: 'ai', text: assistantReply }]);
      }
    } catch (error) {
      console.error(
        'Error sending message to the API:',
        error.response ? error.response.data : error,
      );
      setIsThinking(false);
    }
  };

  useEffect(() => {
    setCharacterCount(inputText.length);
  }, [inputText]);

  return (
    <KeyboardAvoidingView
      style={chatStyle.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
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
      {isThinking && (
        <View style={chatStyle.animationContainer}>
          <View style={chatStyle.thinkingDotsContainer}>
            <Animatable.Text
              animation="fadeIn"
              iterationCount="infinite"
              style={[chatStyle.thinkingDot, chatStyle.dotRed]}
            >
              .
            </Animatable.Text>
            <Animatable.Text
              animation="fadeIn"
              iterationCount="infinite"
              delay={200}
              style={[chatStyle.thinkingDot, chatStyle.dotGreen]}
            >
              .
            </Animatable.Text>
            <Animatable.Text
              animation="fadeIn"
              iterationCount="infinite"
              delay={400}
              style={[chatStyle.thinkingDot, chatStyle.dotBlue]}
            >
              .
            </Animatable.Text>
          </View>
        </View>
      )}
      <View style={chatStyle.inputContainer}>
        <TextInput
          style={[chatStyle.input]}
          onChangeText={setInputText}
          value={inputText}
          multiline={true}
          numberOfLines={4}
          placeholder="Digite sua mensagem..."
          maxLength={500}
        />
        <TouchableOpacity style={chatStyle.sendButton} onPress={sendMessage}>
          <Icon name="compass" style={chatStyle.sendButtonIcon} />
        </TouchableOpacity>
      </View>
      <Text style={chatStyle.characterCount}>{characterCount}/500 caracteres</Text>
    </KeyboardAvoidingView>
  );
};

export default Chat;
