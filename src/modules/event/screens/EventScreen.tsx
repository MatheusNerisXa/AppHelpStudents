/* eslint-disable @typescript-eslint/no-shadow */
import 'moment/locale/pt-br';

import moment from 'moment';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const EventScreen = () => {
  const [events, setEvents] = useState([
    { id: '1', name: 'Vestibular A', date: '2023-08-26' },
    { id: '2', name: 'Vestibular B', date: '2023-08-27' },
    { id: '3', name: 'Evento C', date: '2023-08-26' },
    { id: '4', name: 'Evento D', date: '2023-08-29' },
    { id: '5', name: 'Evento F', date: '2023-08-29' },
    { id: '5', name: 'Evento F', date: '2023-09-30' },
  ]);

  const [isModalVisible, setModalVisible] = useState(false);

  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const addEvent = () => {
    if (eventName && eventDate) {
      setEvents([...events, { id: String(events.length + 1), name: eventName, date: eventDate }]);
      setEventName('');
      setEventDate('');
      toggleModal();
    }
  };

  const groupEventsByDay = () => {
    const groupedEvents = {};
    for (const event of events) {
      const date = moment(event.date).format('YYYY-MM-DD');
      if (!groupedEvents[date]) {
        groupedEvents[date] = [];
      }
      groupedEvents[date].push(event.name);
    }
    return groupedEvents;
  };

  const today = moment().startOf('day');
  const tomorrow = today.clone().add(1, 'day');
  const futureEvents = Object.entries(groupEventsByDay())
    .filter(([date]) => {
      const eventDate = moment(date);
      return !eventDate.isSame(today, 'day') && !eventDate.isSame(tomorrow, 'day');
    })
    .sort(([dateA], [dateB]) => moment(dateA).diff(moment(dateB)));

  const getDayContainerColor = (dayLabel) => {
    if (dayLabel === 'Hoje') {
      return '#9fe6a0';
    } else if (dayLabel === 'Amanhã') {
      return '#91c5ff';
    } else {
      return '#ff8000';
    }
  };

  return (
    <View style={styles.container}>
      {Object.entries(groupEventsByDay()).map(([date, eventNames]) => {
        const eventDate = moment(date);
        const dayLabel = eventDate.isSame(today, 'day')
          ? 'Hoje'
          : eventDate.isSame(tomorrow, 'day')
          ? 'Amanhã'
          : null;

        if (dayLabel) {
          return (
            <View
              key={date}
              style={[styles.dayContainer, { backgroundColor: getDayContainerColor(dayLabel) }]}
            >
              <View style={styles.dayLabelContainer}>
                <Text style={styles.dayLabelText}>{dayLabel}</Text>
                <Text style={styles.dayDateText}>{eventDate.format('D MMM')}</Text>
              </View>
              {eventNames.map((eventName) => (
                <TouchableOpacity key={eventName} style={styles.eventItem}>
                  <Text style={styles.eventName}>{eventName}</Text>
                </TouchableOpacity>
              ))}
            </View>
          );
        } else {
          return null;
        }
      })}
      {futureEvents.length > 0 && (
        <View style={styles.dayContainer}>
          <Text style={styles.futureLabel}>Próximas Atividades</Text>
          {futureEvents.map(([date, eventNames]) => (
            <View key={date} style={styles.futureDayContainer}>
              <Text style={styles.futureDate}>
                {moment(date).format('dddd')}, {moment(date).format('D MMM')}
              </Text>
              {eventNames.map((eventName) => (
                <TouchableOpacity key={eventName} style={styles.eventItem}>
                  <Text style={styles.eventName}>{eventName}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      )}
      <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Evento</Text>
            <TextInput
              placeholder="Nome do Evento"
              value={eventName}
              onChangeText={(text) => setEventName(text)}
              style={styles.input}
            />
            <TextInput
              placeholder="Data do Evento (YYYY-MM-DD)"
              value={eventDate}
              onChangeText={(text) => setEventDate(text)}
              style={styles.input}
            />
            <TouchableOpacity style={styles.addButtonModal} onPress={addEvent}>
              <Text style={styles.buttonText}>Adicionar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#f7f7f7',
  },
  dayContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  futureDayContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#ff8000',
  },
  dayLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  dayLabelText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  dayDateText: {
    fontSize: 14,
    color: '#000',
  },
  futureLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  futureDate: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'right',
    marginEnd: 10,
    marginTop: 5,
    color: 'black',
  },
  eventItem: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'blue',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  addButtonModal: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
});

export default EventScreen;
