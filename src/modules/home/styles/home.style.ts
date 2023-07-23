import { StyleSheet } from 'react-native';

const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  cardContainer: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
    marginBottom: 16,
  },
  iconContainer: {
    backgroundColor: '#FFF',
    borderRadius: 30,
    padding: 12,
    marginBottom: 10,
  },
  icon: {
    alignSelf: 'center',
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 8,
  },
});

export default homeStyle;
