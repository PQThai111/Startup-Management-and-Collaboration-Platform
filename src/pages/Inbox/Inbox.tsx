import Footer from '../../layouts/Footer';
import Header from '../../layouts/Header';
import InboxDetail from './components/InboxDetail';

export default function Inbox() {
  return (
    <div>
      <Header />
      <div className="mx-auto mb-5 mt-10 h-full min-h-svh w-[90%] border">
        <div className="grid h-screen grid-cols-10">
          {/* Left Sidebar: Conversation List (3 parts) */}
          <div className="col-span-3 border-r bg-gray-100 p-4">
            <h3 className="mb-4 text-xl font-semibold">Conversations</h3>
            <ul className="space-y-2">
              <li className="cursor-pointer rounded-md bg-blue-100 p-2 hover:bg-blue-200">
                John Doe
              </li>
              <li className="cursor-pointer rounded-md p-2 hover:bg-gray-200">
                Jane Smith
              </li>
              <li className="cursor-pointer rounded-md p-2 hover:bg-gray-200">
                David Clark
              </li>
              <li className="cursor-pointer rounded-md p-2 hover:bg-gray-200">
                Emily Johnson
              </li>
            </ul>
          </div>
          {/* Right Content Area: Specific Conversation (7 parts) */}
          <InboxDetail />
        </div>
      </div>
      <Footer />
    </div>
  );
}
