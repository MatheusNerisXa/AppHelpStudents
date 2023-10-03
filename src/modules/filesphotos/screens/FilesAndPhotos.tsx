/* eslint-disable react/no-unstable-nested-components */
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';

import { Icon } from '../../../shared/components/icon/Icon';
import { URL_DISCIPLINE } from '../../../shared/constants/urls';
import { useRequest } from '../../../shared/hooks/useRequest';
import filesAndPhotosStyle from '../styles/filephotos.style';

const FilesAndPhotos = () => {
  const { getUserFromStorage } = useRequest();
  const [userId, setUserId] = useState(null);
  const [disciplineFolders, setDisciplineFolders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDiscipline, setSelectedDiscipline] = useState(null);
  const navigation = useNavigation();
  const cardColors = [
    '#3498db',
    '#e74c3c',
    '#2ecc71',
    '#e67e22',
    '#1abc9c',
    '#9b59b6',
    '#f39c12',
    '#27ae60',
    '#d35400',
    '#2980b9',
    '#8e44ad',
    '#c0392b',
    '#16a085',
    '#f39c12',
    '#2c3e50',
    '#7f8c8d',
    '#34495e',
    '#d35400',
    '#f1c40f',
    '#3498db',
    '#c0392b',
    '#2ecc71',
    '#9b59b6',
    '#27ae60',
    '#e74c3c',
    '#f39c12',
    '#2980b9',
    '#e67e22',
    '#1abc9c',
  ];

  const textColors = [
    '#3498db',
    '#e74c3c',
    '#2ecc71',
    '#e67e22',
    '#1abc9c',
    '#9b59b6',
    '#f39c12',
    '#27ae60',
    '#d35400',
    '#2980b9',
    '#8e44ad',
    '#c0392b',
    '#16a085',
    '#f39c12',
    '#2c3e50',
    '#7f8c8d',
    '#34495e',
    '#d35400',
    '#f1c40f',
    '#3498db',
    '#c0392b',
    '#2ecc71',
    '#9b59b6',
    '#27ae60',
    '#e74c3c',
    '#f39c12',
    '#2980b9',
    '#e67e22',
    '#1abc9c',
  ];

  const fetchDisciplineFolders = async () => {
    if (userId) {
      try {
        const response = await axios.get(URL_DISCIPLINE + `${userId}`);
        setDisciplineFolders(response.data);
      } catch (error) {
        console.error('Error fetching discipline folders:', error);
      } finally {
        setRefreshing(false);
      }
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchDisciplineFolders();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserFromStorage();
      setUserId(userData?.id);
    };

    fetchUserData();
  }, [getUserFromStorage]);

  useEffect(() => {
    if (userId !== null) {
      fetchDisciplineFolders();
    }
  }, [userId]);

  const handleDisciplineSelection = (discipline) => {
    setSelectedDiscipline(discipline);
  };

  const navigateToFolderContents = (folderId, folderName) => {
    if (selectedDiscipline) {
      navigation.navigate('FilesAndPhotosDetails', {
        folderId,
        folderName,
        disciplineName: selectedDiscipline.name,
        disciplineId: selectedDiscipline.id,
      });
    }
  };

  return (
    <View style={filesAndPhotosStyle.container}>
      <FlatList
        data={disciplineFolders}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={filesAndPhotosStyle.folderItem}
            onPress={() => {
              handleDisciplineSelection(item);
              navigateToFolderContents(item.id, item.folderName);
            }}
          >
            <Icon
              name="folder"
              size={24}
              color={cardColors[index % cardColors.length]}
              style={filesAndPhotosStyle.folderIcon}
            />
            <Text
              style={[
                filesAndPhotosStyle.folderName,
                { color: textColors[index % textColors.length] },
              ]}
            >
              - {item.name}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#007AFF" />
        }
        ItemSeparatorComponent={() => <View style={filesAndPhotosStyle.separator} />}
        ListEmptyComponent={() => (
          <Text style={filesAndPhotosStyle.emptyText}>Nenhuma pasta encontrada.</Text>
        )}
      />
    </View>
  );
};

export default FilesAndPhotos;
