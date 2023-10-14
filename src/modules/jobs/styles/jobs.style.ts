import { StyleSheet } from 'react-native';

const JobsStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingTop: 16,
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
  jobsContainer: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    padding: 16,
    borderWidth: 2,
    borderColor: '#253494',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#253494',
    textAlign: 'center',
  },
  location: {
    color: '#000',
    marginTop: 8,
    textAlign: 'center',
  },
  detailsButton: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#253494',
    marginTop: 16,
  },
  detailsButtonText: {
    color: '#253494',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  jobInfoContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  createdAt: {
    color: '#000',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default JobsStyle;
