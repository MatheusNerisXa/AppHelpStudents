import { StyleSheet } from 'react-native';

const homeStyle = StyleSheet.create({
  container: {
    paddingTop: 20,
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  bannerContainer: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
  },
  bannerImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
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
