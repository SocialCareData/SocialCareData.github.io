// Function to fetch and extract first five lines
async function loadTitle(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const lines = text.split('\n');
        const firstFiveLines = lines.slice(0, 5).join('\n');
        document.getElementById('spec-title').innerHTML = marked.parse(firstFiveLines);
    } catch (error) {
        console.error(`Error loading title:`, error);
        document.getElementById('spec-title').innerHTML = "<p>Error loading title</p>";
    }
}

// Function to load content without first five lines
async function loadContentWithoutFirstLine(filePath, elementId) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const lines = text.split('\n');
        const contentWithoutFirstFiveLines = lines.slice(5).join('\n');
        document.getElementById(elementId).innerHTML = marked.parse(contentWithoutFirstFiveLines);
    } catch (error) {
        console.error(`Error loading content:`, error);
        document.getElementById(elementId).innerHTML = "<p>Error loading content</p>";
    }
}

// Function to load full content
async function loadFullContent(filePath, elementId) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        document.getElementById(elementId).innerHTML = marked.parse(text);
    } catch (error) {
        console.error(`Error loading content:`, error);
        document.getElementById(elementId).innerHTML = "<p>Error loading content</p>";
    }
}

// Function to switch tabs
async function switchTab(tabId) {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const targetContent = document.getElementById(tabId);

    if (!targetContent) {
        console.warn(`Tab content for ${tabId} not found`);
        return;
    }

    // Remove active class from all buttons and content
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Add active class to selected buttons (both top and bottom) and content
    const selectedButtons = document.querySelectorAll(`[data-tab="${tabId}"]`);
    selectedButtons.forEach(button => button.classList.add('active'));
    targetContent.classList.add('active');

    // Update URL without reloading the page
    const url = new URL(window.location);
    url.searchParams.set('tab', tabId);
    window.history.pushState({}, '', url);

    // Re-apply hierarchy enhancement to the visible tab
    if (typeof enhanceTableHierarchy === 'function') {
        enhanceTableHierarchy(tabId);
    }
}

// Function to initialize tabs after content is loaded
async function initializeTabs() {
    // Check URL parameters for initial tab
    const urlParams = new URLSearchParams(window.location.search);
    const tabFromUrl = urlParams.get('tab');
    
    // If tab is specified in URL, use that
    if (tabFromUrl) {
        await switchTab(tabFromUrl);
        return;
    }

    // Check tabs in priority order: context -> about -> specification
    const contextTab = document.getElementById('context');
    const aboutTab = document.getElementById('about');
    
    let initialTab = 'specification'; // default fallback
    if (contextTab) {
        initialTab = 'context';
    } else if (aboutTab) {
        initialTab = 'about';
    }
    
    await switchTab(initialTab);

    // Add click handlers
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
}

// Initialize tabs
document.addEventListener('DOMContentLoaded', async () => {
    const tabContents = document.querySelectorAll('.tab-content');
    const tabButtons = document.querySelectorAll('.tab-button');

    // Find the about tab content to get the README path
    const aboutContent = document.querySelector('#about');
    if (aboutContent) {
        const readmePath = aboutContent.getAttribute('data-markdown');
        await loadTitle(readmePath);
    }

    // Load content for each tab
    const contentPromises = Array.from(tabContents).map(content => {
        const path = content.getAttribute('data-markdown');
        if (!path) {
            return Promise.resolve();
        }
        if (content.id === 'about') {
            return loadContentWithoutFirstLine(path, content.id);
        } else {
            return loadFullContent(path, content.id);
        }
    });

    // Wait for all content to load before initializing tabs
    await Promise.all(contentPromises);
    await initializeTabs();

    // Handle tab switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        const urlParams = new URLSearchParams(window.location.search);
        const currentTab = urlParams.get('tab') || 'context';
        switchTab(currentTab);
    });

//     for (let index = 0; index < document.querySelectorAll('.open-issue-marker').length; index++) {
//     const element = document.querySelectorAll('.open-issue-marker')[index];
//     element.addEventListener("mouseover", () => {
//       console.log(document.getElementById(element.getAttribute('hovertext')));
//     }

//     )
// }
});
