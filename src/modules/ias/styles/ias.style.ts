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
    marginLeft: 10,
    marginRight: 20,
    borderRadius: 5,
  },
  learnMoreText: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  cardContent: {
    flex: 1,
    marginLeft: 16,
  },
  iaName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#253494',
  },
  iaDescription: {
    color: '#666',
    textAlign: 'justify',
  },
});

export default IasStyle;
