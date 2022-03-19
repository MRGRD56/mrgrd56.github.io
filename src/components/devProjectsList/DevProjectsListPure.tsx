import React, { FunctionComponent } from 'react';
import { DevProject } from '../../types';
import DevProjectCard from '../devProjectCard/DevProjectCard';
import styles from './DevProjectsList.module.scss';

interface Props {
    projects: DevProject[];
}

const DevProjectsListPure: FunctionComponent<Props> = ({ projects }) => {
    return (
        <div className={styles.container}>
            {projects.map((project) => (
                <DevProjectCard project={project} />
            ))}
        </div>
    );
};

export default DevProjectsListPure;
