const call = (fn: () => Promise<void> | void) => fn();

export default call;
