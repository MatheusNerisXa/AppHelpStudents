import { StyleSheet } from 'react-native';

export const dashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F4F5F7',
  },
  dashboardItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dashboardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  dashboardLabel: {
    fontSize: 16,
    color: '#555',
  },
});

export default dashboardStyles;
