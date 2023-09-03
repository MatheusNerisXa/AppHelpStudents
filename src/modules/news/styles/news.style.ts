import { StyleSheet } from 'react-native';

const newsStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  contentContainer: {
    paddingBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  listItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 16,
    elevation: 4,
    borderWidth: 0.8,
    borderColor: '#000',
  },
  postedAtText: {
    marginTop: 10,
    fontSize: 12,
    color: '#253494',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  textContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  newsImageContainer: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
});

export default newsStyle;
