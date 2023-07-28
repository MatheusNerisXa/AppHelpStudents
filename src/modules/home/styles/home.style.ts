import { StyleSheet } from 'react-native';

const homeStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  greetingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userNameContainer: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
  },
  cardsContainer: {
    marginBottom: 16,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    width: '30%',
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
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 8,
  },
});

export default homeStyle;
