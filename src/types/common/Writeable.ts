type WritableTuple<T extends readonly any[]> = T extends readonly [...infer Item] ? [...Item] : never;

export default WritableTuple;
