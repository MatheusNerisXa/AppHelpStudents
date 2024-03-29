import { StyleSheet } from 'react-native';

const homeStyle = StyleSheet.create({
  container: {
    paddingTop: 20,
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  bannerContainer: {
    marginTop: 10,
    width: '100%',
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  activityCard: {
    marginTop: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    margin: 1,
    width: '100%',
    elevation: 5,
    marginBottom: 15,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: '#253494',
  },
  activityCardTitle: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color: '#253494',
  },
  activityItem: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    elevation: 3,
    borderColor: '#253494',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 1.2,
  },
  totalSummary: {
    alignItems: 'center',
    marginTop: 10,
  },
  totalSummaryText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderColor: '#253494',
  },
  navigationButton: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    width: 150,
    borderColor: '#253494',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderWidth: 1.2,
  },
  buttonText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userCard: {
    alignItems: 'center',
    backgroundColor: '#253494',
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    marginBottom: 15,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 5,
  },
  userStats: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  progressBarContainer: {
    width: '100%',
    backgroundColor: '#EDEDED',
    borderRadius: 10,
    height: 10,
    marginVertical: 5,
  },
  progressBar: {
    height: 10,
    borderRadius: 10,
  },
  statsValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  disciplineStats: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#253494',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 10,
  },
  disciplineStatsHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#253494',
    textAlign: 'center',
  },
  todayDisciplines: {
    marginTop: 10,
  },
  todayDisciplinesHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#253494',
  },
  todayDisciplineItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#253494',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 2,
    elevation: 5,
    alignItems: 'center',
  },
  disciplineName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#253494',
  },
  roomAndHour: {
    fontSize: 16,
    color: '#f09d5c',
  },
  teacherText: {
    fontSize: 16,
    color: '#333',
    marginTop: 8,
  },
  noClassesMessage: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#253494',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginTop: 10,
  },

  noClassesText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

export default homeStyle;
