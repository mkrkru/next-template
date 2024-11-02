import { FastifyRequest } from "fastify";

export interface ISignupBody {
  nickname: string;
  password: string;
}

export interface IRequest extends FastifyRequest {
  // eslint-disable-next-line
  user?: any;
}
