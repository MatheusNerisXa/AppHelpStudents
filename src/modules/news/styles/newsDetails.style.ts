import { StyleSheet } from 'react-native';

const newsDetailsStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 64,
  },
  imageContainer: {
    borderRadius: 12,
    marginBottom: 24,
  },
  imageShadow: {
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'justify',
    marginBottom: 16,
    color: '#333333',
  },
  date: {
    marginTop: 20,
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 17,
    color: '#444444',
    lineHeight: 28,
    textAlign: 'justify',
  },
});

export default newsDetailsStyle;
