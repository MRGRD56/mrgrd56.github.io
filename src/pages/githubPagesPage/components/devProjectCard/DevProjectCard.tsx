import React, { FunctionComponent } from 'react';
import { DevProject } from '../../../../types';
import styles from './DevProjectCard.module.scss';
import githubLogo from '../../../../assets/img/github-logo-dark.svg';
import ExternalLink from '../../../../components/ExternalLink';

interface Props {
    project: DevProject;
}

const DevProjectCard: FunctionComponent<Props> = ({ project }) => {
    return (
        <div className={styles.container}>
            <h2>
                <ExternalLink href={project.appUrl}>{project.name}</ExternalLink>
            </h2>
            <div>{project.description}</div>
            <ExternalLink href={project.repoUrl} className={styles.githubRepoLink}>
                <img src={githubLogo} alt="GitHub" className={styles.githubLogo} />
                <div>GitHub Repository</div>
            </ExternalLink>
        </div>
    );
};

export default DevProjectCard;
