import React, { FunctionComponent } from 'react';
import DevProjectsList from './components/devProjectsList/DevProjectsList';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';

const GithubPagesListPage: FunctionComponent = () => (
    <PageContainer>
        <DevProjectsList />
    </PageContainer>
);

export default GithubPagesListPage;
