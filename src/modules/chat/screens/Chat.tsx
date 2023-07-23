import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const OPENAI_API_KEY = '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';

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
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Ajuste o valor conforme necessário
    >
      <ScrollView
        style={styles.chatContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        {chatLog.map((message, index) => (
          <View key={index}>
            {message.type === 'user' && (
              <View style={styles.userMessage}>
                <Text style={styles.messageText}>{message.text}</Text>
              </View>
            )}
            {message.type === 'ai' && (
              <View style={styles.aiMessage}>
                <Text style={styles.messageText}>{message.text}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setInputText}
          value={inputText}
          placeholder="Digite sua mensagem..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  userMessage: {
    backgroundColor: '#64B5F6',
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    maxWidth: '70%',
  },
  aiMessage: {
    backgroundColor: '#81C784',
    alignSelf: 'flex-end',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    maxWidth: '70%',
  },
  messageText: {
    color: '#FFF',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#CCC',
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default Chat;
