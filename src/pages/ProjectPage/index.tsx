import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import ProjectList from "./components/ProjectList";

const ProjectPage = (): JSX.Element => {
  return (
    <>
      <Header/>
      <ProjectList/>
      <Footer/>
    </>
  );
};

export default ProjectPage;