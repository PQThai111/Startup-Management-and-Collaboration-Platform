import { useQuery } from '@tanstack/react-query';
import converApi, { Conver, Message } from '../../apis/conversation.api';
// import Footer from '../../layouts/Footer';
import Header from '../../layouts/Header';
import InboxDetail from './components/InboxDetail';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../context/app.context';
import classNames from 'classnames';
import accountApi from '../../apis/account.api';
import { Account } from '../../types/account.type';
import * as signalR from '@microsoft/signalr';
import config from '../../constant/config';
import { getAccessTokenToLS } from '../../util/auth';
import { v4 as uuidv4 } from 'uuid';

export default function Inbox() {
  const { profile } = useContext(AppContext);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);

  const [searchAccounts, setSearchAccounts] = useState<Account[]>([]);
  const [inputSearchAccount, setInputSearchAccounts] = useState<string>('');

  const [chooseConver, setChooseConver] = useState<Conver | null>(null);

  const signalRef = useRef<signalR.HubConnection | null>(null);
  const token = getAccessTokenToLS();

  const { data: messageData } = useQuery({
    queryKey: ['messages', chooseConver?.id, profile?.id],
    queryFn: () => {
      return converApi.getConverDetail(chooseConver?.id as string);
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000,
    enabled: chooseConver != null,
  });

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

  useEffect(() => {
    if (messageData?.data.data) {
      setMessages(messageData.data.data.messages);
    }
  }, [messageData]);

  console.log(signalRef.current);

  const sendMessage = useCallback(
    (receiverId: string) => async (message: string) => {
      if (signalRef.current && message && receiverId && chooseConver) {
        await signalRef.current.invoke(
          'SendMessage',
          profile?.id,
          receiverId,
          message,
        );

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
          conversationId: chooseConver?.id as string,
          senderId: profile?.id as string,
          content: message,
          timestamp: timestamp,
          status: 0,
          isDeleted: false,
          lastUpdateDate: null,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    },
    [signalRef, profile?.id, chooseConver],
  );

  const { data: converData, refetch: refetchConver } = useQuery({
    queryKey: ['convers', profile?.id],
    queryFn: () => {
      return converApi.getConvers();
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000,
  });

  const sendMessageSearch = useCallback(
    (receiverId: string) => async (message: string) => {
      if (signalRef.current && message && receiverId) {
        await signalRef.current.invoke(
          'SendMessage',
          profile?.id,
          receiverId,
          message,
        );
        setSearchAccounts([]);
        refetchConver();
      }
    },
    [signalRef, profile?.id],
  );

  const { data: accountsDataAll } = useQuery({
    queryKey: ['accountsDataAll'],
    queryFn: () => {
      return accountApi.getAllAccounts();
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000,
  });

  useEffect(() => {
    if (converData?.data.data) {
      setChooseConver(converData.data.data[0]);
    }
  }, [converData]);

  useEffect(() => {
    if (accountsDataAll?.data?.data != null) {
      setAccounts(accountsDataAll.data.data);
    }
  }, [accountsDataAll]);

  useEffect(() => {
    if (inputSearchAccount == '') {
      setSearchAccounts([]);
    } else {
      var accountFinds = accounts.filter((x) =>
        x.email.includes(inputSearchAccount),
      );
      if (accounts.length > 0) setSearchAccounts(accountFinds.slice(0, 3));
    }
  }, [accounts, inputSearchAccount]);

  console.log(accounts);
  console.log(inputSearchAccount);
  console.log(searchAccounts);

  return (
    <div className="h-screen">
      <Header />
      <div className="mx-auto mb-5 mt-10 h-[88%] w-[90%] border">
        <div className="grid h-full grid-cols-10">
          {/* Left Sidebar: Conversation List (3 parts) */}
          <div className="col-span-3 border-r bg-gray-100 p-4">
            <h3 className="mb-4 text-xl font-semibold">Conversations</h3>
            <input
              onChange={(e) => {
                setInputSearchAccounts(e.currentTarget.value);
              }}
              className="relative mb-4 w-full rounded-md border border-slate-400 p-2 font-semibold"
            />
            {searchAccounts.length > 0 && (
              <div className="absolute h-[18%] w-[24.7%] overflow-y-auto rounded-md border border-slate-300 bg-white p-2">
                <div className="floating-accounts px-2">
                  {searchAccounts.map((account) => (
                    <div
                      key={account.id}
                      className="account-item mb-3 flex items-center justify-between"
                    >
                      <div>{account.email}</div>
                      <button
                        type="button"
                        onClick={() => {
                          (async () => {
                            await sendMessageSearch(account.id)('Hi');
                          })();
                        }}
                        className="rounded-md bg-blue-500 px-5 py-3 text-white"
                      >
                        Say Hi
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <ul className="space-y-2">
              {converData?.data.data &&
                converData?.data.data.map((con) => {
                  var userName =
                    con.user1Info.id != profile?.id
                      ? con.user1Info.name
                      : con.user2Info.id != profile?.id
                        ? con.user2Info.name
                        : '';
                  return (
                    <button
                      type="button"
                      onClick={() => {
                        setChooseConver(con);
                      }}
                      key={con.id}
                      className={classNames(
                        'mb-3 block w-full cursor-pointer rounded-md p-3 text-left',
                        {
                          'bg-blue-400 text-white': con.id == chooseConver?.id,
                          'bg-blue-100': con.id != chooseConver?.id,
                        },
                      )}
                    >
                      {userName}
                    </button>
                  );
                })}
            </ul>
          </div>
          {/* Right Content Area: Specific Conversation (7 parts) */}
          <InboxDetail
            messages={messages}
            converId={(chooseConver as Conver)?.id}
            userName={
              (chooseConver as Conver)?.user1Info.id != profile?.id
                ? (chooseConver as Conver)?.user1Info.name
                : (chooseConver as Conver)?.user2Info.id != profile?.id
                  ? (chooseConver as Conver)?.user2Info.name
                  : ''
            }
            email={
              (chooseConver as Conver)?.user1Info.id != profile?.id
                ? (chooseConver as Conver)?.user1Info.email
                : (chooseConver as Conver)?.user2Info.id != profile?.id
                  ? (chooseConver as Conver)?.user2Info.email
                  : ''
            }
            receiverId={
              (chooseConver as Conver)?.user1Info.id != profile?.id
                ? (chooseConver as Conver)?.user1Info.id
                : (chooseConver as Conver)?.user2Info.id != profile?.id
                  ? (chooseConver as Conver)?.user2Info.id
                  : ''
            }
            sendMessage={
              chooseConver &&
              sendMessage(
                (chooseConver as Conver)?.user1Info.id != profile?.id
                  ? (chooseConver as Conver)?.user1Info.id
                  : (chooseConver as Conver)?.user2Info.id != profile?.id
                    ? (chooseConver as Conver)?.user2Info.id
                    : '',
              )
            }
          />
        </div>
      </div>
    </div>
  );
}
