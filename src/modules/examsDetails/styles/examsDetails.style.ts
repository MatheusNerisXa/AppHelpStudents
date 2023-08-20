import { StyleSheet } from 'react-native';

const ExamDetailsStyle = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  provaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  examTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  examDescription: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333333',
  },
  dateInfoContainer: {
    marginBottom: 20,
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateLabelBold: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  provaDate: {
    color: '#007AFF',
  },
  prova2Date: {
    color: '#E17055',
  },
});

export default ExamDetailsStyle;
