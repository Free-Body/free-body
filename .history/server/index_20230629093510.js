const PORT = process.env.PORT || 3000;
const express = require('express');
const app = require('../my-app/src/app/App');

const init = async () => {
  app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
};

init();
module.exports = app;
