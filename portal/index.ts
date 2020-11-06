function main() {
  const app = require('./app').default;

  // app.listen(process.env.PORT || 8000);
  app.listen(8080);

  console.log('listening on port 8080');
}

main();
