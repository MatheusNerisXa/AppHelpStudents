import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Linking,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import filesAndPhotosDetailsStyle from '../styles/fileaAndPhotosDetails';

const FilesAndPhotosDetails = ({ route }) => {
  const { disciplineId } = route.params;
  const [files, setFiles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchFiles = async () => {
    try {
      console.log('Fetching files for disciplineId:', disciplineId);
      const response = await axios.get(
        `http://192.168.1.7:8080/files-and-photos/${disciplineId}/files`,
      );
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchFiles();
  };

  useEffect(() => {
    console.log('Component mounted with disciplineId:', disciplineId);
    fetchFiles();
  }, [disciplineId]);

  const handleImageDownload = (imageUrl) => {
    Linking.openURL(imageUrl);
  };

  return (
    <View style={filesAndPhotosDetailsStyle.container}>
      <FlatList
        data={files}
        renderItem={({ item }) => (
          <View style={filesAndPhotosDetailsStyle.fileContainer} key={item.id}>
            <TouchableOpacity
              onPress={() => setSelectedImage(item.fileUrl)}
              onLongPress={() => handleImageDownload(item.fileUrl)}
            >
              <Image
                source={{ uri: item.fileUrl }}
                style={filesAndPhotosDetailsStyle.image}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View style={filesAndPhotosDetailsStyle.fileInfo}>
              <Text style={filesAndPhotosDetailsStyle.fileName}>
                Nome do Arquivo: {item.fileName}
              </Text>
              <Text style={filesAndPhotosDetailsStyle.fileCreatedAt}>
                Criado em: {item.createdAt}
              </Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      {selectedImage && (
        <TouchableOpacity
          style={filesAndPhotosDetailsStyle.overlay}
          onPress={() => setSelectedImage(null)}
        >
          <Image
            source={{ uri: selectedImage }}
            style={filesAndPhotosDetailsStyle.selectedImage}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={filesAndPhotosDetailsStyle.downloadButton}
            onPress={() => handleImageDownload(selectedImage)}
          >
            <Text style={filesAndPhotosDetailsStyle.downloadButtonText}>Baixar</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default FilesAndPhotosDetails;
