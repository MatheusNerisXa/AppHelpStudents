import { StyleSheet } from 'react-native';

const AbsencesDetailsStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  totalFaltas: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#253494',
  },
  infoContainer: {
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  itemIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconContainer: {
    marginLeft: 6,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: '#253494',
  },
  modalTitle: {
    fontSize: 15,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#253494',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 10,
  },
  editModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  editModalBackground: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
    padding: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  inputValue: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#253494',
    borderRadius: 5,
    padding: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    marginRight: 2,
  },
  modalContainerEdit: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContentEdit: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 8,
    width: 300,
    borderWidth: 2,
    borderColor: '#253494',
  },
});

export default AbsencesDetailsStyle;
