import { StyleSheet } from 'react-native';

const CreateDisciplineStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    color: '#333',
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statusButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  selectedStatus: {
    backgroundColor: '#007AFF',
  },
  statusText: {
    fontSize: 16,
    color: '#333',
  },
  datePicker: {
    width: 200,
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 4,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  successMessage: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  successText: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: 18,
  },
  dateText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 8,
  },
});

export default CreateDisciplineStyle;
