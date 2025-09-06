export async function loadMarkdownContent(path: string): Promise<string> {
  try {
    const response = await fetch(path);
    const text = await response.text();
    return text;
  } catch (error) {
    return '# Error loading content\n\nContent could not be loaded.';
  }
}