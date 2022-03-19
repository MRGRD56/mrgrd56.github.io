import React, { FunctionComponent } from 'react';
import { DevProject } from '../../types';
import styles from './DevProjectCard.module.scss';
import { Card } from 'antd';

interface Props {
    project: DevProject;
}

const DevProjectCard: FunctionComponent<Props> = ({ project }) => {
    return (
        <Card className={styles.container}>
            <h2>
                <a href={project.appUrl}>{project.name}</a>
            </h2>
            <div>
                <a href={project.repoUrl} target="_blank" rel="noreferrer noopener">
                    GitHub Repository
                </a>
            </div>
            <div>{project.description}</div>
            {/*<img src={githubLogo} alt="GitHub" style={styles.githubLogo}/>*/}
        </Card>
    );
};

export default DevProjectCard;
