import { useContext } from 'react';
import { ProfileContext } from '../../context/profile.context';
import Footer from '../../layouts/Footer';
import Header from '../../layouts/Header';
import Profile from './component/Profile';
import { useQuery } from '@tanstack/react-query';
import studentApi from '../../apis/student.api';
import { AppContext } from '../../context/app.context';

const ProfilePage = (): JSX.Element => {
  const { profile } = useContext(AppContext);

  const { data: student } = useQuery({
    queryKey: ['student', profile?.id],
    queryFn: () => studentApi.getStudentByAccountId(profile?.id as string),
  });

  return (
    <>
      <Header />
      <div className="grid-cols-10">
        <ProfileContext.Provider value={{ profile: student?.data.data }}>
          <Profile />
        </ProfileContext.Provider>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
