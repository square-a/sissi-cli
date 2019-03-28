const path = require('path');
const fs = require('fs');

module.exports = {
  validateNotEmpty(input) {
    return input.trim() !== '' ? true : 'It mustn\'t be empty!';
  },
  validateEmptyDir(dirName) {
    const destDir = path.join(process.cwd(), dirName);

    if (fs.existsSync(destDir)) {
      if (fs.readdirSync(destDir).length) {
        return `There is already a (non-empty) directory "${dirName}". I don't dare overriding it!`;
      }
    }
    return true;
  },
};
