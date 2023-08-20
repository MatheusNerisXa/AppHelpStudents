import { StyleSheet } from 'react-native';

const ExamDetailsStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  examTitle: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333333',
  },
  examDescription: {
    marginTop: 2,
    fontSize: 16,
    marginBottom: 20,
    fontFamily: 'Arial',
    color: '#666666',
    textAlign: 'justify',
  },
  imageContainer: {
    marginTop: 5,
    alignItems: 'center',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  imageWrapper: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    marginBottom: 20,
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#333333',
  },
  dateText: {
    fontSize: 16,
    color: '#666666',
  },
  provaContainer: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  linkEnrollment: {
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
    marginTop: 2,
  },
  linkText: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  divider: {
    height: 1,
    backgroundColor: '#DDDDDD',
    marginVertical: 20,
  },
});

export default ExamDetailsStyle;
