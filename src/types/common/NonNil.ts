import Nil from './Nil';

type NonNil<T> = Exclude<T, Nil>;

export default NonNil;
