// Test file to check dynamic imports
async function testImport() {
  try {
    console.log('Testing dynamic import...');
    const module = await import('./src/data/posts/writing/europe-journey.md?raw');
    console.log('Import successful!');
    console.log('Content preview:', module.default.substring(0, 200));
  } catch (error) {
    console.error('Import failed:', error);
  }
}

testImport();
