import path from 'path';
import fs from 'fs';

export function validateNotEmpty(input) {
  return input.trim() !== '' ? true : 'It mustn\'t be empty!';
}

export function validateEmptyDir(dirName) {
  const destDir = path.join(process.cwd(), dirName);

  if (fs.existsSync(destDir)) {
    if (fs.readdirSync(destDir).length) {
      return `There is already a (non-empty) directory "${dirName}". I don't dare overriding it!`;
    }
  }
  return true;
}
