#!/usr/bin/env node

const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Help text to be displayed with --help or -h
const helpText = `
NodeNanny: Your friendly Node.js configuration helper.

Usage:
  nodenanny [options]

Options:
  --help, -h             Show this help message and exit.
  --name, -n <name>      Specify the author name.
  --email, -e <email>    Specify the author email address.
  --proxy, -p            Specify to configure both HTTP and HTTPS proxy.
  --check-config, -c     Check the current configuration for npm, Yarn, npx.
`;

// Parse command-line arguments
const args = process.argv.slice(2);
const options = {};

// Simple command-line argument parser
for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
        case '--help':
        case '-h':
            console.log(helpText);
            process.exit(0);
            break;
        case '--name':
        case '-n':
            options.name = args[i + 1];
            i++;
            break;
        case '--email':
        case '-e':
            options.email = args[i + 1];
            i++;
            break;
        case '--proxy':
        case '-p':
            options.proxy = true;
            break;
        case '--check-config':
        case '-c':
            options.checkConfig = true;
            break;
        default:
            console.log(`\u{1F625} Unknown option: ${args[i]}`);
            console.log(helpText);
            process.exit(1);
    }
}

// Function to check if a command exists
const commandExists = (command) => {
    try {
        execSync(`command -v ${command}`);
        return true;
    } catch (err) {
        return false;
    }
};

// Function to execute shell commands safely
const execCommand = (command, description) => {
    try {
        execSync(command, { stdio: 'inherit' });
        console.log(`\u{1F44D} Successfully executed: ${description}`);
    } catch (error) {
        console.error(`\u{1F622} Failed to execute: ${description}. Ensure the command is available and correct.`);
    }
};

// Function to check the current configuration
const checkConfig = () => {
    console.log("\n\u{1F50D} Checking current configuration...\n");

    const configCommands = {
        npm: 'npm config list',
        yarn: 'yarn config list',
        npx: 'npx --version',  // npx uses npm's config
    };

    for (const [tool, cmd] of Object.entries(configCommands)) {
        if (commandExists(tool)) {
            console.log(`\u{1F4DD} ${tool.toUpperCase()} configuration:`);
            execCommand(cmd, `${tool} configuration`);
        } else {
            console.log(`\u{1F625} ${tool} is not installed. Skipping ${tool} configuration.`);
        }
        console.log('\n');
    }
};

const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

(async () => {
    console.log("\u{1F916} Welcome to NodeNanny! Let's tidy up your Node.js setup.\n");

    if (options.checkConfig) {
        checkConfig();
        process.exit(0);
    }

    const name = options.name || await askQuestion('What is your name? ');
    const email = options.email || await askQuestion("And what's your email address? ");
    const useProxy = options.proxy || (await askQuestion('Do you need to set up a proxy? (yes/no): ')).toLowerCase();

    if (commandExists('npm')) {
        console.log(`\n\u{1F9D9} Setting up your npm configuration, ${name}...`);
        execCommand(`npm set init-author-name "${name}"`, `npm author "${name}"`);
        execCommand(`npm set init-author-email "${email}"`, `npm email "${email}"`);
    } else {
        console.log(`\u{1F625} npm is not installed. Skipping npm configuration.`);
    }

    if (commandExists('yarn')) {
        console.log('\n\u{1F9E1} Now, I’m doing the same for Yarn...');
        execCommand(`yarn config set init-author-name "${name}"`, `Yarn author "${name}"`);
        execCommand(`yarn config set init-author-email "${email}"`, `Yarn email "${email}"`);
    } else {
        console.log(`\u{1F625} Yarn is not installed. Skipping Yarn configuration.`);
    }

    if (useProxy === 'yes' || options.proxy) {
        const httpProxy = await askQuestion('Enter the HTTP proxy URL: ');
        const httpsProxy = await askQuestion('Enter the HTTPS proxy URL: ');

        if (commandExists('npm')) {
            console.log('\n\u{1F511} Setting up your npm proxy settings...');
            execCommand(`npm config set proxy "${httpProxy}"`, 'npm HTTP proxy');
            execCommand(`npm config set https-proxy "${httpsProxy}"`, 'npm HTTPS proxy');
        }

        if (commandExists('yarn')) {
            console.log('\n\u{1F511} Setting up your Yarn proxy settings...');
            execCommand(`yarn config set proxy "${httpProxy}"`, 'Yarn HTTP proxy');
            execCommand(`yarn config set https-proxy "${httpsProxy}"`, 'Yarn HTTPS proxy');
        }
    }

    console.log(`\n\u{1F389} All done! NodeNanny has taken good care of your setup, ${name}. Have a great day!\n`);
    rl.close();
})();
