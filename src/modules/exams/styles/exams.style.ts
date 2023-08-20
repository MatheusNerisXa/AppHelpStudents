import { StyleSheet } from 'react-native';

const ExamsStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  searchContainer: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    color: '#FFF',
    textAlign: 'center',
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
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  examTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
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
    marginTop: 5,
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
  },
  dateLabelBold: {
    color: '#555',
    fontWeight: 'bold',
  },
});

export default ExamsStyle;
