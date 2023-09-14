import { StyleSheet } from 'react-native';

const disciplineDetailsStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  details: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#253494',
    padding: 16,
    borderRadius: 8,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusColorIndicator: {
    width: 16,
    height: 16,
    marginRight: 8,
    borderRadius: 8,
  },
  statusValue: {
    fontSize: 16,
  },
  button: {
    backgroundColor: '#253494',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default disciplineDetailsStyle;
