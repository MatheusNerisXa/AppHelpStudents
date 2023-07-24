import { StyleSheet } from 'react-native';

const newsDetailsStyle = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  descriptionText: {
    fontSize: 16,
    color: '#555555',
    lineHeight: 24,
    textAlign: 'justify',
  },
});

export default newsDetailsStyle;
