import React, { FunctionComponent } from 'react';
import { DevProject } from '../../../../types';
import styles from './DevProjectCard.module.scss';
import githubLogo from '../../../../assets/img/github-logo-dark.svg';

interface Props {
    project: DevProject;
}

const DevProjectCard: FunctionComponent<Props> = ({ project }) => {
    return (
        <div className={styles.container}>
            <h2>
                <a href={project.appUrl}>{project.name}</a>
            </h2>
            <div>{project.description}</div>
            <a href={project.repoUrl} className={styles.githubRepoLink} target="_blank" rel="noreferrer noopener">
                <img src={githubLogo} alt="GitHub" className={styles.githubLogo} />
                <div>GitHub Repository</div>
            </a>
        </div>
    );
};

export default DevProjectCard;
