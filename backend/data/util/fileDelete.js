const fs = require("fs");
const vm = require('vm');
const path = require('path');

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) {
      throw new Error("dsadhas");
    }
  });
};

/**
 * Reads and executes the html2canvas.js file in Node.js context.
 */
function runHtml2CanvasScript() {
  const scriptPath = path.resolve(__dirname, '../../../public/js/html2canvas.js');
  const code = fs.readFileSync(scriptPath, 'utf-8');
  vm.runInThisContext(code, { filename: 'html2canvas.js' });
}

exports.fileDelete = deleteFile;
exports.runHtml2CanvasScript = runHtml2CanvasScript;