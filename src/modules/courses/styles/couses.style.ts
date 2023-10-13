import { StyleSheet } from 'react-native';

const CoursesStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingTop: 16,
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
  coursesContainer: {
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 20,
    overflow: 'hidden',
    borderRadius: 8,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#253494',
    padding: 4,
  },
  courseImage: {
    width: 255,
    height: 44,
    alignSelf: 'center',
    marginTop: 20,
  },
  infoContainer: {
    padding: 20,
  },
  courseName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  institution: {
    fontSize: 16,
  },
  institutionText: {
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#253494',
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CoursesStyle;
