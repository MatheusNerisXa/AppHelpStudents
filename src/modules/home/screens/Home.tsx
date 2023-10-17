/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { format, getDay } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import {
  URL_ACTIVITIES_USER_PENDING,
  URL_BANNERS,
  URL_DISCIPLINE,
  URL_USER_ID,
} from '../../../shared/constants/urls';
import { useRequest } from '../../../shared/hooks/useRequest';
import homeStyle from '../styles/home.style';

interface Banner {
  id: number;
  url_image: string;
  status: number;
}

interface Activity {
  id: number;
  taskName: string;
  dueDate: string;
}

interface Discipline {
  id: number;
  name: string;
  status_discipline: number;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  room: string;
  hour: string;
}

interface User {
  id: number;
  name: string;
  photo_image: string;
  approvedCount: number;
  rejectedCount: number;
  subCount: number;
  cursandoCount: number;
}

const Home: React.FC = () => {
  const { getUserFromStorage } = useRequest();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pendingActivities, setPendingActivities] = useState<Activity[]>([]);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [userName, setUserName] = useState('');
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);

  const fetchActivities = () => {
    try {
      const currentDate = new Date();
      const nextWeek = new Date();
      nextWeek.setDate(currentDate.getDate() + 7);

      fetch(URL_ACTIVITIES_USER_PENDING + `${userId}/pending`)
        .then((response) => response.json())
        .then((data) => {
          const nextWeekPendingActivities = data.filter((activity) => {
            const dueDate = new Date(activity.dueDate);
            return dueDate >= currentDate && dueDate <= nextWeek;
          });

          setPendingActivities(nextWeekPendingActivities);

          if (nextWeekPendingActivities.length > 0) {
            setCurrentActivityIndex(0);
          }
        })
        .catch((error) => console.error('Erro ao buscar atividades pendentes:', error));
    } catch (error) {
      console.error('Erro ao buscar atividades pendentes:', error);
    }
  };

  const fetchUserName = () => {
    if (userId) {
      fetch(URL_USER_ID + `${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUserName(data.name);
        })
        .catch((error) => console.error('Erro ao buscar o nome do usuário:', error));
    }
  };

  const countDisciplinesByStatus = (status) => {
    return disciplines.filter((discipline) => discipline.status_discipline === status).length;
  };

  const fetchDisciplines = () => {
    try {
      fetch(URL_DISCIPLINE + `${userId}`)
        .then((response) => response.json())
        .then((data) => setDisciplines(data))
        .catch((error) => console.error('Error fetching disciplines:', error));
    } catch (error) {
      console.error('Error fetching disciplines:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserFromStorage();
      setUserId(userData?.id);

      setUser(userData);
    };

    fetchUserData();
  }, [getUserFromStorage]);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const response = await fetch(URL_BANNERS);
        const data = await response.json();
        setBanners(data);
      } catch (error) {
        console.error('Erro ao buscar banners:', error);
      }
    }

    if (userId !== null) {
      fetchBanners();
      fetchActivities();
      fetchUserName();
      fetchDisciplines();
    }
  }, [userId]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners, currentIndex]);

  const currentBanner = banners[currentIndex];

  const handleNextActivity = () => {
    if (currentActivityIndex < pendingActivities.length - 1) {
      setCurrentActivityIndex(currentActivityIndex + 1);
    }
  };

  const handlePreviousActivity = () => {
    if (currentActivityIndex > 0) {
      setCurrentActivityIndex(currentActivityIndex - 1);
    }
  };

  const [currentDay, setCurrentDay] = useState(getDay(new Date()));

  const filterDisciplinesByDay = (currentDay, disciplines) => {
    return disciplines.filter((discipline) => {
      if (discipline.status_discipline === 5) {
        return false;
      }

      switch (currentDay) {
        case 1:
          return discipline.monday;
        case 2:
          return discipline.tuesday;
        case 3:
          return discipline.wednesday;
        case 4:
          return discipline.thursday;
        case 5:
          return discipline.friday;
        case 6:
          return discipline.saturday;
        case 7:
          return discipline.sunday;
        default:
          return false;
      }
    });
  };

  const todayDisciplines = filterDisciplinesByDay(currentDay, disciplines);

  todayDisciplines.sort((a, b) => {
    const [aHour, aMinute] = a.hour.split(':').map(Number);
    const [bHour, bMinute] = b.hour.split(':').map(Number);

    if (aHour === bHour) {
      return aMinute - bMinute;
    }

    return aHour - bHour;
  });

  return (
    <ScrollView>
      <View style={homeStyle.container}>
        {user && (
          <View style={homeStyle.userCard}>
            <Text style={homeStyle.userName}>Aluno: {userName || user.name}</Text>
          </View>
        )}
        {todayDisciplines.length > 0 && (
          <View style={homeStyle.todayDisciplines}>
            <Text style={homeStyle.todayDisciplinesHeading}>Aulas do dia:</Text>
            {todayDisciplines.map((discipline, index) => (
              <View key={index} style={homeStyle.todayDisciplineItem}>
                <Text
                  style={homeStyle.disciplineName}
                >{`Nome da Matéria: ${discipline.name}`}</Text>
                <Text
                  style={homeStyle.roomAndHour}
                >{`Sala: ${discipline.room}, Horário: ${discipline.hour}`}</Text>
                <Text style={homeStyle.teacherText}>{`Professor: ${discipline.teacher}`}</Text>
              </View>
            ))}
          </View>
        )}

        {disciplines.length > 0 && (
          <View style={homeStyle.disciplineStats}>
            <Text style={homeStyle.disciplineStatsHeading}>Estatísticas das matérias</Text>
            {[1, 2, 3, 4].map((status) => (
              <View style={homeStyle.statsItem} key={status}>
                <View style={homeStyle.progressBarContainer}>
                  <ProgressBar
                    progress={countDisciplinesByStatus(status) / disciplines.length}
                    color={statusColors[status]}
                    style={homeStyle.progressBar}
                  />
                </View>
                <Text style={homeStyle.statsValue}>
                  {countDisciplinesByStatus(status)} {statusLabels[status]}
                </Text>
              </View>
            ))}
          </View>
        )}
        {pendingActivities.length > 0 && (
          <View style={homeStyle.activityCard}>
            <Text style={homeStyle.activityCardTitle}>
              Tarefas Pendentes da Semana: {pendingActivities.length}
            </Text>
            <View style={homeStyle.activityItem}>
              {pendingActivities[currentActivityIndex] && (
                <>
                  <Text>Título: {pendingActivities[currentActivityIndex].taskName}</Text>
                  <Text>
                    Data de Vencimento:{' '}
                    {format(
                      new Date(pendingActivities[currentActivityIndex].dueDate),
                      'dd/MM/yyyy',
                    )}
                  </Text>
                </>
              )}
            </View>
            <View style={homeStyle.navigationButtons}>
              <TouchableOpacity style={homeStyle.navigationButton} onPress={handlePreviousActivity}>
                <Text style={homeStyle.buttonText}>{'<'}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={homeStyle.navigationButton} onPress={handleNextActivity}>
                <Text style={homeStyle.buttonText}>{'>'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {currentBanner && (
          <View style={homeStyle.bannerContainer}>
            <ImageBackground
              source={{ uri: currentBanner.url_image }}
              style={homeStyle.bannerImage}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const statusColors = {
  1: '#2ecc71',
  2: '#e74c3c',
  3: '#3498db',
  4: '#f39c12',
};

const statusLabels = {
  1: 'Aprovadas',
  2: 'Reprovadas',
  3: 'Cursando',
  4: 'Sub',
};

export default Home;
