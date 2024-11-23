import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="mt-8 flex items-center justify-between bg-[#EEF2F5] px-40 py-4">
      <Link
        to="/projectManagement"
        className="text-xl font-semibold hover:text-blue-500"
      >
        Task Management
      </Link>
      <Link
        to="/projectManagement/calendarLecturer"
        className="text-xl font-semibold"
      >
        Calendar Lecturer
      </Link>
      <Link
        to="/projectManagement/calendarMentor"
        className="text-xl font-semibold"
      >
        Calendar Mentor
      </Link>
      <Link
        to="/projectManagement/financialReport"
        className="text-xl font-semibold"
      >
        Financial Report
      </Link>
      <Link to="/projectManagement/members" className="text-xl font-semibold">
        Members
      </Link>
    </div>
  );
};

export default NavBar;
