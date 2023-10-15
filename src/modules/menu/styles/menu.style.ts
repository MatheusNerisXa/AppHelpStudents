import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const cardWidth = (screenWidth - 40) / 2;

export const menuStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#F8F8F8',
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
  icon: {
    alignSelf: 'center',
  },
  cardText: {
    fontSize: 16,
    color: '#FFF',
    marginTop: 8,
  },
  cardContainerDelete: {
    backgroundColor: '#FF0022',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
    width: cardWidth * 2,
  },
});
