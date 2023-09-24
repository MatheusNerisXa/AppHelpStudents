import { StyleSheet } from 'react-native';

const AbsencesStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#253494',
    borderRadius: 4,
    padding: 8,
    color: '#000',
    marginBottom: 16,
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#253494',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
  },
  datePickerText: {
    color: '#000',
  },
  button: {
    backgroundColor: '#253494',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AbsencesStyle;
