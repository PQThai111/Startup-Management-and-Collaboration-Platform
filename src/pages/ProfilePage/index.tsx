import { Outlet } from 'react-router-dom';
import Footer from '../../layouts/Footer';
import Header from '../../layouts/Header';
import Profile from './component/Profile';

const ProfilePage = (): JSX.Element => {
  return (
    <>
      <Header />
      <div className="grid-cols-10">
        <div>
          <Profile />
        </div>
        {/* <div>
          <Outlet/>
        </div> */}
      </div>

      <Footer />
    </>
  );
};

export default ProfilePage;
