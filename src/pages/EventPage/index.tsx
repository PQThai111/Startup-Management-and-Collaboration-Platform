import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import EventList from "./components/EventList";

const EventPage = (): JSX.Element => {
  return (
    <>
      <Header />
      <div className="border border-red-600 h-[470px] mx-20 mb-5">
        <img className="w-full h-full" src="D:\newProject\Startup-Management-and-Collaboration-Platform\src\assets\FPT.png" alt="intro img" />
      </div>
      <EventList/>
      <Footer/>
    </>
  );
};

export default EventPage;