import path from 'node:path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });
import { app } from './app';

const port = Number(process.env.PORT || process.env.API_PORT || 4000);
app.listen(port, '0.0.0.0', () => console.log(`aldott.de API listening on port ${port}`));
