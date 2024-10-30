import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import Profile from "./component/Profile";

const ProfilePage = (): JSX.Element => {
  return (
    <>
      <Header/>
      <Profile/>
      <Footer/>
    </>
  );
};

export default ProfilePage;