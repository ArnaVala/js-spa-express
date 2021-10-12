// create server for SPA app
const express = require("express");
const path = require("path");

const app = express();

// use middleware to serve the static dir - whenever a file has static/
app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")))

// Send all paths ('/*') - all paths are sent back to the index.html -
// the paths are still /settings - /posts etc.
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

// Start server - run 'node server.js' in terminal
app.listen(process.env.PORT || 8000, () => console.log('Server running...'));