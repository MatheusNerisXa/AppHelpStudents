import { StyleSheet } from 'react-native';

const ExamsStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    shadowColor: '#253494',
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    color: '#333',
    fontSize: 16,
  },
  contentContainer: {
    paddingBottom: 16,
  },
  noResultsContainer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  noResultsText: {
    color: '#666',
  },
  examContainer: {
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    padding: 16,
    borderWidth: 2,
    borderColor: '#253494',
  },
  examTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#253494',
    textAlign: 'center',
    marginBottom: 8,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  dateInfo: {
    flex: 1,
    marginTop: 5,
  },
  provaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  provaDate: {
    marginLeft: 10,
  },
  prova2Date: {
    marginLeft: 10,
  },
  provaText: {
    marginRight: 2,
  },
  dateLabel: {
    color: '#555',
    fontWeight: 'bold',
  },
  dateText: {
    color: '#333',
  },
  dateInfoContainer: {
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateLabelBold: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
  },
  calendarButton: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginTop: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    marginRight: 5,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#253494',
    marginLeft: 10,
    marginTop: 50,
  },
  detailsIcon: {
    marginRight: 5,
  },
  detailsButtonText: {
    color: '#253494',
    fontWeight: 'bold',
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  acompanharButtonText: {
    fontWeight: 'bold',
    color: '#253494',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    width: '80%',
    maxWidth: 400,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#253494',
    borderRadius: 8,
    padding: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ExamsStyle;
