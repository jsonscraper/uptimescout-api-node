import { parseArgs } from 'node:util';
import { Client, UptimeScoutError } from '../../index.js';

const { values } = parseArgs({ options: {
  "service": {
    "type": "string",
    "default": "github"
  },
  "region": {
    "type": "string",
    "default": "GB"
  },
  "lang": {
    "type": "string",
    "default": "en"
  },
  "help": {
    "type": "boolean",
    "default": false
  }
} });
if (values.help) {
  console.log("Read one regional signal\nUsage: node examples/endpoints/status.mjs --region GB --lang en\nOptions: --service, --region, --lang");
} else {
  if (!process.env.UPTIMESCOUT_LICENSE_KEY) {
    console.error('Set UPTIMESCOUT_LICENSE_KEY in your environment');
    process.exitCode = 1;
  } else {
    try {
      const client = new Client(process.env.UPTIMESCOUT_LICENSE_KEY, {
        baseUrl: process.env.UPTIMESCOUT_BASE_URL || 'https://api.uptimescout.com',
        timeout: 30000,
      });
      const { help, ...parameters } = values;
      const response = await client.request("status", parameters);
      console.log(JSON.stringify(response, null, 2));
    } catch (error) {
      console.error(error instanceof UptimeScoutError
        ? `UptimeScout HTTP ${error.status}; check your key, plan and parameters.`
        : 'Connection, timeout or response error; check the endpoint and network.');
      process.exitCode = 1;
    }
  }
}
