import promisifyFileReaderMethod from './helper/promisifyFileReaderMethod';

const readFileText = (blob: Blob) =>
    promisifyFileReaderMethod<string>((reader) => {
        reader.readAsText(blob);
    });

export default readFileText;
