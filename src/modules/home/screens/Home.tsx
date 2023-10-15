import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';

import { URL_BANNERS } from '../../../shared/constants/urls';
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
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pendingActivities, setPendingActivities] = useState<Activity[]>([]);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);

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

    async function fetchActivities() {
      try {
        const response = await fetch('http://192.168.1.7:8080/activities/user/12/pending'); // Substitua 12 pelo ID do usuário
        const data = await response.json();
        const nextWeekPendingActivities = data.filter((activity: Activity) =>
          isDateInNextWeek(new Date(activity.dueDate)),
        );
        setPendingActivities(nextWeekPendingActivities);
      } catch (error) {
        console.error('Erro ao buscar atividades pendentes:', error);
      }
    }

    fetchBanners();
    fetchActivities();
  }, []);

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
          <Text style={homeStyle.activityCardTitle}>Tarefas Pendentes da Semana</Text>
          <View style={homeStyle.activityItem}>
            <Text>Título: {pendingActivities[currentActivityIndex].taskName}</Text>
            <Text>
              Data de Vencimento:{' '}
              {format(new Date(pendingActivities[currentActivityIndex].dueDate), 'dd/MM/yyyy')}
            </Text>
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

function isDateInNextWeek(date: Date) {
  const currentDate = new Date();
  const nextWeek = new Date(currentDate);
  nextWeek.setDate(nextWeek.getDate() + 7);
  return date <= nextWeek;
}

export default Home;
