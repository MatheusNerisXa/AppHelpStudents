import { StyleSheet } from 'react-native';

export const translationStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    fontSize: 16,
  },
  languageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  languagePicker: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 8,
    marginLeft: 4,
    marginRight: 4,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  languageLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  languageDropdown: {
    flex: 1,
    padding: 8,
  },
  dropdown: {
    marginTop: 8,
    borderRadius: 8,
    borderColor: '#ccc',
  },
  languageDropdownText: {
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  outputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  output: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    fontSize: 16,
    height: 150,
  },
});
