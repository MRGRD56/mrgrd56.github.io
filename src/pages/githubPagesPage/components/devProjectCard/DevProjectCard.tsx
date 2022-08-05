import React, { FunctionComponent } from 'react';
import { DevProject } from '../../../../types';
import styles from './DevProjectCard.module.scss';
import githubLogoLight from '../../../../assets/img/github-logo.svg';
import githubLogoDark from '../../../../assets/img/github-logo-dark.svg';
import ExternalLink from '../../../../components/ExternalLink';
import useAppTheme from '../../../../hooks/useAppTheme';
import classNames from 'classnames';

interface Props {
    project: DevProject;
}

const DevProjectCard: FunctionComponent<Props> = ({ project }) => {
    const { isDarkMode } = useAppTheme();

    const githubLogo = isDarkMode ? githubLogoDark : githubLogoLight;

    return (
        <div className={styles.container}>
            <h2 className="text-center text-break">
                <ExternalLink href={project.appUrl}>{project.name}</ExternalLink>
            </h2>
            <div className={classNames('text-center text-break', styles.repoDescription)}>{project.description}</div>
            <ExternalLink href={project.repoUrl} className={styles.githubRepoLink}>
                <img src={githubLogo} alt="GitHub" className={styles.githubLogo} />
                <div>GitHub Repository</div>
            </ExternalLink>
        </div>
    );
};

export default DevProjectCard;
