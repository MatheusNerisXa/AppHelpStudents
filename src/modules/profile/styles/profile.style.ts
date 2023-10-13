import { StyleSheet } from 'react-native';

const profileStyle = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
    color: '#000',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#253494',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: 'black',
  },
  button: {
    marginTop: 24,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalImage: {
    width: '90%',
    height: '90%',
  },
  closeModalButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'red',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeModalButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  changeImageText: {
    fontSize: 16,
    color: '#253494',
    textDecorationLine: 'underline',
    marginTop: 8,
  },
});

export default profileStyle;
