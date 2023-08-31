import { StyleSheet } from 'react-native';

const filesAndPhotosStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  folderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  folderIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  folderName: {
    fontSize: 16,
    color: 'black',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 16,
    color: 'gray',
  },
});

export default filesAndPhotosStyle;
