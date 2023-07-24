import { StyleSheet } from 'react-native';

const newsStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
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
  },
  listItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 16,
    elevation: 4,
  },
  postedAtText: {
    fontSize: 12,
    color: '#777777',
  },
  textContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  newsImageContainer: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  searchInput: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default newsStyle;
