import { StyleSheet } from 'react-native';

const CreateDisciplineStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  inputContainer: {
    marginBottom: 16,
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
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusButton: {
    backgroundColor: '#c',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  selectedStatus: {
    backgroundColor: '#f09d5c',
  },
  statusText: {
    fontSize: 16,
    color: '#FFF',
  },
  datePicker: {
    borderWidth: 1,
    borderColor: '#253494',
    borderRadius: 4,
    width: '100%',
    marginBottom: 16,
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CreateDisciplineStyle;
