// Imports
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs'

// Function to fetch and render a full Markdown file
async function loadMarkdown_full(filePath, elementId) {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const text = await response.text();
      document.getElementById(elementId).innerHTML = marked.parse(text);
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
  const mdTexts = document.querySelectorAll('.markdown-content');
  mdTexts.forEach((mdText) => {
    const markdownFile = `/content/${mdText.getAttribute('data-markdown')}`;
    loadMarkdown_full(markdownFile, mdText.id);
  });

  const mdTextsExternal = document.querySelectorAll('.markdown-content-external');
  mdTextsExternal.forEach((mdText) => {
    const markdownFile = `${mdText.getAttribute('data-markdown')}`;
    loadMarkdown_full(markdownFile, mdText.id);
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
