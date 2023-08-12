import { StyleSheet } from 'react-native';

const profileStyle = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    padding: 16,
    borderRadius: 10,
    margin: 16,
    elevation: 4,
  },
  contentContainer: {
    flexGrow: 1,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: 'black',
  },
  button: {
    marginTop: 24,
  },
});

export default profileStyle;
