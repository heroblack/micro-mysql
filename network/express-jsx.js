const fs = require("fs");
function expressJsx(filePath, options, callback) {
  console.log(filePath);
  console.log(options);
  fs.readFile(filePath, function(err, content) {
    if (err) return callback(err);
    const rendered = getRenderedContent(content, options);
    return callback(null, rendered);
  });
}

function getRenderedContent(content, options) {
  const keys = getKeysFromOptions(options);
  let contentString = content.toString();
  for (let key of keys) {
    contentString = contentString.replace(
      new RegExp(`\{${key}\}`, "gi"),
      options[key]
    );
  }
  return contentString;
}

function getKeysFromOptions(options) {
  console.log("gordillo:", options);
  const { setting, _locals, ...objectKeys } = options;
  return Object.keys(objectKeys);
}

module.exports = expressJsx;
