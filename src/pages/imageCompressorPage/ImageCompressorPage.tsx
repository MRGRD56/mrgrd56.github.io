import React, { FunctionComponent } from 'react';
import ImageConverterPageContainer from '../../layouts/pages/imageConverterPageContainer/ImageConverterPageContainer';
import { identity } from 'lodash';

const ImageCompressorPage: FunctionComponent = () => {
    return <ImageConverterPageContainer sourceTitle="Original" resultTitle="Compressed" convert={identity} />;
};

export default ImageCompressorPage;
