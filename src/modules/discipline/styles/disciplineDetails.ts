import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const cardWidth = (screenWidth - 34) / 1;

const disciplineDetailsStyle = StyleSheet.create({
  cardContainer: {
    width: cardWidth,
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bin: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  details: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#253494',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusColorIndicator: {
    width: 16,
    height: 16,
    marginRight: 8,
    borderRadius: 8,
  },
  statusValue: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#253494',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default disciplineDetailsStyle;
