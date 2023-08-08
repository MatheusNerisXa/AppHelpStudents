import { StyleSheet } from 'react-native';

export const ExamsStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F6F8FA',
  },
  contentContainer: {
    paddingBottom: 16,
  },
  descriptionContainer: {
    marginBottom: 8,
  },
  descriptionText: {
    color: '#333333',
    marginBottom: 4,
  },
  boldText: {
    fontWeight: 'bold',
  },
  searchContainer: {
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#007AFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  searchInput: {
    height: 40,
    paddingHorizontal: 12,
    color: '#000',
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#000',
    backgroundColor: '#FFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 12,
  },
  listItem: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#D9D9D9',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
});
