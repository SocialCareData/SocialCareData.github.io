# Deployment Guide

To deploy the website with the new JSON specifications:

1.  **Build Step:** You must run the setup script to copy the latest specifications from the sibling repositories into the website's content folder.
    ```bash
    node setup-local-dev.js
    ```
    (Ensure all sibling repositories are checked out and up-to-date in the parent directory).

2.  **Commit:** You can either commit the `content/local-specs` folder (if you want them statically in the repo) or run this script as part of your GitHub Actions workflow before deploying to GitHub Pages.

3.  **Serve:**
    ```bash
    python -m http.server
    ```
