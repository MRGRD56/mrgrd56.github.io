import React, { FunctionComponent } from 'react';
import prettyBytes from 'pretty-bytes';
import Flex from '../../../../components/flex/Flex';
import { ArrowRightAlt, Warning } from '@mui/icons-material';
import percentage from '../../../../utils/percentage';
import Text from 'antd/lib/typography/Text';
import styles from './ImageInfo.module.scss';

interface Props {
    blob: Blob;
    blob2?: Blob;
}

const ImageInfo: FunctionComponent<Props> = ({ blob, blob2 }) => {
    const sizePercentage = blob2 ? percentage(blob2.size, blob.size) : 0;
    const isOversize = sizePercentage >= 101;

    return (
        <Flex col className="m-2">
            <Flex row align="center">
                Size: {prettyBytes(blob.size)}
                {blob2 && (
                    <>
                        <div className={styles.comparisonArrow}>
                            <ArrowRightAlt fontSize="small" />
                        </div>
                        {prettyBytes(blob2.size)}&nbsp;
                        <Text type={isOversize ? 'danger' : 'secondary'}>({sizePercentage}%)</Text>
                        {isOversize && (
                            <Text type="warning" className="p-0 ms-1 d-flex">
                                <Warning fontSize="small" />
                            </Text>
                        )}
                    </>
                )}
            </Flex>
            <Flex row align="center">
                Type: {blob.type}
                {blob2 && blob2.type !== blob.type ? (
                    <>
                        <div className={styles.comparisonArrow}>
                            <ArrowRightAlt fontSize="small" />
                        </div>
                        {blob2.type}
                    </>
                ) : undefined}
            </Flex>
        </Flex>
    );
};

export default ImageInfo;
