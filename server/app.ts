import express from 'express';
import { join } from 'path';
import Config from './utils/config';
import ApiRouter from './api/routes/apiRouter';
import InitializeDatabase from './database/initializeDatabase';

const app = express();
const build = join(__dirname, '../build');
const index = join(build, 'index.html');

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.static(build, { index: false, etag: false }));

InitializeDatabase();

app.use('/api', ApiRouter);

// Serve index on all requests to server.
app.get('*', (request: express.Request, response: express.Response) => {
    response.sendFile(index);
});

app.listen(Config.port, () => console.log(`Server listening on port ${Config.port}`));
