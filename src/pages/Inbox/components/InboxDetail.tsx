<<<<<<< HEAD
import { useQuery } from '@tanstack/react-query';
import converApi, { Message } from '../../../apis/conversation.api';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../../context/app.context';
import classNames from 'classnames';
import * as signalR from '@microsoft/signalr';
import { v4 as uuidv4 } from 'uuid';
import config from '../../../constant/config';

import { getAccessTokenToLS } from '../../../util/auth';

export default function InboxDetail({
  converId,
  userName,
  email,
  receiverId,
=======
// import { useQuery } from '@tanstack/react-query';
import { Message } from '../../../apis/conversation.api';
import { useContext, useEffect, useRef, useState } from 'react'; //useCallback
import { AppContext } from '../../../context/app.context';
import classNames from 'classnames';

export default function InboxDetail({
  // converId,
  userName,
  email,
  // receiverId,
  messages,
  sendMessage,
>>>>>>> 5175638 (New Inbox, Fix small bug)
}: {
  converId: string | null;
  userName: string | null;
  email: string | null;
  receiverId: string | null;
<<<<<<< HEAD
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<string>('');
  const token = getAccessTokenToLS();
  const { profile } = useContext(AppContext);
  const signalRef = useRef<signalR.HubConnection | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null); // Ref for chat container
  const { data: messageData } = useQuery({
    queryKey: ['messages', converId],
    queryFn: () => {
      return converApi.getConverDetail(converId as string);
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000,
    enabled: converId != null,
  });

  useEffect(() => {
    if (messageData?.data.data) {
      setMessages(messageData.data.data.messages);
    }
  }, [messageData]);

  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(
        `${config.baseURLWithoutApi}/chathub?Token=${encodeURIComponent(token)}`,
        {
          // withCredentials: true, // Optional, if you need cookies/credentials
          skipNegotiation: true,
          transport: signalR.HttpTransportType.WebSockets,
        },
      )
      .withAutomaticReconnect() // Automatically attempt to reconnect if the connection is lost
      .configureLogging(signalR.LogLevel.Information)
      .withHubProtocol(new signalR.JsonHubProtocol())
      .build();

    signalRef.current = newConnection;
  }, []);

  useEffect(() => {
    if (signalRef.current) {
      signalRef.current
        .start()
        .then(() => {
          console.log('SignalR connected');
        })
        .catch((err) => {
          console.error('SignalR connection failed:', err);
        });

      signalRef.current.on('ReceiveMessage', (_sender, message) => {
        const newMessage: Message = message;
        console.log(newMessage);

        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    }

    return () => {
      signalRef.current?.stop().then(() => console.log('SignalR disconnected'));
    };
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
=======
  messages: Message[];
  sendMessage: ((message: string) => Promise<void>) | null;
}) {
  const [message, setMessage] = useState<string>('');
  const { profile } = useContext(AppContext);
  const chatContainerRef = useRef<HTMLDivElement>(null); // Ref for chat container

  useEffect(() => {
>>>>>>> 5175638 (New Inbox, Fix small bug)
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
<<<<<<< HEAD
  }, [messages]); // Trigger on new messages

  const sendMessage = useCallback(async () => {
    if (signalRef.current && message && receiverId) {
      await signalRef.current.invoke(
        'SendMessage',
        profile?.id,
        receiverId,
        message,
      );
      setMessage('');
      const createTimestamp = (): string => {
        const date = new Date();
        const vietnamTimezoneOffset = 7 * 60; // 7 hours in minutes
        const localTime = new Date(
          date.getTime() + vietnamTimezoneOffset * 60 * 1000,
        );
        const year = localTime.getUTCFullYear();
        const month = String(localTime.getUTCMonth() + 1).padStart(2, '0');
        const day = String(localTime.getUTCDate()).padStart(2, '0');
        const hours = String(localTime.getUTCHours()).padStart(2, '0');
        const minutes = String(localTime.getUTCMinutes()).padStart(2, '0');
        const seconds = String(localTime.getUTCSeconds()).padStart(2, '0');
        const milliseconds = Math.floor(localTime.getUTCMilliseconds() / 100);
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
      };

      const timestamp = createTimestamp();
      const randomId = uuidv4();
      const newMessage: Message = {
        id: randomId,
        conversationId: converId as string,
        senderId: profile?.id as string,
        content: message,
        timestamp: timestamp,
        status: 0,
        isDeleted: false,
        lastUpdateDate: null,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  }, [signalRef, message, receiverId, profile?.id, converId]);
=======
  }, [messages]);

  // Scroll to bottom when messages change
  // Trigger on new messages

  // sendMessage => setMessage('');
>>>>>>> 5175638 (New Inbox, Fix small bug)

  return (
    <div className="col-span-7 flex h-full flex-col overflow-y-auto">
      {/* Header */}
      <div className="border-b bg-gray-100 p-4">
        <h3 className="text-xl font-semibold">{userName}</h3>
        <h5 className="text-md font-semibold text-gray-500">{email}</h5>
      </div>
      {/* Chat Content */}
      <div
<<<<<<< HEAD
        className="flex-1 overflow-y-auto bg-white p-4"
=======
        className="flex-1 overflow-y-scroll bg-white p-4"
>>>>>>> 5175638 (New Inbox, Fix small bug)
        ref={chatContainerRef} // Attach ref to chat container
      >
        {/* Messages */}
        <div className="space-y-4">
          {messages &&
            messages.map((mess) => (
              <div
                key={mess.id}
                className={classNames('flex', {
                  '': mess.senderId != profile?.id,
                  'justify-end': mess.senderId == profile?.id,
                })}
              >
                <div
                  className={classNames('w-[40%] max-w-xs rounded-md p-3', {
                    'bg-blue-500 text-white': mess.senderId != profile?.id,
                    'mr-2 bg-gray-200 text-end': mess.senderId == profile?.id,
                  })}
                >
                  {mess.content}
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* Input Area */}
      <div className="flex items-center space-x-2 border-t bg-gray-100 p-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 rounded-md border p-2 focus:ring focus:ring-blue-300"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyDown={(e) => {
            // console.log('Key pressed:', e.key); // Debug
            if (e.key === 'Enter') {
              e.preventDefault();
<<<<<<< HEAD
              (async () => await sendMessage())();
=======
              (async () => {
                await sendMessage!(message);
                setMessage('');
              })();
>>>>>>> 5175638 (New Inbox, Fix small bug)
            }
          }}
        />
        <button
          type="button"
          onClick={() => {
<<<<<<< HEAD
            (async () => await sendMessage())();
=======
            (async () => {
              await sendMessage!(message);
              setMessage('');
            })();
>>>>>>> 5175638 (New Inbox, Fix small bug)
          }}
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
