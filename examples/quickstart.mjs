import { Client } from '../index.js';
const client=new Client(process.env.UPTIMESCOUT_LICENSE_KEY);
console.log(await client.status('github'));
console.log(await client.statuses(['github','telegram']));
