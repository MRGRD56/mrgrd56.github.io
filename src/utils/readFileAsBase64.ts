const readFileAsBase64 = (file: Blob): Promise<string> =>
    new Promise((resolve) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(reader.result as string));
        reader.readAsDataURL(file);
    });

export default readFileAsBase64;
