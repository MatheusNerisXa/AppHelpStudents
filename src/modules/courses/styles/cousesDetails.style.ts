import { StyleSheet } from 'react-native';

const CoursesDetailsStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  courseImage: {
    width: 255,
    height: 44,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  courseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'justify',
    padding: 10,
  },
  institution: {
    fontSize: 16,
    textAlign: 'center',
  },
  institutionText: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#253494',
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CoursesDetailsStyle;
