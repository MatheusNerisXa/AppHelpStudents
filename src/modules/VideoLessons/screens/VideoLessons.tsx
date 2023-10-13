/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
  Button,
  Image,
  Linking,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';

import { URL_VIDEO_LESSONS } from '../../../shared/constants/urls';
import videoLessonsStyle from '../style/videoLeassons.style';

const VideoLessons = () => {
  const [videoData, setVideoData] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetch(URL_VIDEO_LESSONS)
      .then((response) => response.json())
      .then((data) => setVideoData(data))
      .catch((error) => console.error('Erro ao buscar os dados dos vídeos:', error));
  }, []);

  const playVideo = (videoUrl, videoId) => {
    setSelectedVideo(videoUrl);
    setSelectedVideoId(videoId);
    setModalVisible(true);
  };

  const openVideoInBrowser = () => {
    if (selectedVideoId) {
      const youtubeUrl = `https://www.youtube.com/watch?v=${selectedVideoId}`;
      Linking.openURL(youtubeUrl);
    }
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setSelectedVideoId(null);
    setModalVisible(false);
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const filteredVideoData = searchText
    ? videoData.filter((item) => item.title.toLowerCase().includes(searchText.toLowerCase()))
    : videoData;

  return (
    <ScrollView contentContainerStyle={videoLessonsStyle.container}>
      <View style={videoLessonsStyle.searchContainer}>
        <TextInput
          style={videoLessonsStyle.searchInput}
          placeholder="Pesquisar vídeos por título"
          placeholderTextColor="#666"
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

      {filteredVideoData.map((item, index) => (
        <TouchableOpacity key={index} onPress={() => playVideo(item.video_url, item.video_id)}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: 10,
              backgroundColor: '#f5f5f5',
              padding: 10,
              borderWidth: 2,
              borderColor: '#253494',
              borderRadius: 10,
            }}
          >
            <Image
              source={{ uri: `https://img.youtube.com/vi/${item.video_id}/0.jpg` }}
              style={{ width: 100, height: 70 }}
            />
            <Text style={{ marginLeft: 10, flex: 1 }}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={videoLessonsStyle.modalBackground}>
          <View style={videoLessonsStyle.modalContent}>
            <Text style={videoLessonsStyle.modalTitle}>
              {selectedVideoId ? 'Assistir no Navegador?' : ''}
            </Text>
            {selectedVideo && (
              <Video
                source={{ uri: selectedVideo }}
                resizeMode="contain"
                style={{ width: '100%', height: 300 }}
              />
            )}
            <View style={videoLessonsStyle.modalButtons}>
              <Button title="Voltar" onPress={closeModal} color="#FF0000" />
              <Button
                title="Abrir no Navegador"
                onPress={openVideoInBrowser}
                disabled={!selectedVideoId}
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default VideoLessons;
