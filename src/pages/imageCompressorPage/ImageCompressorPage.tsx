import React, { FunctionComponent } from 'react';
import BiConverterPageContainer from '../../layouts/pages/biConverterPageContainer/BiConverterPageContainer';
import { Col } from 'antd';

const ImageCompressorPage: FunctionComponent = () => {
    return (
        <BiConverterPageContainer
            leftTitle="Original"
            rightTitle="Compressed"
            left={<Col>Org</Col>}
            right={<Col>Com</Col>}
        ></BiConverterPageContainer>
    );
};

export default ImageCompressorPage;
