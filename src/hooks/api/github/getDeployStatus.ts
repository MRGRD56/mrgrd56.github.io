import octokit from '../../../utils/api/octokit';
import moment, { Moment } from 'moment';
import { isNil } from 'lodash';

interface DeployStatus {
    status: string | null;
    conclusion: string | null;
    htmlUrl: string | null;
    createdAt: Moment | null;
    updatedAt: Moment | null;
    runStartedAt: Moment | null;
}

const momentify = (date: string | null | undefined): Moment | null => {
    return isNil(date) ? null : moment(date);
};

const getDeployStatus = async (): Promise<DeployStatus | undefined> => {
    const runs = await octokit.request('GET /repos/{owner}/{repo}/actions/runs', {
        owner: 'MRGRD56',
        repo: 'MRGRD56.github.io',
        actor: 'github-pages[bot]',
        per_page: 1,
        headers: {
            'If-None-Match': ''
        }
    });

    const run = runs.data.workflow_runs[0];
    if (!run.name?.includes('deployment')) {
        return;
    }

    return {
        status: run.status,
        conclusion: run.conclusion,
        htmlUrl: run.html_url,
        createdAt: momentify(run.created_at),
        updatedAt: momentify(run.updated_at),
        runStartedAt: momentify(run.run_started_at)
    };
};

export default getDeployStatus;
