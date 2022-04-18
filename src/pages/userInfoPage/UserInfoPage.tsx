import React from 'react';
import PageContainer, { PageTag } from '../../components/pageContainer/PageContainer';

const tags = [PageTag.WIP];

const UserInfoPage = () => {
    return (
        <PageContainer title="User Info" tags={tags}>
            Here will be your IP address, user agent, information about your browser, screen and other
        </PageContainer>
    );
};

export default UserInfoPage;
