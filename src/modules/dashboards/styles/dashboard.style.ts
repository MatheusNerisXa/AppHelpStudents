import { Dimensions, StyleSheet } from 'react-native';

export const dashboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statsItem: {
    flex: 1,
    alignItems: 'center',
  },
  progressBar: {
    width: Dimensions.get('window').width * 0.15,
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  statsValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statsLabel: {
    fontSize: 14,
    color: '#555',
  },
  totalContainer: {
    alignItems: 'center',
  },
  totalProgressBar: {
    width: '100%',
    height: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
});

export default dashboardStyles;
