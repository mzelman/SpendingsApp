const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('dist/spendings-app-angular'));

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
