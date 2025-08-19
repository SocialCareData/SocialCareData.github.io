// Observe the #specification tab for changes and re-apply hierarchy enhancement
document.addEventListener("DOMContentLoaded", () => {
  const specTab = document.getElementById('specification');
  if (specTab) {
    const observer = new MutationObserver(() => {
  enhanceTableHierarchy();
    });
    observer.observe(specTab, { childList: true, subtree: true });
  }
});
// Imports
import mermaid from 'https:///cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs'

// Function to fetch and render a full Markdown file
async function loadMarkdown_full(filePath, elementId) {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const text = await response.text();
      document.getElementById(elementId).innerHTML = marked.parse(text);
      // Wait for DOM update before resolving
      await new Promise(resolve => setTimeout(resolve, 0));
    } catch (error) {
      console.error(`Error loading ${filePath}:`, error);
      document.getElementById(elementId).innerHTML = "<p>Sorry, the content couldn't be loaded.</p>";
    }
  }

// Function to fetch and render a pruned Markdown file
async function loadMarkdown_pruned(filePath, elementId) {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const text = await response.text();

      const lines = text.split('\n');
      let prunedText = [];
      for (let index = 1; index < lines.length-1; index++) {
        const currentLine = lines[index];
        prunedText.push(currentLine.trim())
      }

      document.getElementById(elementId).innerHTML = marked.parse(prunedText.join('\n'));
    } catch (error) {
      console.error(`Error loading ${filePath}:`, error);
      document.getElementById(elementId).innerHTML = "<p>Sorry, the content couldn't be loaded.</p>";
    }
  }

// Load content on compile
document.addEventListener("DOMContentLoaded", () => {
  // Markdown

  // Use [data-markdown] to target all Markdown containers (footer, tabs, etc)
  const mdContainers = document.querySelectorAll('[data-markdown]');
  mdContainers.forEach((mdEl) => {
    const markdownFile = mdEl.getAttribute('data-markdown');
    // If the path is relative, load from /content, else use as is
    const isExternal = markdownFile.startsWith('http');
    const filePath = isExternal ? markdownFile : `/content/${markdownFile}`;
    loadMarkdown_full(filePath, mdEl.id).then(() => {
    enhanceTableHierarchy();
    });
  });

  // Mermaid diagrams - load markdown into element
  const mermaidsExternal = document.querySelectorAll('.mermaid');
  mermaidsExternal.forEach((mermaidElement) => {
    const markdownFile = `${mermaidElement.getAttribute('data-markdown')}`;
    loadMarkdown_pruned(markdownFile, mermaidElement.id);
  });
  // Mermaid diagrams - initialise
  mermaid.initialize({ logLevel: 0 });
});

// // Observe for table changes and apply hierarchy styling
// function observeTableHierarchy(containerId) {
//   const container = document.getElementById(containerId);
//   if (!container) {
//     console.log('observeTableHierarchy: container not found for', containerId);
//     return;
//   }
//   const observer = new MutationObserver((mutationsList) => {
//     console.log('MutationObserver triggered for', containerId, mutationsList);
//     enhanceTableHierarchy(containerId);
//   });
//   observer.observe(container, { childList: true, subtree: true });
//   console.log('observeTableHierarchy: observer set for', containerId);
// }

// Enhance table hierarchy by styling rows/cells with hierarchy arrows
function enhanceTableHierarchy() {
  const container = document.getElementById('specification');
  if (!container) return;
  const tables = container.querySelectorAll('table');
  tables.forEach(table => {
    for (const row of table.rows) {
      const firstCell = row.cells[0];
      if (!firstCell) continue;
      if (firstCell.textContent.includes('↳ ')) {
        if (firstCell.firstChild && firstCell.firstChild.nodeType === Node.TEXT_NODE) {
          firstCell.firstChild.textContent = firstCell.firstChild.textContent.replace('↳ ', '↳');
        } else {
          firstCell.innerHTML = firstCell.innerHTML.replace('↳ ', '↳');
        }
        row.classList.add('hierarchy-child');
        firstCell.classList.add('hierarchy-arrow-cell');
        firstCell.insertAdjacentHTML('afterbegin', '<span class="hierarchy-indent"></span>');
      } else if (!firstCell.textContent.includes('↳')) {
        row.classList.add('hierarchy-parent');
        firstCell.classList.add('hierarchy-parent-cell');
      }
    }
  });
}