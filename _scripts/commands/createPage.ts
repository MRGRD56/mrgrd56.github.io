import * as fs from 'fs';
import * as path from 'path';
import { appRootPath } from '../common';
import { camelCase } from 'lodash';
import pascalCase from '../utils/pascalCase';
import { exec } from 'child_process';

const pagesDirectoryPath = path.resolve(appRootPath, 'src/pages');

const getTsxContent = (pageName: string): string => {
    return `
import React, { FunctionComponent } from 'react';
import PageContainer from '../../layouts/pages/pageContainer/PageContainer';
import styles from './${pageName}.module.scss';

const ${pageName}: FunctionComponent = () => {
    return (
        <PageContainer title="${pageName}">
            
        </PageContainer>
    );
};

export default ${pageName};
    `.trim();
};

interface Args {
    force?: boolean;
}

const createPage = async (name: string, args: Args) => {
    const { force } = args;

    const pageDirectory = path.resolve(pagesDirectoryPath, camelCase(name));

    if (fs.existsSync(pageDirectory)) {
        if (!force) {
            console.log('Directory already exists. Aborted');
            return;
        }
    } else {
        await fs.promises.mkdir(pageDirectory);
        console.log('Created directory ' + pageDirectory);
    }

    const componentName = pascalCase(name);

    const componentFilePath = path.resolve(pageDirectory, `${componentName}.tsx`);
    const stylesFilePath = path.resolve(pageDirectory, `${componentName}.module.scss`);

    await fs.promises.writeFile(componentFilePath, getTsxContent(componentName), { encoding: 'utf-8' });
    console.log('Created file ' + componentFilePath);

    await fs.promises.writeFile(stylesFilePath, '', { encoding: 'utf-8' });
    console.log('Created file ' + stylesFilePath);

    exec(`git add "${componentFilePath}"`, (error, stdout, stderr) => {
        console.log(error || stderr || stdout);

        exec(`git add "${stylesFilePath}"`, (error, stdout, stderr) => {
            console.log(error || stderr || stdout);
        });
    });
};

export default createPage;
