#!/usr/bin/env node
/**
 * mcp-forge CLI
 * =============
 * Opinionated scaffolder for MCP servers.
 *
 * Commands:
 *   mcp-forge new <name>        Scaffold a new MCP server
 *   mcp-forge test <path>       Run test harness on a generated server
 *   mcp-forge templates         List available templates
 *   mcp-forge publish <path>    Prepare for npm/PyPI publish (dry-run)
 */

import { Command } from 'commander';
import { scaffold, listTemplates, type Language, type Template } from './scaffold.js';
import { testServer } from './test-harness/index.js';
import { loadConfig } from './config.js';
import { existsSync } from 'fs';

const NAME = 'mcp-forge';
const VERSION = '0.1.0';

const program = new Command();

program
  .name(NAME)
  .description('Opinionated CLI to scaffold, test, and publish MCP servers')
  .version(VERSION);

program
  .command('new <name>')
  .description('Scaffold a new MCP server')
  .option('-l, --lang <lang>', 'Language: typescript or python', 'typescript')
  .option('-t, --template <template>', 'Template: read-only-api, file-tool, db-tool', 'read-only-api')
  .option('-o, --out <dir>', 'Output directory', '.')
  .action((name, options) => {
    const lang = options.lang as Language;
    const template = options.template as Template;

    if (!['typescript', 'python'].includes(lang)) {
      console.error(`Unknown language: ${lang}. Use 'typescript' or 'python'.`);
      process.exit(1);
    }

    if (!['read-only-api', 'file-tool', 'db-tool'].includes(template)) {
      console.error(`Unknown template: ${template}. Use 'read-only-api', 'file-tool', or 'db-tool'.`);
      process.exit(1);
    }

    try {
      const targetDir = scaffold({ name, lang, template, outDir: options.out });
      console.log(`\n✓ Scaffoled ${lang} MCP server: ${targetDir}`);
      console.log(`\nNext steps:`);
      if (lang === 'typescript') {
        console.log(`  cd ${targetDir}`);
        console.log(`  npm install`);
        console.log(`  npm run build`);
        console.log(`  npm start`);
      } else {
        console.log(`  cd ${targetDir}`);
        console.log(`  pip install -e .`);
        console.log(`  ${name.replace(/-/g, '_')}`);
      }
    } catch (err) {
      console.error(`Error: ${(err as Error).message}`);
      process.exit(1);
    }
  });

program
  .command('test <path>')
  .description('Run test harness on a generated MCP server')
  .action((path) => {
    if (!existsSync(path)) {
      console.error(`Path not found: ${path}`);
      process.exit(1);
    }

    console.log(`Testing ${path}...\n`);
    const result = testServer(path);

    for (const check of result.checks) {
      const icon = check.passed ? '✓' : '✗';
      console.log(`  ${icon} ${check.name}`);
      if (check.message) console.log(`    → ${check.message}`);
    }

    console.log(`\n${result.passed ? 'All checks passed.' : 'Some checks failed.'}`);
    process.exit(result.passed ? 0 : 1);
  });

program
  .command('templates')
  .description('List available templates')
  .action(() => {
    console.log('Available templates:\n');
    for (const t of listTemplates()) {
      console.log(`  ${t.id}`);
      console.log(`    ${t.title}`);
      console.log(`    ${t.description}\n`);
    }
  });

program
  .command('publish <path>')
  .description('Prepare for npm/PyPI publish (dry-run)')
  .option('--dry-run', 'Show what would be done without executing', true)
  .action((path, options) => {
    if (!existsSync(path)) {
      console.error(`Path not found: ${path}`);
      process.exit(1);
    }

    const isTs = existsSync(`${path}/package.json`);
    const isPy = existsSync(`${path}/pyproject.toml`);

    if (options.dryRun) {
      console.log('[DRY RUN] Publish steps:\n');
      if (isTs) {
        console.log('  1. npm version patch');
        console.log('  2. npm run build');
        console.log('  3. npm publish --access public');
      } else if (isPy) {
        console.log('  1. python -m build');
        console.log('  2. python -m twine upload dist/*');
      }
      console.log('\nRun without --dry-run to execute (not recommended until v0.5).');
    }
  });

program.parse();
