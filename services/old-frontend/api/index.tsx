import axios, { Method } from 'axios';
import { useToast } from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { deleteAuth, getAuth, setAuth } from './cookiesStore';
import { usePathname, useRouter } from 'next/navigation';
import { useWs } from '@/app/SocketContext';

const http_host = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:4000' : 'https://0.0.0.0:4001';
const ws_host = process.env.NODE_ENV === 'development' ? 'ws://127.0.0.1:8000' : 'wss://0.0.0.0:8001';

const api = axios.create({ baseURL: http_host });

export function useApi() {
  const toast = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const { ws } = useWs();
  const [_, setRetries] = useState(0);

  const signout = useCallback(() => {
    deleteAuth();
    if (pathname !== '/auth/signin') router.replace('/auth/signin');
  }, [pathname, router]);

  const exec = useCallback(
    async ({ method, url, body, onSuccess }: { method: Method; url: string; body?: any; onSuccess?: (data: any) => void }) => {
      const auth = getAuth();

      try {
        const { data } = await api({
          method,
          url,
          data: body,
          headers: {
            authorization: auth?.access_token ?? ''
          }
        });

        if (onSuccess) onSuccess(data);

        return data;
      } catch (err) {
        // @ts-ignore
        const msg = err?.response?.data?.message ?? err?.stack?.toString();

        if (['user not found', 'jwt expired', 'invalid signature', 'jwt must be provided'].includes(msg)) signout();
        else toast({ status: 'error', title: 'Ошибка', description: msg });

        return false;
      }
    },
    [signout, toast]
  );

  const connect = useCallback(async () => {
    if (ws.current) {
      ws.current.close();
      ws.current = null as unknown as WebSocket;
    }

    const auth = getAuth();
    if (!auth) return;
    const socket = new WebSocket(`${ws_host}/${auth.access_token}`);

    socket.onclose = () =>
      setRetries((s: number) => {
        if (s < 5) {
          setTimeout(connect, 1000);
          return s + 1;
        } else {
          deleteAuth();
          return s;
        }
      });

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data);
    };

    ws.current = socket;
  }, [ws]);

  return {
    async validate() {
      const auth = getAuth();
      if (!auth) {
        if (!pathname.includes('/auth')) router.replace('/auth/signin');
      } else if (pathname !== '/') router.replace('/');
    },
    connect,
    signout,
    signin: async (payload: object) =>
      await exec({
        method: 'post',
        url: '/auth/signin',
        body: payload,
        onSuccess(data) {
          setAuth(data);
          router.replace('/');
        }
      }),
    signup: async (payload: object) =>
      await exec({
        method: 'post',
        url: '/auth/signup',
        body: payload,
        onSuccess(data) {
          setAuth(data);
          router.replace('/');
        }
      }),
    getMe: async () =>
      await exec({
        method: 'get',
        url: '/me',
        onSuccess(data) {
          console.log(data);
        }
      })
  };
}
