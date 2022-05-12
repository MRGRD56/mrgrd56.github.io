import promisifyFileReaderMethod from './helper/promisifyFileReaderMethod';

const readFileAsDataUrl = (blob: Blob) =>
    promisifyFileReaderMethod<string>((reader) => {
        reader.readAsDataURL(blob);
    });

export default readFileAsDataUrl;
