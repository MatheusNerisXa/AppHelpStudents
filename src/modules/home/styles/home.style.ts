import { StyleSheet } from 'react-native';

const homeStyle = StyleSheet.create({
  container: {
    marginTop: 20,
    flexGrow: 1,
    padding: 0,
    backgroundColor: '#F8F8F8',
  },
  bannerContainer: {
    height: 200,
    borderRadius: 0,
    overflow: 'hidden',
    marginBottom: 16,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
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
});

export default homeStyle;
