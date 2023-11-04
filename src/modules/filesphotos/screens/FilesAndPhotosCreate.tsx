/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import fileCreateStyle from '../styles/fileCreate';

const API_URL = 'http://192.168.1.12:8080/files-and-photos/upload';

const FilesAndPhotosCreate = ({ route }) => {
  const { disciplineId } = route.params;
  const [selectedImages, setSelectedImages] = useState([]);
  const [fileDescription, setFileDescription] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImageUri, setModalImageUri] = useState('');

  const handleImageSelect = async (source) => {
    try {
      const options = {
        multiple: true,
        compressImageQuality: 0.7,
      };

      let images = [];

      if (source === 'gallery') {
        images = await ImagePicker.openPicker(options);
      } else if (source === 'camera') {
        images = [await ImagePicker.openCamera(options)];
      }

      setSelectedImages([...selectedImages, ...images]);
    } catch (error) {
      if (error.message !== 'User cancelled image selection') {
        console.error('Erro ao selecionar as imagens:', error);
      }
    }
  };

  const removeImage = (index) => {
    const newSelectedImages = [...selectedImages];
    newSelectedImages.splice(index, 1);
    setSelectedImages(newSelectedImages);
  };

  const openImageModal = (uri) => {
    setModalImageUri(uri);
    setModalVisible(true);
  };

  const closeImageModal = () => {
    setModalVisible(false);
  };

  const uploadImages = async () => {
    if (selectedImages.length === 0) {
      Alert.alert('Aviso', 'Por favor, selecione uma ou mais imagens antes de fazer o upload.');
      return;
    }

    setIsUploading(true);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const formDataArray = selectedImages.map((image, index) => {
      const fileExtension = image.path.split('.').pop();
      const randomFileNameWithExtension = generateRandomFileName() + '.' + fileExtension;

      const formData = new FormData();
      formData.append('file', {
        uri: image.path,
        type: image.mime,
        name: randomFileNameWithExtension,
      });
      formData.append('file_url', randomFileNameWithExtension);
      formData.append('disciplineId', disciplineId);
      formData.append('fileDescription', `${fileDescription}`);
      formData.append('createdAt', getCurrentDateTime());

      return formData;
    });

    try {
      const responses = await Promise.all(formDataArray.map((formData) => uploadImage(formData)));

      if (responses.every((response) => response.status === 200)) {
        Alert.alert('Sucesso', 'Imagens enviadas com sucesso.');
        setSelectedImages([]);
        setFileDescription('');
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao enviar uma ou mais imagens.');
      }
    } catch (error) {
      console.error('Erro ao fazer upload das imagens:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao enviar uma ou mais imagens.');
    } finally {
      setIsUploading(false);
    }
  };

  const uploadImage = async (formData) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()}T${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    return formattedDate;
  };

  const generateRandomFileName = () => {
    const randomFileName = Math.random().toString(36).substring(7);
    return randomFileName;
  };

  return (
    <ScrollView contentContainerStyle={fileCreateStyle.container}>
      <TextInput
        placeholder="Descrição do Arquivo (opcional)"
        placeholderTextColor="#000"
        value={fileDescription}
        onChangeText={(text) => setFileDescription(text)}
        style={fileCreateStyle.descriptionInput}
      />

      <View style={fileCreateStyle.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleImageSelect('gallery')}
          style={fileCreateStyle.selectButton}
        >
          <Text style={fileCreateStyle.buttonText}>Galeria</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleImageSelect('camera')}
          style={fileCreateStyle.selectButton}
        >
          <Text style={fileCreateStyle.buttonText}>Câmera</Text>
        </TouchableOpacity>
      </View>

      <View style={fileCreateStyle.imageContainer}>
        {selectedImages.map((image, index) => (
          <TouchableOpacity key={index} onPress={() => openImageModal(image.path)}>
            <Image source={{ uri: image.path }} style={fileCreateStyle.image} />
            <TouchableOpacity
              style={fileCreateStyle.removeButton}
              onPress={() => removeImage(index)}
            >
              <Text style={fileCreateStyle.removeButtonText}>Remover</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={uploadImages}
        style={[fileCreateStyle.uploadButton, { opacity: selectedImages.length > 0 ? 1 : 0.5 }]}
        disabled={selectedImages.length === 0 || isUploading}
      >
        <Text style={fileCreateStyle.uploadButtonText}>
          {isUploading ? 'Enviando...' : 'Enviar Imagens'}
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} onRequestClose={closeImageModal}>
        <View style={fileCreateStyle.modalContainer}>
          <Image source={{ uri: modalImageUri }} style={fileCreateStyle.modalImage} />
          <TouchableOpacity onPress={closeImageModal} style={fileCreateStyle.closeModalButton}>
            <Text style={fileCreateStyle.closeModalButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default FilesAndPhotosCreate;
