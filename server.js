// create server for SPA app
const express = require("express");
const path = require("path");

const app = express();

// Send all paths ('/*') - all paths are sent back to the index.html -
// the paths are still /settings - /posts etc.
app.get("/*", (req, res) => {
  res.sendFile(path.resolve("frontend", "index.html"));
});

// Start server - run 'node server.js' in terminal
app.listen(process.env.PORT || 8000, () => console.log('Server running...'));