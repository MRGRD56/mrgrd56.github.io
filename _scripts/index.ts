import { Command } from 'commander';
import createPage from './commands/createPage';

const program = new Command();

program
    .command('create-page')
    .description('Create a page')
    .argument('<string>', 'new page name or path')
    .option('--force', 'Overwrite existing page')
    .action(async (name, args) => createPage(name, args));

program.parse();
