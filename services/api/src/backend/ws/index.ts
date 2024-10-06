import { jwtWsHandler } from '../handlers/jwt';
import { WebSocket, WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8000 });

interface IClients {
    [username: string]: WebSocket;
}

let clients: IClients = {};

function broadcast(data: any) {
    Object.values(clients)
        .filter((client: any) => client.readyState === WebSocket.OPEN)
        .forEach((client: any) => client.send(JSON.stringify(data)));
}

wss.on('connection', async (ws: any, req: any) => {
    ws.on('error', console.error);

    const user: any | null = await jwtWsHandler(req.url.slice(1) ?? '');
    if (!user) return ws.close();

    console.log(`[⚠️WS] ${user.nickname} connected!`);
    const user_id = user._id.toString();
    clients[user_id] = ws;

    ws.on('message', async (data: any) => {
        console.log(`[ℹ️WS] ${user.nickname} said: ${data.toString()}`);

        try {
            data = JSON.parse(data.toString());
            broadcast({ nickname: user.nickname, payload: data });
        } catch {
        }
    });
});