'use client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Provider } from '@/redux/provider';
import '@fontsource-variable/manrope';
import { SocketContextProvider } from '@/app/SocketContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <ChakraProvider
        theme={extendTheme({
          fonts: {
            body: `'Manrope Variable', sans-serif`
          },
          colors: {
            main: {
              100: '#000000'
            }
          }
        })}
      >
        <SocketContextProvider>{children}</SocketContextProvider>
      </ChakraProvider>
    </Provider>
  );
}
