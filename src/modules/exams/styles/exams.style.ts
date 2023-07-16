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
  cardContainer: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
  },
  cardContent: {
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 12,
  },
  paragraph: {
    color: '#333333',
    marginBottom: 8,
    textAlign: 'justify',
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
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
    shadowColor: '#000',
    backgroundColor: '#007AFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});
