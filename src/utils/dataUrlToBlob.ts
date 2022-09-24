//based on https://stackoverflow.com/a/12300351
const dataUrlToBlob = (dataUrl: string): Blob => {
    const byteString = window.atob(dataUrl.split(',')[1]);

    const mimeString = dataUrl.split(',')[0].split(':')[1].split(';')[0];

    const ab = new ArrayBuffer(byteString.length);

    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
};

export default dataUrlToBlob;
