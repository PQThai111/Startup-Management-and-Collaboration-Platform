import { ToastContainer } from 'react-toastify';
import AppRouter from './routes';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from 'react';
import { AppContext } from './context/app.context';
import { localStorageEventTarget } from './util/auth';

function App() {
  const { reset } = useContext(AppContext);

  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLS', reset);
    return () => {
      localStorageEventTarget.removeEventListener('clearLS', reset);
    };
  }, [reset]);

  return (
    <div>
      <AppRouter />
      <ToastContainer />
    </div>
  );
}

export default App;
