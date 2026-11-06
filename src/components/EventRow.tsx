import { Pressable, Text, StyleSheet, View } from 'react-native';
import { type CampusEvent } from '../data/events';

type EventRowProps = {
  event: CampusEvent;
  onPress: () => void;
  onLongPress: () => void;
  isSaved: boolean;
};

export default function EventRow({ event, onPress, onLongPress, isSaved }: EventRowProps) {
  return (
    <Pressable 
      onPress={onPress} 
      onLongPress={onLongPress} 
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.textContainer}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.details}>{event.date} | {event.place}</Text>
      </View>
      
      {isSaved && <Text style={styles.savedText}>★ Saved</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    minHeight: 44,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardPressed: {
    backgroundColor: '#e0e0e0',
  },
  textContainer: { flex: 1 },
  title: { fontSize: 18, fontWeight: 'bold' },
  details: { fontSize: 14, color: '#555', marginTop: 4 },
  savedText: { fontSize: 16, color: '#34C759', fontWeight: 'bold' }
});