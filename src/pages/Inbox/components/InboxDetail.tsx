export default function InboxDetail() {
  return (
    <div className="col-span-7 flex h-full flex-col">
      {/* Header */}
      <div className="border-b bg-gray-100 p-4">
        <h3 className="text-xl font-semibold">John Doe</h3>
        <p className="text-sm text-gray-600">Active 10 mins ago</p>
      </div>
      {/* Chat Content */}
      <div className="flex-1 overflow-y-auto bg-white p-4">
        {/* Messages */}
        <div className="space-y-4">
          <div className="flex">
            <div className="max-w-xs rounded-md bg-blue-500 p-3 text-white">
              Hello, how can I help you today?
            </div>
          </div>
          <div className="flex justify-end">
            <div className="max-w-xs rounded-md bg-gray-200 p-3">
              I have an issue with my account.
            </div>
          </div>
          <div className="flex">
            <div className="max-w-xs rounded-md bg-blue-500 p-3 text-white">
              Can you please elaborate?
            </div>
          </div>
        </div>
      </div>
      {/* Input Area */}
      <div className="flex items-center space-x-2 border-t bg-gray-100 p-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 rounded-md border p-2 focus:ring focus:ring-blue-300"
        />
        <button className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Send
        </button>
      </div>
    </div>
  );
}
