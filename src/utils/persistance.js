export const loadSnippets = () => {
  try {
    const serializedState = localStorage.getItem('snippets');
    if (serializedState === null) return [];
    return JSON.parse(serializedState);
  } catch (err) {
    console.warn('Could not load snippets from localStorage', err);
    return [];
  }
};

export const saveSnippets = (snippets) => {
  try {
    const serializedState = JSON.stringify(snippets);
    localStorage.setItem('snippets', serializedState);
  } catch (err) {
    console.warn('Could not save snippets to localStorage', err);
  }
};