import { useState } from 'react';
import { FlatList, View, Text, TextInput, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { router } from 'expo-router';
import EventRow from '../../src/components/EventRow';
import { useEvents } from '../../src/hooks/useEvents';

export default function EventsScreen() {
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [searchText, setSearchText] = useState('');

  const { data, isPending, isError, error, refetch, isRefetching } = useEvents();

  const toggleSave = (id: number) => {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter(savedId => savedId !== id));
    } else {
      setSavedIds([...savedIds, id]);
    }
  };

  if (isPending) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.statusText}>Loading events.</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorTitle}>Could not load events</Text>
        <Text style={styles.statusText}>{error?.message}</Text>
        <Pressable style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  const filteredEvents = (data || []).filter(event => 
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
        refreshing={isRefetching}
        onRefresh={() => refetch()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  centerContainer: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', padding: 20 },
  searchInput: { margin: 15, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, fontSize: 16 },
  savedCounter: { marginHorizontal: 15, marginBottom: 10, fontSize: 16, fontWeight: 'bold' },
  emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#777' },
  statusText: { marginTop: 10, fontSize: 16 },
  errorTitle: { fontSize: 20, fontWeight: 'bold', color: 'red' },
  retryButton: { marginTop: 20, backgroundColor: '#007AFF', paddingHorizontal: 20, borderRadius: 8, minHeight: 44, justifyContent: 'center' },
  retryText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});