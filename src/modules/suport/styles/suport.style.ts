import { StyleSheet } from 'react-native';

const suportStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#253494',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#253494',
    padding: 16,
    fontSize: 16,
    borderRadius: 8,
    color: '#333',
  },
  descriptionInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#f09d5c',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default suportStyle;
