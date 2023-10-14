/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

import contentDetailsStyle from '../styles/contentDetails.style';

const ContentDetails = ({ route }) => {
  const { content } = route.params;
  let contentUrl = content.urlContent;

  if (contentUrl.includes('drive.google.com/file/d/')) {
    const fileId = contentUrl.split('/file/d/')[1].split('/view')[0];
    contentUrl = `https://drive.google.com/uc?id=${fileId}`;
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={contentDetailsStyle.title}>{content.title}</Text>
      <WebView source={{ uri: contentUrl }} style={contentDetailsStyle.webView} />
    </View>
  );
};

export default ContentDetails;
