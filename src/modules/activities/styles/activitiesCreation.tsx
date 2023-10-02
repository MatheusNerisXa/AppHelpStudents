import { StyleSheet } from 'react-native';

const ActivitiesCreationStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  inputField: {
    borderWidth: 1,
    borderColor: '#253494',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
  toggleButton: {
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    backgroundColor: '#253494',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 4,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dropdown: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#253494',
    borderRadius: 4,
    paddingLeft: 10,
    paddingRight: 30,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  dropdownContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#253494',
    borderRadius: 5,
    marginTop: 10,
    width: '70%',
    marginLeft: 30,
  },
});

export default ActivitiesCreationStyle;
