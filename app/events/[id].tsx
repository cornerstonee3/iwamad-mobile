import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { events } from '../../src/data/events';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const event = events.find((item) => item.id === Number(id));

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorTitle}>Event not found</Text>
        <Text>No event with id {id}.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: event.title }} />
      
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.text}>Date: {event.date}</Text>
      <Text style={styles.text}>Place: {event.place}</Text>
      <Text style={styles.text}>Seats: {event.seats}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  text: { fontSize: 16, marginBottom: 8 },
  errorTitle: { fontSize: 22, fontWeight: 'bold', color: 'red', marginBottom: 10 },
});