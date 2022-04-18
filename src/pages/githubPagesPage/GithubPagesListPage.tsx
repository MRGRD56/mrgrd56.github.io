import React, { FunctionComponent } from 'react';
import DevProjectsList from './components/devProjectsList/DevProjectsList';
import PageContainer from '../../components/pageContainer/PageContainer';

const GithubPagesListPage: FunctionComponent = () => (
    <PageContainer>
        <DevProjectsList />
    </PageContainer>
);

export default GithubPagesListPage;
