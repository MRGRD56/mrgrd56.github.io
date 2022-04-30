export abstract class IObject<T> {
    protected constructor(public readonly fields: Record<string, T>) {}
}

export abstract class IArray<T> {
    protected constructor(public readonly types: T[]) {}
}

export type IType<
    TPrimitive,
    TObject extends IObject<IType<TPrimitive, TObject, TArray>>,
    TArray extends IArray<IType<TPrimitive, TObject, TArray>>
> = TPrimitive | TObject | TArray;
