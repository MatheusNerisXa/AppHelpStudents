import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { Icon } from '../../../shared/components/icon/Icon';
import { URL_ABSENCES, URL_DISCIPLINEID } from '../../../shared/constants/urls';
import { menuStyles } from '../../menu/styles/menu.style';
import disciplineDetailsStyle from '../styles/disciplineDetails';

const statusMap = {
  1: { label: 'Aprovado', color: '#057a11' },
  2: { label: 'Reprovado', color: '#ff0d0d' },
  3: { label: 'Cursando', color: '#13035cce' },
  4: { label: 'Sub', color: '#636302' },
};

const DisciplineDetails = ({ route, navigation }) => {
  const { disciplineId } = route.params;
  const [discipline, setDiscipline] = useState({
    id: 0,
    name: '',
    status_discipline: 0,
    dateStart: '',
    dateEnd: '',
    absences: {
      number_of_absences: 0,
    },
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchDisciplineDetails = () => {
    const disciplineUrl = URL_DISCIPLINEID + `${disciplineId}`;
    const absencesUrl = URL_ABSENCES + `${disciplineId}`;

    const fetchDiscipline = fetch(disciplineUrl).then((response) => response.json());
    const fetchAbsences = fetch(absencesUrl).then((response) => response.json());

    Promise.all([fetchDiscipline, fetchAbsences])
      .then(([disciplineData, absencesData]) => {
        console.log('Dados da disciplina:', disciplineData);
        console.log('Dados de faltas:', absencesData);

        const statusInfo = statusMap[disciplineData.status_discipline] || {
          label: 'Desconhecido',
          color: '#000',
        };
        disciplineData.status_discipline = statusInfo.label;
        disciplineData.status_color = statusInfo.color;
        disciplineData.absences = absencesData;
        setDiscipline(disciplineData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar detalhes da disciplina:', error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchDisciplineDetails();
  }, [disciplineId]);

  if (isLoading) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }

  if (!discipline) {
    return <Text>Nenhum detalhe da disciplina encontrado.</Text>;
  }

  const formatBrazilianDate = (dateString) => {
    if (!dateString) {
      return 'Data desconhecida';
    }

    const date = new Date(dateString);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleFilesAndPhotos = () => {
    navigation.navigate('FilePhotos');
  };

  return (
    <View style={disciplineDetailsStyle.container}>
      <View style={disciplineDetailsStyle.header}>
        {/* <Text style={styles.headerText}>Detalhes da Disciplina</Text> */}
      </View>

      <View style={disciplineDetailsStyle.details}>
        <View style={disciplineDetailsStyle.detailItem}>
          <Text style={disciplineDetailsStyle.label}>Nome:</Text>
          <Text style={disciplineDetailsStyle.value}>{discipline.name}</Text>
        </View>

        <View style={disciplineDetailsStyle.detailItem}>
          <Text style={disciplineDetailsStyle.label}>Status:</Text>
          <View style={disciplineDetailsStyle.statusContainer}>
            <View
              style={[
                disciplineDetailsStyle.statusColorIndicator,
                { backgroundColor: discipline.status_color || '#000' },
              ]}
            />
            <Text style={disciplineDetailsStyle.statusValue}>
              {discipline.status_discipline || 'Desconhecido'}
            </Text>
          </View>
        </View>

        <View style={disciplineDetailsStyle.detailItem}>
          <Text style={disciplineDetailsStyle.label}>Data de Início:</Text>
          <Text style={disciplineDetailsStyle.value}>
            {formatBrazilianDate(discipline.dateStart)}
          </Text>
        </View>

        <View style={disciplineDetailsStyle.detailItem}>
          <Text style={disciplineDetailsStyle.label}>Data de Término:</Text>
          <Text style={disciplineDetailsStyle.value}>
            {formatBrazilianDate(discipline.dateEnd)}
          </Text>
        </View>

        <View style={disciplineDetailsStyle.detailItem}>
          <Text style={disciplineDetailsStyle.label}>Quantidade de Faltas:</Text>
          <Text style={disciplineDetailsStyle.value}>
            {Array.isArray(discipline.absences)
              ? discipline.absences[0]?.number_of_absences || 'N/A'
              : 'N/A'}
          </Text>
        </View>
      </View>
      <View style={menuStyles.cardRow}>
        <MenuItem
          icon="plus"
          text="Cadastrar falta"
          color="#0066CC"
          onPress={handleFilesAndPhotos}
        />
        <MenuItem
          icon="book"
          text="Cadastrar nota"
          color="#6600CC"
          onPress={handleFilesAndPhotos}
        />
      </View>
      <View style={menuStyles.cardRow}>
        <MenuItem
          icon="stats-dots"
          text="Relatório"
          color="#006633"
          onPress={handleFilesAndPhotos}
        />
        <MenuItem icon="cog" text="Configurar" color="#CC3300" onPress={handleFilesAndPhotos} />
      </View>
    </View>
  );
};

const MenuItem = ({ onPress, icon, text, color }) => (
  <TouchableOpacity onPress={onPress}>
    <Animatable.View
      animation="fadeInLeft"
      duration={1000}
      style={[menuStyles.cardContainer, { backgroundColor: color }]}
    >
      <Icon name={icon} size={32} color="#FFF" style={menuStyles.icon} />
      <Text style={menuStyles.cardText}>{text}</Text>
    </Animatable.View>
  </TouchableOpacity>
);

export default DisciplineDetails;
