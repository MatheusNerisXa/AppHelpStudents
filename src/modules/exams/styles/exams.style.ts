import { StyleSheet } from 'react-native';

const ExamsStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F6F8FA',
  },
  contentContainer: {
    paddingBottom: 16,
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
    marginBottom: 8,
    textAlign: 'center',
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  dateInfo: {
    flex: 1,
    alignItems: 'center',
  },
  dateLabel: {
    color: '#555',
    fontWeight: 'bold',
  },
  dateText: {
    color: '#333',
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 12,
    marginBottom: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    shadowColor: '#000',
    backgroundColor: '#FFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  noResultsContainer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  noResultsText: {
    color: '#666',
  },
});

export default ExamsStyle;
