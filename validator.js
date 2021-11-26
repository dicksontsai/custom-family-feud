var fs = require("fs");

function readFiles(dirname, onFileContent) {
  const filenames = fs.readdirSync(dirname);
  filenames.forEach(function(filename) {
    if (!filename.endsWith("json") || filename === "template.json") {
      return;
    }
    fs.readFile(dirname + filename, "utf-8", function(err, content) {
      if (err) {
        throw new Error(err);
      }
      onFileContent(filename, content);
    });
  });
}

function check(game) {
  if (game.surveys.length !== 4) {
    throw new Error("There must be 4 surveys");
  }
  game.surveys.forEach(survey => {
    if ([1, 2, 3].indexOf(survey.multiple) < 0) {
      throw new Error("Multiple must be 1, 2, or 3");
    }
    if (typeof survey.question !== "string") {
      throw new Error("Question is not a string");
    }
    sum = survey.responses.map(r => r.value).reduce((a, b) => a + b, 0);
    if (sum > 100) {
      throw new Error(
        `Sum of the responses cannot be greater than 100: ${survey.question}`
      );
    }
    survey.responses.forEach(r => {
      if (typeof r.response !== "string") {
        throw new Error("Response is not a string");
      }
      if (r.response.toUpperCase() !== r.response) {
        throw new Error(`Response must be in all upper case: ${r.response}`);
      }
    });
  });
}

readFiles("./", function(filename, content) {
  console.log("Testing file " + filename);
  const game = JSON.parse(content);
  check(game);
});
