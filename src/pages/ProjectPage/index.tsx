import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import ProjectPostList from "./components/ProjectList";

const ProjectPage = (): JSX.Element => {
  return (
    <>
      <Header/>
      <ProjectPostList/>
      <Footer/>
    </>
  );
};

export default ProjectPage;