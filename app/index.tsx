import { useState } from 'react'; 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  const [likes, setLikes] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World!</Text>
      <Text style={styles.text}>Amanbol Moldash</Text>
     
      <Text style={styles.likesText}>Likes: {likes}</Text>

      <Pressable onPress={() => setLikes(likes + 1)} style={styles.button}>
        <Text style={styles.buttonText}>Like</Text>
      </Pressable>

      <Link href="/events" asChild>
        <Pressable style={styles.eventsButton}>
         <Text style={styles.buttonText}>Events</Text>
        </Pressable>
      </Link>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 32,
  },
  likesText: {
    fontSize: 24,
    marginTop: 30,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF', 
    paddingHorizontal: 30,
    borderRadius: 8,
    minHeight: 44,
    justifyContent: 'center',
  },
  eventsButton: { 
    backgroundColor: '#34C759', 
    paddingHorizontal: 30, 
    borderRadius: 8, 
    minHeight: 44, 
    justifyContent: 'center', 
    marginTop: 20 },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
