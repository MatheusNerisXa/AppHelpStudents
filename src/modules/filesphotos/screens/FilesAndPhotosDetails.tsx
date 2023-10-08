import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  RefreshControl,
  Text,
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

  const fetchFiles = async () => {
    try {
      console.log('Fetching files for disciplineId:', disciplineId);
      const response = await axios.get(`${SERVER_IP}/files-and-photos/${disciplineId}/files`);
      const formattedFiles = response.data.map((file) => {
        // console.log('fileUrl:', file.fileUrl);
        const fileName = file.fileUrl.split('FilesAndPhotos/')[1];
        return {
          ...file,
          fileName: fileName,
          fileUri: `${SERVER_IP}/static/${fileName}`,
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

  // const openImageViewer = (index) => {
  //   setSelectedImageIndex(index);
  //   setIsImageViewerVisible(true);
  // };

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

  const renderImageItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => openImagePreview(index)}>
      <View style={filesAndPhotosDetailsStyle.fileContainer}>
        <Text style={filesAndPhotosDetailsStyle.fileName}>{item.fileDescription}</Text>
        <Image source={{ uri: item.fileUri }} style={filesAndPhotosDetailsStyle.thumbnail} />
        <Text style={filesAndPhotosDetailsStyle.fileCreatedAt}>Criado em: {item.createdAt}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={filesAndPhotosDetailsStyle.container}>
      <FlatList
        data={files}
        renderItem={renderImageItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
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
            // eslint-disable-next-line react-native/no-inline-styles
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
    </View>
  );
};

export default FilesAndPhotosDetails;
