const fs = require('fs');
const path = require('path');

const repos = [
    'person-standard',
    'data-exchange-standard',
    'taxonomy',
    'placements-standard',
    'information-governance',
    'controlled-vocabularies',
    'API-Catalogue',
    'life-event-standard',
    'logical-model',
    'professional-standard',
    'relationship-standard',
    'service-episode-standard'
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

    // Recursively copy all .md and .json files
    function copyFiles(currentSource, currentDest) {
        if (!fs.existsSync(currentDest)) {
            fs.mkdirSync(currentDest, { recursive: true });
        }
        fs.readdirSync(currentSource).forEach(file => {
            if (file.startsWith('.')) return; // skip .git etc
            const sourceFile = path.join(currentSource, file);
            const destFile = path.join(currentDest, file);
            const stat = fs.statSync(sourceFile);
            if (stat.isDirectory()) {
                copyFiles(sourceFile, destFile);
            } else if (file.endsWith('.md') || file.endsWith('.json')) {
                fs.copyFileSync(sourceFile, destFile);
                console.log(`Copied ${path.relative(sourceBase, sourceFile)}`);
            }
        });
    }
    copyFiles(sourceDir, destDir);
});

console.log('Local setup complete. Files copied to content/local-specs/');
