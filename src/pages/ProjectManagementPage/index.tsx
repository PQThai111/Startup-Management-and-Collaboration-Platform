import { Outlet } from 'react-router-dom';
import NavBar from './layouts/NavBar';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';

const ProjectManagementPage = () => {
  return (
    <>
    <Header/>
      <NavBar />
      <div className="mx-auto my-7 px-5">
        <Outlet />
      </div>
      <Footer/>
    </>
  );
};

export default ProjectManagementPage;
