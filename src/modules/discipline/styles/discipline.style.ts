import { StyleSheet } from 'react-native';

const disciplineStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  header: {
    marginTop: 20,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
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
  separator: {
    height: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
  },
  item: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dateText: {
    color: '#000',
    fontSize: 14,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 8,
  },
  addButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  statusAndLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButton1: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#253494',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    fontSize: 24,
    color: '#FFF',
  },
  roomText: {
    fontSize: 14,
    color: '#000',
  },
  hourText: {
    fontSize: 14,
    color: '#000',
  },
  daysText: {
    fontSize: 14,
    color: '#000',
  },
  teacherText: {
    fontSize: 14,
    color: '#000',
  },
});

export default disciplineStyle;
