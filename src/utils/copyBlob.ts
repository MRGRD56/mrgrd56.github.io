const copyBlob = (blob: Blob) => {
    return navigator.clipboard.write([
        new ClipboardItem({
            [blob.type]: blob
        })
    ]);
};

export default copyBlob;
