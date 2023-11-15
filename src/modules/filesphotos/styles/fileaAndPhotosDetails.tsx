import { StyleSheet } from 'react-native';

const filesAndPhotosDetailsStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  fileContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#253494',
    padding: 16,
  },
  image: {
    width: 200,
    height: 200,
  },
  fileInfo: {
    marginTop: 8,
  },
  fileName: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fileCreatedAt: {
    marginTop: 10,
    fontSize: 14,
    color: '#000',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedImage: {
    width: '80%',
    height: '80%',
  },
  downloadButton: {
    backgroundColor: '#007AFF',
    marginTop: 16,
    padding: 10,
    borderRadius: 5,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#253494',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 150,
    paddingRight: 20,
    right: 10,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },

  saveButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  modalImage: {
    width: '90%',
    height: '50%',
  },
  openInBrowserButton: {
    position: 'absolute',
    bottom: '15%',
    alignSelf: 'center',
    backgroundColor: '#253494',
    padding: 10,
    borderRadius: 5,
  },
  openInBrowserButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  thumbnail: {
    marginTop: 10,
    width: 100,
    height: 100,
    borderRadius: 5,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#253494',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
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
  selectionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default filesAndPhotosDetailsStyle;
