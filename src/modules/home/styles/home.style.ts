import { StyleSheet } from 'react-native';

const homeStyle = StyleSheet.create({
  container: {
    paddingTop: 20,
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  bannerContainer: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  activityCard: {
    backgroundColor: '#f09d5c',
    borderRadius: 10,
    padding: 10,
    margin: 1,
    width: '100%',
    elevation: 5,
    marginBottom: 15,
  },
  activityCardTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: 'white',
  },
  activityItem: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    elevation: 3,
  },
  totalSummary: {
    alignItems: 'center',
    marginTop: 10,
  },
  totalSummaryText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  navigationButton: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    width: 150,
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default homeStyle;
