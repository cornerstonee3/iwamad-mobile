import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useChat } from '../hooks/useChat';
import { sendMessage } from '../lib/chat';

type ChatPanelProps = {
  eventId: number;
  eventTitle: string;
};

export default function ChatPanel({ eventId, eventTitle }: ChatPanelProps) {
  const { messages, status } = useChat(eventId, eventTitle);
  const [text, setText] = useState('');

  const trimmed = text.trim();
  const isDisabled = trimmed.length === 0;

  const handleSend = () => {
    if (isDisabled) return;
    sendMessage(eventId, trimmed);
    setText('');
  };

  const newestFirst = [...messages].reverse();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Live chat</Text>

      <TextInput
        style={styles.input}
        placeholder="Write a message"
        maxLength={200}
        value={text}
        onChangeText={setText}
      />

      <Pressable
        onPress={handleSend}
        disabled={isDisabled}
        style={[styles.button, isDisabled && styles.buttonDisabled]}
      >
        <Text style={styles.buttonText}>Send</Text>
      </Pressable>

      {status === 'connecting' && <Text style={styles.status}>Connecting</Text>}
      {status === 'error' && <Text style={styles.error}>Chat unavailable</Text>}
      {status === 'live' && newestFirst.length === 0 && (
        <Text style={styles.status}>No messages yet</Text>
      )}

      {newestFirst.map((m) => (
        <View key={m.id} style={styles.messageRow}>
          <Text style={styles.messageText}>
            {m.author}: {m.text}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    minHeight: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: '#a0c4ff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 15,
    color: '#666',
    marginBottom: 8,
  },
  error: {
    fontSize: 15,
    color: 'red',
    marginBottom: 8,
  },
  messageRow: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  messageText: {
    fontSize: 15,
  },
});