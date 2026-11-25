import { useEffect, useRef, useState } from 'react';
import { DEVICE_ID, subscribeToChat, type ChatMessage } from '../lib/chat';
import { notifyNewMessage } from '../lib/notifications';

export type ChatStatus = 'connecting' | 'live' | 'error';

export function useChat(eventId: number, eventTitle: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStatus>('connecting');
  const seenIds = useRef<Set<string> | null>(null);

  useEffect(() => {
    setStatus('connecting');
    seenIds.current = null;

    const unsubscribe = subscribeToChat(
      eventId,
      (list) => {
        if (seenIds.current === null) {
          seenIds.current = new Set(list.map((m) => m.id));
        } else {
          for (const message of list) {
            if (!seenIds.current.has(message.id)) {
              seenIds.current.add(message.id);
              if (message.deviceId !== DEVICE_ID) {
                notifyNewMessage(eventTitle, message);
              }
            }
          }
        }

        setMessages(list);
        setStatus('live');
      },
      () => {
        setStatus('error');
      },
    );

    return unsubscribe;
  }, [eventId, eventTitle]);

  return { messages, status };
}