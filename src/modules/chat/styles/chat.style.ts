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
    backgroundColor: '#253494',
    padding: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  animationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  thinkingDotsContainer: {
    flexDirection: 'row',
  },
  thinkingDot: {
    fontSize: 60,
    marginLeft: 5,
  },
  dotRed: {
    color: '#FF5733',
  },
  dotGreen: {
    color: '#4CAF50',
  },
  dotBlue: {
    color: '#2196F3',
  },
  characterCount: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
    marginLeft: 15,
    marginBottom: 15,
  },
});

export default chatStyle;
