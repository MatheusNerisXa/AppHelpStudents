import React from 'react';
import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import JobsDetailsStyle from '../styles/jobsDetails.style';

const JobDetails = ({ route }) => {
  const { job } = route.params;

  const handleCheckJob = () => {
    if (job.link) {
      Linking.openURL(job.link);
    } else {
    }
  };

  return (
    <ScrollView contentContainerStyle={JobsDetailsStyle.container}>
      <View style={JobsDetailsStyle.titleContainer}>
        <Text style={JobsDetailsStyle.title}>{job.title}</Text>
      </View>
      <View style={JobsDetailsStyle.detailsContainer}>
        <Text style={JobsDetailsStyle.label}>Descrição:</Text>
        <Text style={JobsDetailsStyle.description}>{job.description}</Text>
        <Text style={JobsDetailsStyle.label}>Salário:</Text>
        <Text style={JobsDetailsStyle.wage}>{job.wage}</Text>
        <Text style={JobsDetailsStyle.label}>Localização:</Text>
        <Text style={JobsDetailsStyle.location}>{job.location}</Text>
      </View>
      <TouchableOpacity style={JobsDetailsStyle.applyButton} onPress={handleCheckJob}>
        <Text style={JobsDetailsStyle.applyButtonText}>Conferir Vaga</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default JobDetails;
