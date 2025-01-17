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
}: {
  converId: string | null;
  userName: string | null;
  email: string | null;
  receiverId: string | null;
  messages: Message[];
  sendMessage: ((message: string) => Promise<void>) | null;
}) {
  const [message, setMessage] = useState<string>('');
  const { profile } = useContext(AppContext);
  const chatContainerRef = useRef<HTMLDivElement>(null); // Ref for chat container

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Scroll to bottom when messages change
  // Trigger on new messages

  // sendMessage => setMessage('');

  return (
    <div className="col-span-7 flex h-full flex-col overflow-y-auto">
      {/* Header */}
      <div className="border-b bg-gray-100 p-4">
        <h3 className="text-xl font-semibold">{userName}</h3>
        <h5 className="text-md font-semibold text-gray-500">{email}</h5>
      </div>
      {/* Chat Content */}
      <div
        className="flex-1 overflow-y-scroll bg-white p-4"
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
              (async () => {
                await sendMessage!(message);
                setMessage('');
              })();
            }
          }}
        />
        <button
          type="button"
          onClick={() => {
            (async () => {
              await sendMessage!(message);
              setMessage('');
            })();
          }}
          className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}
