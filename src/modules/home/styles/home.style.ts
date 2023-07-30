import { Dimensions, StyleSheet } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth - 50) / 2;
const cardSpacing = 5;

const homeStyle = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#F8F8F8',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 8,
    color: '#333',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
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
    color: '#333',
    marginTop: 8,
  },
  bannerContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  carouselContainer: {
    flex: 1,
  },
  carouselCardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    width: cardWidth,
    height: cardWidth,
    marginVertical: cardSpacing / 2,
    padding: 3,
  },
  carouselCardText: {
    marginTop: 8,
    textAlign: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: '#007AFF',
  },
  activeDot: {
    backgroundColor: '#fff',
  },
  pageCountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    alignSelf: 'center',
  },
});

export default homeStyle;
