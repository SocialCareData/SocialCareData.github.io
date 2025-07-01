// Function to fetch and render a Markdown file
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

// Load markdown content on compile
document.addEventListener("DOMContentLoaded", () => {
  const mdTexts = document.querySelectorAll('.markdown-content');
  mdTexts.forEach((mdText) => {
    const markdownFile = `../../content/${mdText.getAttribute('data-markdown')}`;
    loadMarkdown_full(markdownFile, mdText.id);
  });

  const mdTextsExternal = document.querySelectorAll('.markdown-content-external');
  mdTextsExternal.forEach((mdText) => {
    const markdownFile = `${mdText.getAttribute('data-markdown')}`;
    loadMarkdown_full(markdownFile, mdText.id);
  });

  
});