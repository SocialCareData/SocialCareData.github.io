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

// Function to fetch and render a html file
async function loadHTML_full(filePath, elementId) {
    try {
      fetch(filePath)
            .then(response => response.text())
            .then(data => document.getElementById(elementId).innerHTML = data);
    } catch (error) {
      console.error(`Error loading ${filePath}:`, error);
      document.getElementById(elementId).innerHTML = "<p>Sorry, the content couldn't be loaded.</p>";
    }
  }

// Function to fetch and render a JSON specification
async function loadJSON_spec(filePath, elementId) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const spec = await response.json();
        
        let html = '';

        // Iterate through entities
        if (spec.entities) {
            spec.entities.forEach(entity => {
                html += `<h3>${entity.name}</h3>`;
                if (entity.description) {
                    html += `<p>${entity.description}</p>`;
                }
                
                html += `<table>
                    <thead>
                        <tr>
                            <th>Field name</th>
                            <th>Cardinality</th>
                            <th>Data Type</th>
                            <th>Description</th>
                            <th>Alignment</th>
                        </tr>
                    </thead>
                    <tbody>`;
                
                if (entity.fields) {
                    entity.fields.forEach(field => {
                        html += renderFieldRow(field, entity.name);
                    });
                }
                
                html += `</tbody></table>`;
            });
        }

        document.getElementById(elementId).innerHTML = html;
        // Re-run hierarchy enhancement if needed, though this new renderer handles it semantically
        enhanceTableHierarchy();

    } catch (error) {
        console.error(`Error loading JSON spec ${filePath}:`, error);
        document.getElementById(elementId).innerHTML = "<p>Sorry, the specification couldn't be loaded.</p>";
    }
}

function renderFieldRow(field, parentName, level = 0) {
    let html = '';
    const indent = level > 0 ? `<span class="hierarchy-indent" style="margin-left: ${level * 1.5}em;">↳ </span>` : '';
    const fieldName = `${indent}<code>${parentName}.${field.name}</code>`;
    
    // Format alignment
    let alignment = '';
    if (field.alignment) {
        if (field.alignment.fhir) alignment += `<div><strong>FHIR:</strong> ${field.alignment.fhir}</div>`;
        if (field.alignment.pds) alignment += `<div><strong>PDS:</strong> ${field.alignment.pds}</div>`;
    }

    // Format type with potential vocabulary link
    let typeDisplay = field.type;
    if (field.vocabulary) {
        // Links disabled for now until resources are ready
        // typeDisplay += ` (<a href="${field.vocabulary.url}" target="_blank">${field.vocabulary.name}</a>)`;
        typeDisplay += ` (${field.vocabulary.name})`;
    }
    if (field.reference) {
        // Links disabled for now
        // typeDisplay += ` -> <a href="${field.reference}" target="_blank">Reference</a>`;
        typeDisplay += ` -> Reference`;
    }

    html += `<tr>
        <td>${fieldName}</td>
        <td>${field.cardinality}</td>
        <td>${typeDisplay}</td>
        <td>${field.description || ''}</td>
        <td>${alignment}</td>
    </tr>`;

    if (field.children) {
        field.children.forEach(child => {
            html += renderFieldRow(child, `${parentName}.${field.name}`, level + 1);
        });
    }

    return html;
}

// Load content on compile
document.addEventListener("DOMContentLoaded", () => {
  // Markdown

  // Use [data-markdown] to target all Markdown containers (footer, tabs, etc)
  const mdContainers = document.querySelectorAll('[data-markdown]');
  mdContainers.forEach((mdEl) => {
    const markdownFile = mdEl.getAttribute('data-markdown');
    // If the path is relative, load from /content, else use as is
    const isExternal = markdownFile.startsWith('http') || markdownFile.startsWith('/');
    const filePath = isExternal ? markdownFile : `/content/${markdownFile}`;
    loadMarkdown_full(filePath, mdEl.id).then(() => {
    enhanceTableHierarchy();
    });
  });

  // Use [data-html] to target all html-importing containers
  const htmlContainers = document.querySelectorAll('[data-html]');
  htmlContainers.forEach((htmlEl) => {
    const htmlFile = htmlEl.getAttribute('data-html');
    // If the path is relative, load from /content, else use as is
    const isExternal = htmlFile.startsWith('http');
    const filePath = isExternal ? htmlFile : `${htmlFile}`;
    loadHTML_full(filePath, htmlEl.id).then(() => {
    enhanceTableHierarchy();
    });
  });

  // Use [data-json] to target JSON specification containers
  const jsonContainers = document.querySelectorAll('[data-json]');
  jsonContainers.forEach((jsonEl) => {
      const jsonFile = jsonEl.getAttribute('data-json');
      loadJSON_spec(jsonFile, jsonEl.id);
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