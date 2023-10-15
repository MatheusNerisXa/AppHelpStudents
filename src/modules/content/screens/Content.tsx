/* eslint-disable @typescript-eslint/no-shadow */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { URL_CONTENT } from '../../../shared/constants/urls';
import contentStyle from '../styles/content.style';

const Content = ({ navigation }) => {
  const [contentData, setContentData] = useState([]);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    axios
      .get(URL_CONTENT)
      .then((response) => {
        setContentData(response.data);
      })
      .catch((error) => {
        setError('Erro ao buscar o conteúdo da API: ' + error);
      });
  }, []);

  const filteredContent = contentData.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  if (error) {
    return (
      <View style={contentStyle.container}>
        <Text style={contentStyle.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={contentStyle.container}>
      <View style={contentStyle.searchContainer}>
        <TextInput
          style={contentStyle.searchInput}
          placeholder="Buscar pelo nome do arquivo"
          placeholderTextColor="#666"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
      </View>
      <FlatList
        data={filteredContent}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ContentDetails', { content: item })}
          >
            <View style={contentStyle.contentItem}>
              <Text style={contentStyle.contentTitle}>{item.title}</Text>
              <Text style={contentStyle.createdAt}>{`Data de Publicação: ${formatDate(
                item.createdAt,
              )}`}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

function formatDate(dateString) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
}

export default Content;
