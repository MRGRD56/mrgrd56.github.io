const isImageFile = (file: Blob) => {
    return /^image\/.+$/.test(file.type);
};

export default isImageFile;
