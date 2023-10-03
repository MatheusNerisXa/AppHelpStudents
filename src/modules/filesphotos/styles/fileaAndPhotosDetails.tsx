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
    fontSize: 14,
    color: '#888',
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
  downloadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default filesAndPhotosDetailsStyle;
