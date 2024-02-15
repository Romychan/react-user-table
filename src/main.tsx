import ReactDOM from 'react-dom/client';

import { MainPage } from '~/pages/MainPage';

import { UserContextProvider } from '~/entities/User';

import { ToastProvider } from '~/shared/ui/Toast';

import { QueryProvider } from '~/app/providers/withQueryProvider';
import { startWorker } from '~/app/lib/startWorker';

import '~/app/assets/styles/style.scss';

startWorker().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryProvider>
      <ToastProvider>
        <UserContextProvider>
          <MainPage />
        </UserContextProvider>
      </ToastProvider>
    </QueryProvider>,
  );
});
