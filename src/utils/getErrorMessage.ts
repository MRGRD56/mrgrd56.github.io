const getErrorMessage = (error: any) => {
    return error instanceof Error ? error.message : String(error);
};

export default getErrorMessage;
