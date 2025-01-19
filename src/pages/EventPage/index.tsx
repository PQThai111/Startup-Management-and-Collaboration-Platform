import Footer from '../../layouts/Footer';
import Header from '../../layouts/Header';
import EventList from './components/EventList';

const EventPage = (): JSX.Element => {
  return (
    <>
      <Header />
      <div className="mx-20 mb-5 h-[50vh]">
        <img
          className="h-full w-full object-cover py-4"
          src="https://res.cloudinary.com/monkeysuper/image/upload/v1737274694/pldgeyzzzyga0hfewmji.jpg"
          alt="intro img"
        />
      </div>
      <EventList />
      <Footer />
    </>
  );
};

export default EventPage;
