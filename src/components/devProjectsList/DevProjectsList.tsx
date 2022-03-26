import React, { useCallback } from 'react';
import DevProjectsListPure from './DevProjectsListPure';
import { useDispatch, useSelector } from '../../reducers';
import getProjects from '../../actions/github/getProjects';
import useGithubUser from '../../hooks/useGithubUser';
import { Result } from 'antd';
import useAsync from '../../hooks/useAsync';
import Loading from '../loading/Loading';

const DevProjectsList = () => {
    const dispatch = useDispatch();
    const githubUser = useGithubUser();
    const projects = useSelector((state) => state.github.projects);

    const fetchData = useCallback(async () => {
        if (projects) {
            return;
        }

        const user = await githubUser.getUser();
        await dispatch(getProjects({ user }));
    }, [projects, githubUser, dispatch]);

    const { isLoading, error } = useAsync(fetchData, { doInvokeOnMount: true });

    if (error) {
        return <Result status="error" title="An error occurred" subTitle="Unable to load the projects" />;
    }

    if (isLoading) {
        return <Loading spinning />;
    }

    return <DevProjectsListPure projects={projects} />;
};

export default DevProjectsList;
