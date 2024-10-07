import { jwtWsHandler } from '../handlers/jwt';
import { WebSocket, WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8000 });

interface IClients {
    [_id: string]: WebSocket;
}

const clients: IClients = {};

// eslint-disable-next-line
function broadcast(data: { nickname: string, payload: any }) {
    Object.values(clients)
        .filter((client: WebSocket) => client.readyState === WebSocket.OPEN)
        .forEach((client: WebSocket) => client.send(JSON.stringify(data)));
}

wss.on('connection', async (ws: WebSocket, req: Request) => {
    ws.on('error', console.error);

    const user = await jwtWsHandler(req.url.slice(1));
    if (!user) return ws.close();

    console.log(`[⚠️WS] ${user.nickname} connected!`);
    const _id = user._id.toString();
    clients[_id] = ws;

    // eslint-disable-next-line
    ws.on('message', async (data: any) => {
        console.log(`[ℹ️WS] ${user.nickname} said: ${data.toString()}`);

        try {
            data = JSON.parse(data.toString());
            broadcast({ nickname: user.nickname, payload: data });
        } catch { /* empty */
        }
    });
});