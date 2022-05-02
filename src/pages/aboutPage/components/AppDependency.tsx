import React, { FunctionComponent } from 'react';
import { Space } from 'antd';
import Text from 'antd/lib/typography/Text';
import styles from './AppDependency.module.scss';
import ExternalLink from '../../../components/ExternalLink';
import getNpmPackageLink from '../../../utils/getNpmPackageLink';

interface Props {
    name: string;
    version: string;
}

const AppDependency: FunctionComponent<Props> = ({ name, version }) => {
    const link = getNpmPackageLink(name);

    return (
        <Space direction="horizontal" className={styles.container}>
            <Text>
                <code>
                    <ExternalLink href={link}>{name}</ExternalLink> {version}
                </code>
            </Text>
        </Space>
    );
};

export default AppDependency;
