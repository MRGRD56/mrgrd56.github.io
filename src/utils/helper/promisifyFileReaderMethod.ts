const promisifyFileReaderMethod = <R extends string | ArrayBuffer>(invocation: (reader: FileReader) => void) => {
    return new Promise<R>((resolve, reject) => {
        const reader = new FileReader();

        const handleLoad = (event: FileReaderEventMap['load']) => {
            reader.removeEventListener('load', handleLoad);
            resolve(event.target?.result as R);
        };

        const handleError = (event: FileReaderEventMap['error']) => {
            reader.removeEventListener('error', handleError);
            reject(event);
        };

        reader.addEventListener('load', handleLoad);
        reader.addEventListener('error', handleError);

        invocation(reader);
    });
};

export default promisifyFileReaderMethod;
