import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { URL_JOBS } from '../../../shared/constants/urls';
import JobsStyle from '../styles/jobs.style';

const JobsComponent = ({ navigation }) => {
  const [jobs, setJobs] = useState([]);
  const [formattedJobs, setFormattedJobs] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(URL_JOBS)
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((job) => ({
          ...job,
          created_at: new Date(job.created_at).toLocaleDateString(),
        }));
        setJobs(formattedData);
        setFormattedJobs(formattedData);
      })
      .catch((error) => console.error(error));
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filteredData = jobs.filter((job) => job.title.toLowerCase().includes(text.toLowerCase()));
    setFormattedJobs(filteredData);
  };

  const navigateToDetails = (job) => {
    navigation.navigate('JobDetails', { job });
  };

  return (
    <View style={JobsStyle.container}>
      <View style={JobsStyle.searchContainer}>
        <TextInput
          style={JobsStyle.searchInput}
          placeholder="Buscar empregos"
          placeholderTextColor="#666"
          value={searchText}
          onChangeText={handleSearch}
          autoFocus={false}
        />
      </View>
      <ScrollView contentContainerStyle={JobsStyle.jobsContainer}>
        {formattedJobs.map((job) => (
          <JobCard key={job.id} job={job} navigateToDetails={() => navigateToDetails(job)} />
        ))}
      </ScrollView>
    </View>
  );
};

const JobCard = ({ job, navigateToDetails }) => (
  <TouchableOpacity style={JobsStyle.card} onPress={navigateToDetails}>
    <View style={JobsStyle.jobInfoContainer}>
      <Text style={JobsStyle.title}>{job.title}</Text>
      <Text style={JobsStyle.location}>{`Localização: ${job.location}`}</Text>
      <Text style={JobsStyle.createdAt}>Data de Divulgação: {job.created_at}</Text>
      <TouchableOpacity style={JobsStyle.detailsButton} onPress={navigateToDetails}>
        <Text style={JobsStyle.detailsButtonText}>Detalhes</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

export default JobsComponent;
