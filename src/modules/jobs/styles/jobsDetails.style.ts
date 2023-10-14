import { StyleSheet } from 'react-native';

const JobsDetailsStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  titleContainer: {
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  title: {
    color: '#253494',
    fontSize: 22,
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    paddingTop: 5,
    fontSize: 16,
    textAlign: 'justify',
    marginTop: 8,
    paddingBottom: 10,
  },
  wage: {
    fontSize: 16,
    marginTop: 8,
    paddingBottom: 10,
  },
  location: {
    fontSize: 16,
    marginTop: 8,
  },
  applyButton: {
    backgroundColor: '#253494',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  applyButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default JobsDetailsStyle;
