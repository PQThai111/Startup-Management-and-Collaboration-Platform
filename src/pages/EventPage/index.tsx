import Footer from "../../layouts/Footer";
import Header from "../../layouts/Header";
import EventList from "./components/EventList";

const EventPage = (): JSX.Element => {
  return (
    <>
      <Header />
      <div className=" h-[470px] mx-20 mb-5">
        <img className="w-full h-full object-cover" src="https://s3-alpha-sig.figma.com/img/6e10/e0f8/3d3e0e2c10ae8da3abcd8a2004290433?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=NBXmmjZJjT16rKq4Cq5w3OIWeiDKUt9UhV7FhiscJDsei9C1dz8j~qKHm0AP4aoiE5GuR0HkSdr8urUak~RQcdwuhC9y3rxcuIi9pB7rndKHNtlWnCnLZOPN4OFHlpxitpMtRCTnZR0mS7jPkA5hdKvbvvr5kdZjZ5KseI1R8t~iUKEfQoQhsiBbMstMha8CbgaAz4ZMk~hYFCJuHKCdYxvD0eUiJ2qMKNd2ySJH98tYJl8d5Hj9qkbulo0iK1hJwR1oYRomNtMWxWBTdcVw9DnRjpsgEH1beQ-b3o9boE5rsbhygfpWiLJiQT9Xnaezq0uBOcQ21qgS6ckSOQDNYw__" alt="intro img" />
      </div>
      <EventList/>
      <Footer/>
    </>
  );
};

export default EventPage;