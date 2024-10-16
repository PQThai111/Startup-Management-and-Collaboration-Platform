import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import EventDetail from "./components/EventDetail";

const EventDetailPage = (): JSX.Element => {
  return (
    <>
      <Header />
      <EventDetail/>
      <Footer/>
    </>
  );
};

export default EventDetailPage;