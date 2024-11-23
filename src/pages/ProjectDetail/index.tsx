import { Outlet } from 'react-router-dom';
import Header from '../../layouts/Header';
import Footer from '../../layouts/Footer';
import SideBar from '../ProjectDetail/components/Sidebar';

const ProjectDetail = () => {
  return (
    <>
      {/* <NavBar /> */}
      <div className="ml-12">
        <Header />
        <SideBar />
        <div>
          <div className="mt-10 px-3">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ProjectDetail;
