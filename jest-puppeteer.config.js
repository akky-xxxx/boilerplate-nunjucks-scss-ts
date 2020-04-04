module.exports = {
  server: {
    command: 'BROWSER=none yarn start',
    port: 3000,
    launchTimeout: 30000,
  },
  launch: {
    headless: true,
    devtools: false,
  },
}
