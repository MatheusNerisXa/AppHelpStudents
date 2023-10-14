/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Image, Linking, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import IasStyle from '../styles/ias.style';

const Ias = () => {
  const [ias, setIas] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = () => {
    fetch('http://192.168.1.7:8080/ias')
      .then((response) => response.json())
      .then((data) => setIas(data))
      .finally(() => setRefreshing(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  //   const handleRefresh = () => {
  //     setRefreshing(true);
  //     fetchData();
  //   };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  return (
    <View style={IasStyle.container}>
      <View style={IasStyle.searchContainer}>
        <TextInput
          placeholder="Buscar IAs"
          placeholderTextColor="#666"
          value={searchText}
          onChangeText={handleSearch}
          style={IasStyle.searchInput}
        />
      </View>
      <ScrollView contentContainerStyle={IasStyle.iasContainer}>
        {ias.map((ia) => (
          <IaCard key={ia.id} ia={ia} />
        ))}
      </ScrollView>
    </View>
  );
};

const IaCard = ({ ia }) => (
  <TouchableOpacity style={IasStyle.card} onPress={() => Linking.openURL(ia.link)}>
    <Image source={{ uri: ia.url_logo }} style={IasStyle.iaImage} />
    <View style={IasStyle.cardContent}>
      <TouchableOpacity onPress={() => Linking.openURL(ia.link)}>
        <Text style={IasStyle.iaName}>{ia.name}</Text>
      </TouchableOpacity>
      <Text style={IasStyle.iaDescription}>{ia.description}</Text>
      <Text style={IasStyle.learnMoreText}>Clique para saber mais</Text>
    </View>
  </TouchableOpacity>
);

export default Ias;
