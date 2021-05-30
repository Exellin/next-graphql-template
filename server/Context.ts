import { MercuriusContext } from 'mercurius';

export default interface Context extends MercuriusContext {
  payload?: { userId: Number, iat: Number, exp: Number };
}
