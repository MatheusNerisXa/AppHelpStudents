import { StyleSheet } from 'react-native';

const ExamDetailsStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  examTitle: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 1,
    textAlign: 'center',
    color: '#253494',
  },
  examDescription: {
    marginTop: 10,
    fontSize: 16,
    marginBottom: 0,
    fontFamily: 'Arial',
    color: '#000',
    textAlign: 'justify',
  },
  imageContainer: {
    marginTop: 4,
    paddingBottom: 22,
    alignItems: 'center',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#253494',
  },
  imageWrapper: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#253494',
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
    fontSize: 14,
    color: '#253494',
    fontWeight: 'bold',
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
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    color: '#f09d5c',
    textAlign: 'center',
  },
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  divider: {
    height: 1,
    backgroundColor: '#253494',
    marginVertical: 20,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
  },
});

export default ExamDetailsStyle;
