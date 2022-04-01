import React, { FunctionComponent } from 'react';
import { DevProject } from '../../../../types';
import DevProjectCard from '../devProjectCard/DevProjectCard';
import styles from './DevProjectsList.module.scss';

interface Props {
    projects: DevProject[] | undefined;
}

const DevProjectsListPure: FunctionComponent<Props> = ({ projects }) => {
    if (!projects) {
        return null;
    }

    return (
        <div className={styles.container}>
            {projects.map((project) => (
                <DevProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
};

export default DevProjectsListPure;
