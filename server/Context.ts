import { MercuriusContext } from 'mercurius';

export default interface Context extends MercuriusContext {
  payload?: { userId: number, iat: number, exp: number };
}
