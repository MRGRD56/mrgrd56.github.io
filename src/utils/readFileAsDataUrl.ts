import promisifyFileReaderMethod from './helper/promisifyFileReaderMethod';

const readFileAsDataUrl = (blob: Blob): Promise<string> =>
    promisifyFileReaderMethod<string>((reader) => {
        reader.readAsDataURL(blob);
    });

export default readFileAsDataUrl;
