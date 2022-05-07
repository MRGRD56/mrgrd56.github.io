import React, { FunctionComponent } from 'react';
import DoubleConverterPageContainer from '../../layouts/pages/doubleConverterPageContainer/DoubleConverterPageContainer';
import { Col } from 'antd';

const ImageCompressorPage: FunctionComponent = () => {
    return (
        <DoubleConverterPageContainer
            leftTitle="Original"
            rightTitle="Compressed"
            left={<Col>Org</Col>}
            right={<Col>Com</Col>}
        ></DoubleConverterPageContainer>
    );
};

export default ImageCompressorPage;
