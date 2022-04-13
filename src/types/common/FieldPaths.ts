/**
 * @deprecated Not working
 */
type FieldPaths<Object extends Record<string, any>, Field extends keyof Object> = Field extends string
    ? keyof Object[Field] extends string
        ? `${Field}.${keyof Object[Field]}`
        : never
    : never;

export default FieldPaths;

//supposed to be used instead of `address.${keyof VacancyInOutDto['address']}`
//like this FieldPaths<VacancyInOutDto, 'address'>
