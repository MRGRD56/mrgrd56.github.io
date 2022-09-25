const isImageFile = (file: Blob | DataTransferItem) => {
    return /^image\/.+$/.test(file.type);
};

export default isImageFile;
