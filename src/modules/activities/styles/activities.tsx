import { StyleSheet } from 'react-native';

const ActivitiesStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  loadingIndicator: {
    marginTop: 20,
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
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#253494',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  activityCard: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
    elevation: 3,
    position: 'relative',
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  activityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#253494',
    marginBottom: 10,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 16,
    right: 16,
  },
  icon: {
    height: 24,
    marginRight: 16,
    marginTop: 0,
  },
  deleteButton: {
    width: 60,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteIcon: {
    color: 'white', // Cor do ícone
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Alinhar os ícones à direita
    marginTop: 10, // Defina uma margem superior para separar os botões do conteúdo do cartão
    padding: 10, // Adicione algum espaço entre os botões
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#253494',
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
  },
  editButton: {
    width: 60,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    marginLeft: 10,
  },
  editText: {
    color: 'white',
    fontWeight: 'bold',
  },
  editIcon: {
    color: 'white',
  },
  completeButton: {
    width: 60,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  completeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  completeIcon: {
    color: 'white',
  },
  descriptionContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  activityDescription: {
    fontSize: 14,
    color: '#333',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: 4,
    color: '#000',
  },
  infoText: {
    fontSize: 15,
    color: '#555',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  rowFront: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 16,
    elevation: 3,
    position: 'relative',
  },
  hiddenButtons: {
    flexDirection: 'row',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
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
    width: '80%',
    maxWidth: 400,
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
  addButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Corrigido para 'flex-end'
    alignItems: 'flex-end',
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#253494',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'spacebetween',
    marginVertical: 10,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    marginLeft: 2,
    alignItems: 'center',
    backgroundColor: '#666666',
  },
  activeFilterButton: {
    backgroundColor: '#253494',
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  overdueMessageContainer: {
    backgroundColor: 'yellow',
    padding: 5,
    borderRadius: 5,
    marginTop: 1,
  },
  overdueMessage: {
    color: 'black',
    fontWeight: 'bold',
  },
});

export default ActivitiesStyle;
