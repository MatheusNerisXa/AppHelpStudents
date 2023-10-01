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
  activityCard: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#f5f5f5',
    elevation: 3,
    position: 'relative',
  },
  activityTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#253494',
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
});

export default ActivitiesStyle;
