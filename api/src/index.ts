import mongoose from 'mongoose';

import 'dotenv/config';

import './bot';
console.log('[✅API][1/3] Bot launched...');
import './backend';
console.log('[✅API][2/3] Backend launched...');

mongoose.connect(`mongodb://${process.env.NODE_ENV === 'production' ? 'mongo' : '127.0.0.1'}/${require('../package.json').name}`);
mongoose.connection.on('connected', () => console.log('[✅DB][3/3] Cluster connected!'));
