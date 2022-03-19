import React, { useEffect } from 'react';
import DevProjectsListPure from './DevProjectsListPure';
import { useDispatch, useSelector } from '../../reducers';
import getProjects from '../../actions/github/getProjects';
import useGithubUser from '../../hooks/useGithubUser';
import { Spin } from 'antd';

const DevProjectsList = () => {
    const dispatch = useDispatch();
    const githubUser = useGithubUser();
    const projects = useSelector((state) => state.github.projects);

    const fetchData = async () => {
        if (projects) {
            return;
        }

        const user = await githubUser.getUser();
        await dispatch(getProjects({ user }));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Spin spinning={false}>
            <DevProjectsListPure projects={projects ?? []} />
        </Spin>
    );
};

export default DevProjectsList;
