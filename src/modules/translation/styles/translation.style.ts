import { StyleSheet } from 'react-native';

export const translationStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 20,
    backgroundColor: '#F4F5F7',
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
    fontSize: 15,
    marginRight: 8,
    color: '#000',
  },
  languageDropdown: {
    flex: 1,
  },
  languageDropdownText: {
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#253494',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: 'white',
    color: '#000',
  },
  input: {
    flex: 1,
    height: 120,
    textAlignVertical: 'top',
    fontSize: 16,
  },
  closeIcon: {
    padding: 8,
    position: 'absolute',
    right: 8,
    top: 1,
    zIndex: 1,
  },
  button: {
    marginTop: 5,
    backgroundColor: '#253494',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 20,
  },
  resultContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    borderColor: '#253494',
    borderWidth: 1,
    paddingHorizontal: 8,
  },
  outputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  outputText: {
    fontSize: 16,
    color: '#555',
  },

  buttonContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  closeIconText: {
    fontSize: 13,
    color: '#FF0000',
    fontWeight: 'bold',
  },
  copyIconContainer: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});
