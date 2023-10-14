import { StyleSheet } from 'react-native';

const contentStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f7f7f7',
  },
  contentItem: {
    padding: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
    borderWidth: 2,
    borderColor: '#253494',
  },
  contentTitle: {
    fontSize: 18,
    color: '#253494',
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  createdAt: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
  },
});

export default contentStyle;
