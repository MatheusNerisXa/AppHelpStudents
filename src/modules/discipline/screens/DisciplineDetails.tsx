/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Modal, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { Icon } from '../../../shared/components/icon/Icon';
import {
  URL_ABSENCES_TOTAL,
  URL_DISCIPLINE_CREATE,
  URL_DISCIPLINEID,
} from '../../../shared/constants/urls';
import { menuStyles } from '../../menu/styles/menu.style';
import disciplineDetailsStyle from '../styles/disciplineDetails';
import modalStyle from '../styles/modal.style';

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
  });
  const [totalAbsences, setTotalAbsences] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const maxAbsences = 20;

  const fetchDisciplineDetails = async () => {
    const disciplineUrl = URL_DISCIPLINEID + `${disciplineId}`;
    const absencesTotalUrl = URL_ABSENCES_TOTAL + `${disciplineId}`;

    try {
      const [disciplineResponse, totalAbsencesResponse] = await Promise.all([
        fetch(disciplineUrl).then((response) => response.json()),
        fetch(absencesTotalUrl).then((response) => response.json()),
      ]);

      console.log('Dados da disciplina:', disciplineResponse);
      console.log('Total de faltas:', totalAbsencesResponse);

      const statusInfo = statusMap[disciplineResponse.status_discipline] || {
        label: 'Desconhecido',
        color: '#000',
      };
      disciplineResponse.status_discipline = statusInfo.label;
      disciplineResponse.status_color = statusInfo.color;
      setDiscipline(disciplineResponse);

      if (totalAbsencesResponse !== undefined) {
        setTotalAbsences(totalAbsencesResponse);

        let warningMessage = '';
        if (totalAbsencesResponse >= maxAbsences * 0.9) {
          warningMessage = 'Atenção: Você está se aproximando do limite de faltas.';
        }
        if (totalAbsencesResponse > maxAbsences) {
          warningMessage = 'Faltas acima do permitido!';
        }

        setIsLoading(false);
        setRefreshing(false);
      } else {
        setTotalAbsences('N/A');
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes da disciplina:', error);
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDisciplineDetails();
  }, [disciplineId]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDisciplineDetails();
  };

  const handleFilesAndPhotos = () => {
    navigation.navigate('FilePhotos');
  };

  const handleAbsencesMenu = () => {
    navigation.navigate('AbsencesMenu', { disciplineId: discipline.id });
  };

  const handleDeletePress = () => {
    setIsModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(URL_DISCIPLINE_CREATE + `${disciplineId}/update-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Disciplina excluída com sucesso.');
        setIsModalVisible(false);
        navigation.navigate('Discipline');
      } else {
        console.error('Falha ao excluir disciplina.');
      }
    } catch (error) {
      console.error('Erro ao excluir disciplina:', error);
    }
  };

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

  return (
    <ScrollView
      style={disciplineDetailsStyle.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#007AFF" />
      }
    >
      <View style={disciplineDetailsStyle.header} />

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
          <Text style={disciplineDetailsStyle.value}>{totalAbsences}</Text>
        </View>

        {totalAbsences >= maxAbsences * 0.9 ? (
          // eslint-disable-next-line react-native/no-inline-styles
          <Text style={{ color: 'red', textAlign: 'center' }}>
            {totalAbsences > maxAbsences
              ? 'Faltas acima do permitido!'
              : 'Atenção: Você está se aproximando do limite de faltas.'}
          </Text>
        ) : null}
      </View>
      <View style={menuStyles.cardRow}>
        <MenuItem icon="upload" text="Faltas" color="#0066CC" onPress={handleAbsencesMenu} />
        <MenuItem icon="happy" text="Notas" color="#6600CC" onPress={handleFilesAndPhotos} />
      </View>
      <View style={menuStyles.cardRow}>
        <MenuItem
          icon="stats-dots"
          text="Relatório"
          color="#006633"
          onPress={handleFilesAndPhotos}
        />
        <MenuItem icon="cog" text="Configurações" color="#CC3300" onPress={handleFilesAndPhotos} />
      </View>
      <View style={menuStyles.cardRow}>
        <TouchableOpacity onPress={handleDeletePress}>
          <Animatable.View
            animation="fadeInLeft"
            duration={1000}
            style={menuStyles.cardContainerDelete}
          >
            <Icon name="bin" size={32} color="#FFF" style={menuStyles.icon} />
            <Text style={menuStyles.cardText}>Excluir</Text>
          </Animatable.View>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={modalStyle.container}>
          <View style={modalStyle.modalContent}>
            <Text style={modalStyle.modalText}>
              Tem certeza que deseja excluir a matéria {'"'}
              <Text style={modalStyle.boldText}>{discipline.name}</Text>"?
            </Text>
            <View style={modalStyle.modalButtons}>
              <TouchableOpacity
                style={[modalStyle.modalButton, modalStyle.cancelButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={modalStyle.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[modalStyle.modalButton, modalStyle.confirmButton]}
                onPress={handleConfirmDelete}
              >
                <Text style={modalStyle.buttonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
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
