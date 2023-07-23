import { StyleSheet } from 'react-native';

const chatStyle = StyleSheet.create({
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

export default chatStyle;
