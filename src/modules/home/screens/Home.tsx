import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';

import { URL_ACTIVITIES_USER_PENDING, URL_BANNERS } from '../../../shared/constants/urls';
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

const Home: React.FC = () => {
  const { getUserFromStorage } = useRequest();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pendingActivities, setPendingActivities] = useState<Activity[]>([]);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [userId, setUserId] = useState<number | null>(null);

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

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserFromStorage();
      setUserId(userData?.id);
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

  return (
    <View style={homeStyle.container}>
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
                  {format(new Date(pendingActivities[currentActivityIndex].dueDate), 'dd/MM/yyyy')}
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
  );
};

export default Home;
