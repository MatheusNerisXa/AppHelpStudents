import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';

import Button from '../../../shared/components/button/Button';
import { URL_UPDATE_PROFILE_IMAGE, URL_USER_ID } from '../../../shared/constants/urls';
import { useRequest } from '../../../shared/hooks/useRequest';
import profileStyle from '../styles/profile.style';

const Profile = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, setUser } = useRequest();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');

  const [isUploading, setIsUploading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [modalImageUri, setModalImageUri] = useState('');

  const handleImageSelect = async (source) => {
    try {
      const options = {
        compressImageQuality: 0.7,
      };

      let image = null;

      if (source === 'gallery') {
        image = await ImagePicker.openPicker(options);
      } else if (source === 'camera') {
        image = await ImagePicker.openCamera(options);
      }

      if (image) {
        console.log('Imagem selecionada:', image);
        uploadImage(image);
      }
    } catch (error) {
      if (error.message !== 'User cancelled image selection') {
        console.error('Erro ao selecionar a imagem:', error);
      }
    }
  };

  const uploadImage = async (image) => {
    const formData = new FormData();
    const fileExtension = image.path.split('.').pop();
    const randomFileNameWithExtension = generateRandomFileName() + '.' + fileExtension;

    formData.append('file', {
      uri: image.path,
      type: image.mime,
      name: randomFileNameWithExtension,
    });

    try {
      const response = await axios.put(URL_UPDATE_PROFILE_IMAGE + user.id, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        Alert.alert('Sucesso', 'Imagem de perfil enviada com sucesso.');

        const newProfileImageUrl = response.data.profile_url;

        setProfileImageUrl(newProfileImageUrl);

        setIsUploading(true);

        fetchProfileImage();
      } else {
        Alert.alert('Erro', 'Ocorreu um erro ao enviar a imagem de perfil.');
      }
    } catch (error) {
      console.error('Erro ao fazer upload da imagem de perfil:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao enviar a imagem de perfil.');
    }
  };

  const fetchProfileImage = () => {
    axios
      .get(`http://192.168.1.10:8080/user/profile-image/${user.id}`)
      .then((response) => {
        if (response.data.ProfileImage) {
          setProfileImageUrl(response.data.ProfileImage);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar a imagem de perfil:', error);
      });
  };

  const handleSaveChanges = async () => {
    const updatedFields = {};

    if (name !== user.name) {
      updatedFields.name = name;
    }
    if (email !== user.email) {
      updatedFields.email = email;
    }
    if (cpf !== user.cpf) {
      updatedFields.cpf = cpf;
    }
    if (phone !== user.phone) {
      updatedFields.phone = phone;
    }

    try {
      const userUpdateResponse = await axios.put(URL_USER_ID + `${user.id}`, updatedFields, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (userUpdateResponse.status === 200) {
        console.log('Perfil atualizado com sucesso.');

        if (isUploading) {
          fetchProfileImage();
        }

        Alert.alert('Sucesso', 'Perfil atualizado com sucesso.', [
          {
            text: 'OK',
            onPress: () => {
              console.log('OK Pressionado');
            },
          },
        ]);
      } else {
        console.error('Erro ao atualizar o perfil do usuário:', userUpdateResponse.statusText);
        Alert.alert('Erro', 'Falha ao atualizar o perfil.');
      }
    } catch (error) {
      console.error('Erro ao atualizar o perfil do usuário:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao atualizar o perfil.');
    }
  };

  const generateRandomFileName = () => {
    const randomFileName = Math.random().toString(36).substring(7);
    return randomFileName;
  };

  useEffect(() => {
    if (user) {
      axios
        .get(URL_USER_ID + `${user.id}`)
        .then((response) => {
          const userData = response.data;
          setName(userData.name);
          setEmail(userData.email);
          setCpf(userData.cpf);
          setPhone(userData.phone);

          axios
            .get(`http://192.168.1.10:8080/user/profile-image/${user.id}`)
            .then((imageResponse) => {
              if (imageResponse.data.ProfileImage) {
                setProfileImageUrl(imageResponse.data.ProfileImage);
              }
            })
            .catch((error) => {
              console.error('Erro ao buscar a imagem de perfil:', error);
            });
        })
        .catch((error) => {
          console.error('Erro ao buscar as informações do usuário:', error);
        });
    }
  }, [user]);

  return (
    <View style={profileStyle.pageContainer}>
      <View style={profileStyle.container}>
        <View style={profileStyle.imageContainer}>
          <Avatar
            size="xlarge"
            rounded
            source={{
              uri: profileImageUrl || 'http://192.168.1.10:8080/static/default.png',
            }}
            onPress={() => {
              if (profileImageUrl) {
                console.log('Avatar Image URL (profileImageUrl):', profileImageUrl);
              } else {
                console.log('Avatar Image URL is empty or null');
              }
              handleImageSelect('gallery');
            }}
          />
        </View>
        <View style={profileStyle.inputContainer}>
          <Text style={profileStyle.label}>Name:</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={profileStyle.input}
            placeholder="Digíte seu nome"
          />
        </View>
        <View style={profileStyle.inputContainer}>
          <Text style={profileStyle.label}>Email:</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={profileStyle.input}
            placeholder="Digíte seu e-mail"
          />
        </View>
        <View style={profileStyle.inputContainer}>
          <Text style={profileStyle.label}>CPF:</Text>
          <TextInput
            value={cpf}
            onChangeText={setCpf}
            style={profileStyle.input}
            placeholder="Digíte seu CPF"
          />
        </View>
        <View style={profileStyle.inputContainer}>
          <Text style={profileStyle.label}>Phone:</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            style={profileStyle.input}
            placeholder="Digíte o número do seu celular"
          />
        </View>
        <Button title="Salvar" onPress={handleSaveChanges} />
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={profileStyle.modalContainer}>
          <Image source={{ uri: modalImageUri }} style={profileStyle.modalImage} />
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={profileStyle.closeModalButton}
          >
            <Text style={profileStyle.closeModalButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;
