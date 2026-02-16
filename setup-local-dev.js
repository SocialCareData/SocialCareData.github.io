const fs = require('fs');
const path = require('path');

const repos = [
    'person-standard',
    'data-exchange-standard',
    'taxonomy',
    'placements-standard',
    'information-governance',
    'controlled-vocabularies',
    'API-Catalogue'
];

const sourceBase = path.join(__dirname, '..');
const destBase = path.join(__dirname, 'content', 'local-specs');

// Ensure destination exists
if (!fs.existsSync(destBase)) {
    fs.mkdirSync(destBase, { recursive: true });
}

repos.forEach(repo => {
    const sourceDir = path.join(sourceBase, repo);
    const destDir = path.join(destBase, repo);

    if (!fs.existsSync(sourceDir)) {
        console.warn(`Warning: Repository ${repo} not found at ${sourceDir}`);
        return;
    }

    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    // Files to copy
    const filesToCopy = ['README.md', 'specification.md', 'spec.json']; // Added spec.json for future use

    filesToCopy.forEach(file => {
        const sourceFile = path.join(sourceDir, file);
        const destFile = path.join(destDir, file);

        if (fs.existsSync(sourceFile)) {
            fs.copyFileSync(sourceFile, destFile);
            console.log(`Copied ${repo}/${file}`);
        }
    });
});

console.log('Local setup complete. Files copied to content/local-specs/');
