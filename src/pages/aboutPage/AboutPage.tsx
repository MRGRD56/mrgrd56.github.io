import React from 'react';
import PageContainer from '../../components/pageContainer/PageContainer';
import { Col } from 'antd';
import packageJson from '../../../package.json';
import AppDependency from './components/AppDependency';
import mapObject from '../../utils/mapObject';
import Text from 'antd/lib/typography/Text';
import { ReactComponent as ReactLogo } from '../../assets/img/react-logo.svg';
import ExternalLink from '../../components/ExternalLink';
import Paragraph from 'antd/lib/typography/Paragraph';
import { AntDesignOutlined } from '@ant-design/icons';

const AboutPage = () => {
    return (
        <PageContainer title="About the app">
            <Col>
                <Text>
                    <Paragraph className="mb-1">
                        This app is created with{' '}
                        <ExternalLink href="https://github.com/facebook/react" className="ms-1">
                            <ReactLogo width={12} /> React
                        </ExternalLink>
                    </Paragraph>
                    <Paragraph>
                        The UI is built with{' '}
                        <ExternalLink href="https://ant.design" className="ms-1">
                            <AntDesignOutlined /> Ant Design
                        </ExternalLink>
                    </Paragraph>
                </Text>
                <h2>Used packages</h2>
                <h3 className="mt-2">dependencies</h3>
                {mapObject(packageJson.dependencies, (key, value, index) => (
                    <AppDependency key={index} name={key} version={value} />
                ))}
                <h3 className="mt-2">devDependencies</h3>
                {mapObject(packageJson.devDependencies, (key, value, index) => (
                    <AppDependency key={index} name={key} version={value} />
                ))}
            </Col>
        </PageContainer>
    );
};

export default AboutPage;
