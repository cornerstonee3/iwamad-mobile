import { useState } from 'react';
import { FlatList, View, Text, TextInput, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import EventRow from '../../src/components/EventRow';
import { events } from '../../src/data/events';

export default function EventsScreen() {
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [searchText, setSearchText] = useState('');

  const toggleSave = (id: number) => {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter(savedId => savedId !== id));
    } else {
      setSavedIds([...savedIds, id]);
    }
  };

  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search events"
        value={searchText}
        onChangeText={setSearchText}
      />

      <Text style={styles.savedCounter}>
        Long-press an event to save it. Saved: {savedIds.length}
      </Text>

      <FlatList
        data={filteredEvents}
        keyExtractor={(e) => String(e.id)}
        renderItem={({ item }) => (
          <EventRow 
            event={item} 
            onPress={() => router.push(`/events/${item.id}`)} 
            onLongPress={() => toggleSave(item.id)}
            isSaved={savedIds.includes(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No events match</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  searchInput: { margin: 15, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, fontSize: 16 },
  savedCounter: { marginHorizontal: 15, marginBottom: 10, fontSize: 16, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#777' }
});