'use client';
import { Provider as Redux } from '@/redux/provider';
import '@fontsource-variable/manrope';
import { SocketContextProvider } from '@/app/SocketContext';
import { Provider } from '@/components/ui/provider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Redux>
      <Provider>
        <SocketContextProvider>{children}</SocketContextProvider>
      </Provider>
    </Redux>
  );
}
