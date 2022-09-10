import React, { FunctionComponent } from 'react';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';
import styles from './JetBrainsUiPage.module.scss';
import JbLayout from './components/jbLayout/JbLayout';
import JbButton from './components/jbButton/JbButton';
import Flex from '../../components/flex/Flex';

const JetBrainsUiPage: FunctionComponent = () => {
    return (
        <PageContainer title="JetBrains UI">
            <JbLayout>
                <Flex gap={15}>
                    <JbButton type="primary">Create</JbButton>
                    <JbButton>Cancel</JbButton>
                </Flex>
            </JbLayout>
        </PageContainer>
    );
};

export default JetBrainsUiPage;
