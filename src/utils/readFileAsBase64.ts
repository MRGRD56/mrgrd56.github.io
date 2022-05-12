import readFileAsDataUrl from './readFileAsDataUrl';

const readFileAsBase64 = async (blob: Blob): Promise<string> => {
    const dataUrl = await readFileAsDataUrl(blob);
    return dataUrl.split('base64,')[1];
};

export default readFileAsBase64;
