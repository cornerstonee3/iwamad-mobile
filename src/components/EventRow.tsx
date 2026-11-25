import { Pressable, Text, StyleSheet, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, { FadeIn, FadeOut, LinearTransition, ZoomIn } from 'react-native-reanimated';
import { type CampusEvent } from '../data/events';

type EventRowProps = {
  event: CampusEvent;
  onPress: () => void;
  onToggleSaved: () => void;
  isSaved: boolean;
};

export default function EventRow({ event, onPress, onToggleSaved, isSaved }: EventRowProps) {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition}>
      <Swipeable
        friction={2}
        rightThreshold={60}
        renderRightActions={(_progress, _translation, swipeable) => (
          <Pressable
            onPress={() => {
              onToggleSaved();
              swipeable.close();
            }}
            style={[styles.action, isSaved && styles.actionUnsave]}
          >
            <Text style={styles.actionText}>{isSaved ? 'Unsave' : 'Save'}</Text>
          </Pressable>
        )}
      >
        <Pressable
          onPress={onPress}
          onLongPress={onToggleSaved}
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        >
          <View style={styles.textContainer}>
            <Text style={styles.title}>{event.title}</Text>
            <Text style={styles.details}>{event.date} | {event.place}</Text>
          </View>

          {isSaved && (
            <Animated.Text entering={ZoomIn} style={styles.savedText}>
              ★ Saved
            </Animated.Text>
          )}
        </Pressable>
      </Swipeable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    backgroundColor: '#fff',
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
  savedText: { fontSize: 16, color: '#34C759', fontWeight: 'bold' },
  action: {
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    minHeight: 44,
  },
  actionUnsave: {
    backgroundColor: '#FF3B30',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});