/* eslint-disable react-native/no-inline-styles */
import CameraRoll from '@react-native-community/cameraroll';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

import { SERVER_IP } from '../../../shared/constants/urls';
import filesAndPhotosDetailsStyle from '../styles/fileaAndPhotosDetails';

const FilesAndPhotosDetails = ({ route, navigation }) => {
  const { disciplineId } = route.params;
  const [files, setFiles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageViewerVisible, setIsImageViewerVisible] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isSaveButtonVisible, setIsSaveButtonVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchText, setSearchText] = useState('');

  const fetchFiles = async () => {
    try {
      console.log('Fetching files for disciplineId:', disciplineId);
      const response = await axios.get(`${SERVER_IP}/files-and-photos/${disciplineId}/files`);
      const formattedFiles = response.data.map((file) => {
        const fileName = file.fileUrl.split('FilesAndPhotos/')[1];
        const createdAt = formatDateToDDMMYYYY(file.createdAt);
        return {
          ...file,
          fileName: fileName,
          fileUri: `${SERVER_IP}/static/${fileName}`,
          isSelected: false,
          createdAt: createdAt,
        };
      });
      setFiles(formattedFiles);
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

  const closeImageViewer = () => {
    setIsImageViewerVisible(false);
  };

  const openImagePreview = (index) => {
    setSelectedImageIndex(index);
    setIsPreviewVisible(true);
  };

  const closeImagePreview = () => {
    setIsPreviewVisible(false);
  };

  const toggleImageSelection = (index) => {
    const updatedImages = [...selectedImages];
    const selectedIndex = updatedImages.indexOf(index);

    if (selectedIndex === -1) {
      updatedImages.push(index);
    } else {
      updatedImages.splice(selectedIndex, 1);
    }

    setSelectedImages(updatedImages);

    setIsSaveButtonVisible(updatedImages.length > 0);
  };

  const showSuccessModal = (message) => {
    setSuccessMessage(message);
    setIsSuccessModalVisible(true);
  };

  const hideSuccessModal = () => {
    setIsSuccessModalVisible(false);
  };

  const saveSelectedImagesToGallery = async () => {
    try {
      const selectedUris = selectedImages.map((index) => files[index].fileUri);

      if (selectedUris.length > 0) {
        for (const uri of selectedUris) {
          await CameraRoll.save(uri, { type: 'photo' });
        }

        const updatedFiles = files.map((file) => ({ ...file, isSelected: false }));
        setFiles(updatedFiles);
        setSelectedImages([]);
        setIsSaveButtonVisible(false);

        showSuccessModal('Imagens salvas com sucesso na galeria!');
      }
    } catch (error) {
      console.error('Error saving images to gallery:', error);
    }
  };

  const formatDateToDDMMYYYY = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const renderImageItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() => openImagePreview(index)}
      onLongPress={() => toggleImageSelection(index)}
    >
      <View
        style={[
          filesAndPhotosDetailsStyle.fileContainer,

          selectedImages.includes(index) && { borderColor: 'blue', borderWidth: 2 },
        ]}
      >
        <Text style={filesAndPhotosDetailsStyle.fileName}>{item.fileDescription}</Text>
        <Image source={{ uri: item.fileUri }} style={filesAndPhotosDetailsStyle.thumbnail} />
        <Text style={filesAndPhotosDetailsStyle.fileCreatedAt}>Criado em: {item.createdAt}</Text>
      </View>
    </TouchableOpacity>
  );

  const filterFiles = () => {
    return files.filter((file) =>
      file.fileDescription.toLowerCase().includes(searchText.toLowerCase()),
    );
  };

  return (
    <View style={filesAndPhotosDetailsStyle.container}>
      <View style={filesAndPhotosDetailsStyle.searchContainer}>
        <TextInput
          style={filesAndPhotosDetailsStyle.searchInput}
          placeholder="Digite a descrição do arquivo"
          placeholderTextColor="#666"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          autoFocus={false}
        />
      </View>

      <FlatList
        data={filterFiles()}
        renderItem={renderImageItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

      {isSaveButtonVisible && (
        <TouchableOpacity
          style={filesAndPhotosDetailsStyle.saveButton}
          onPress={saveSelectedImagesToGallery}
        >
          <Text style={filesAndPhotosDetailsStyle.saveButtonText}>Salvar na Galeria</Text>
        </TouchableOpacity>
      )}

      {isPreviewVisible && (
        <Modal transparent={true} onRequestClose={closeImagePreview}>
          <TouchableWithoutFeedback onPress={closeImagePreview}>
            <View style={filesAndPhotosDetailsStyle.modalContainer}>
              <Image
                source={{ uri: files[selectedImageIndex].fileUri }}
                style={filesAndPhotosDetailsStyle.modalImage}
              />
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
      {isImageViewerVisible && (
        <ImageViewer
          imageUrls={files.map((file) => ({ url: file.fileUri, props: file }))}
          index={selectedImageIndex}
          onClick={closeImageViewer}
          enableSwipeDown
          onSwipeDown={closeImageViewer}
          enableImageZoom={true}
          saveToLocalByLongPress={false}
          onChange={(index) => setSelectedImageIndex(index)}
          renderIndicator={(currentIndex, allSize) => (
            <Text style={{ color: 'white' }}>
              {currentIndex + 1} / {allSize}
            </Text>
          )}
        />
      )}
      <View style={filesAndPhotosDetailsStyle.addButtonContainer}>
        <TouchableOpacity
          style={filesAndPhotosDetailsStyle.addButton}
          onPress={() => navigation.navigate('FilesAndPhotosCreate', { disciplineId })}
        >
          <Text style={filesAndPhotosDetailsStyle.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={isSuccessModalVisible} transparent={true} animationType="fade">
        <View style={filesAndPhotosDetailsStyle.modalContainer}>
          <View style={filesAndPhotosDetailsStyle.modalContent}>
            <Text style={filesAndPhotosDetailsStyle.modalText}>{successMessage}</Text>
            <TouchableOpacity
              onPress={hideSuccessModal}
              style={filesAndPhotosDetailsStyle.modalButton}
            >
              <Text style={filesAndPhotosDetailsStyle.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FilesAndPhotosDetails;
