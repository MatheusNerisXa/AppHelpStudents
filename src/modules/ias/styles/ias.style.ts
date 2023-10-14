import { StyleSheet } from 'react-native';

const IasStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#f5f5f5',
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
  iasContainer: {},
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#253494',
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 3,
  },
  iaImage: {
    width: 110,
    height: 100,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 5,
  },
  learnMoreText: {
    color: '#253494',
    textDecorationLine: 'underline',
    marginTop: 5,
    textAlign: 'center',
  },
  cardContent: {
    flex: 1,
    marginLeft: 16,
  },
  iaName: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#253494',
  },
  iaDescription: {
    color: '#000',
    textAlign: 'justify',
    marginTop: 5,
  },
});

export default IasStyle;
