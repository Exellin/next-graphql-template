import { MercuriusContext } from 'mercurius';

export default interface Context extends MercuriusContext {
  payload?: { userId: String };
}
