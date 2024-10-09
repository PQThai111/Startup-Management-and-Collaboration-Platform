import Footer from '../../layouts/Footer';
import Header from '../../layouts/Header';
import FeaturedEvents from './components/FeaturedEvents';
import FeaturedMentors from './components/FeaturedMentors';
import FeaturedProjects from './components/FeaturedProjects';
import FeaturedStudentSay from './components/FeaturedStudentSay';
import Welcome from './components/Welcome';

const Homepage = (): JSX.Element => {
  return (
    <>
      <Header />
      <Welcome />
      <FeaturedEvents />
      <FeaturedProjects/>
      <FeaturedStudentSay/>
      <FeaturedMentors/>
      <Footer/>
    </>
  );
};

export default Homepage;
