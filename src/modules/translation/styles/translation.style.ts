import { StyleSheet } from 'react-native';

export const translationStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 20,
    backgroundColor: '#F4F5F7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  languagePicker: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginLeft: 6,
    backgroundColor: 'white',
  },
  languageLabel: {
    marginRight: 8,
    color: '#333',
  },
  languageDropdown: {
    flex: 1,
  },
  languageDropdownText: {
    fontSize: 16,
    color: '#333',
  },
  space: {
    width: 16,
  },
  input: {
    height: 120,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: 'white',
    color: '#333',
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
  },
  outputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  outputText: {
    fontSize: 16,
    color: '#555',
  },
});
