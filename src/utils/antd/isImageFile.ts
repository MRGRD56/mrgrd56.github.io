import { RcFile } from 'antd/lib/upload';

const isImageFile = (file: RcFile) => {
    return /^image\/.+$/.test(file.type);
};

export default isImageFile;
