import { StyleSheet } from 'react-native';

const AbsencesDetailsStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  totalFaltas: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#253494',
  },
  infoContainer: {
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  itemIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  iconContainer: {
    marginLeft: 6,
  },
});

export default AbsencesDetailsStyle;
