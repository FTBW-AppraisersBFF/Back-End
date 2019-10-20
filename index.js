const port = process.env.PORT || 4400;
const server = require('./api/server');

server.listen(port, () => console.log(`\n server running on port ${port}`));