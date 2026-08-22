const { execSync } = require('child_process');

function runAppleScript(script) {
  const cleanScript = script.replace(/'/g, "'\\''");
  return execSync(`osascript -e '${cleanScript}'`, { encoding: 'utf-8' });
}

function executeChromeJS(jsCode) {
  const wrapped = `tell application "Google Chrome" to execute front window's active tab javascript "${jsCode.replace(/"/g, '\\"')}"`;
  return runAppleScript(wrapped);
}

try {
  const title = executeChromeJS('document.title');
  console.log('SUCCESS: JS execution enabled. Tab title:', title);
} catch (e) {
  console.error('BLOCKED: Please enable JavaScript from Apple Events in Chrome.');
}
