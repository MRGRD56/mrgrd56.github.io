export default (template: { raw: readonly string[] | ArrayLike<string> }, ...substitutions: any[]): string => {
    return String.raw(template, ...substitutions).trim();
};
