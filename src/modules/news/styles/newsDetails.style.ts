import { StyleSheet } from 'react-native';

const newsDetailsStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
    shadowColor: '#253494',
    shadowOpacity: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333333',
  },
  date: {
    marginTop: 20,
    fontSize: 16,
    color: '#253494',
    fontWeight: 'bold',
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
