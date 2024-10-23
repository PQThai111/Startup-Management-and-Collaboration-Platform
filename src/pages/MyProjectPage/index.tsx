import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import MyProject from "./component/myProject";

const MyProjectPage = (): JSX.Element => {
  return (
    <>
      <Header/>
      <MyProject/>
      <Footer/>
    </>
  );
};

export default MyProjectPage;