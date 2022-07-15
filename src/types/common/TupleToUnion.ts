import WritableTuple from './Writeable';

type MakeWritable<T extends readonly any[] | any[]> = T extends readonly any[] ? WritableTuple<T> : T;

type TupleToUnion<T extends [...any] | readonly [...any]> = T extends []
    ? never
    : MakeWritable<T> extends [infer First, ...infer Rest]
    ? First | TupleToUnion<Rest>
    : never;

export default TupleToUnion;
