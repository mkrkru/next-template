import { createContext, useRef, useContext } from 'react';

export const SocketContext = createContext(null as any);

export function SocketContextProvider({ children }: { children: React.ReactNode }) {
    const ws = useRef(null as unknown as WebSocket);

    return <SocketContext.Provider value={ws}>
        {children}
    </SocketContext.Provider>;
}

export function useWs() {
    const context = useContext(SocketContext);
    if (!context) throw new Error('Use app context within provider!');
    return { ws: context, send: (data: any) => context.current?.send(JSON.stringify(data)) };
}
