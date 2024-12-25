import { ToastContainer } from 'react-toastify';
import AppRouter from './routes';
import 'react-toastify/dist/ReactToastify.css';
import { useContext, useEffect } from 'react';
import { AppContext } from './context/app.context';
import { localStorageEventTarget } from './util/auth';
// import '@nextui-org/react/styles.css';
import { NextUIProvider } from '@nextui-org/react';

function App() {
  const { reset } = useContext(AppContext);

  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLS', reset);
    return () => {
      localStorageEventTarget.removeEventListener('clearLS', reset);
    };
  }, [reset]);

  return (
    <NextUIProvider>
      <div>
        <AppRouter />
        <ToastContainer />
      </div>
    </NextUIProvider>
  );
}

export default App;
