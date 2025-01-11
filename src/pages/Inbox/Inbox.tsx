import { useQuery } from '@tanstack/react-query';
import converApi, { Conver } from '../../apis/conversation.api';
// import Footer from '../../layouts/Footer';
import Header from '../../layouts/Header';
import InboxDetail from './components/InboxDetail';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/app.context';
import classNames from 'classnames';

export default function Inbox() {
  const { profile } = useContext(AppContext);
  const [chooseConver, setChooseConver] = useState<Conver | null>(null);
  const { data: converData } = useQuery({
    queryKey: ['convers'],
    queryFn: () => {
      return converApi.getConvers();
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000,
  });

  useEffect(() => {
    if (converData?.data.data) {
      setChooseConver(converData.data.data[0]);
    }
  }, [converData]);

  return (
    <div className="h-screen">
      <Header />
      <div className="mx-auto mb-5 mt-10 h-[88%] w-[90%] border">
        <div className="grid h-full grid-cols-10">
          {/* Left Sidebar: Conversation List (3 parts) */}
          <div className="col-span-3 border-r bg-gray-100 p-4">
            <h3 className="mb-4 text-xl font-semibold">Conversations</h3>
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
          />
        </div>
      </div>
    </div>
  );
}
