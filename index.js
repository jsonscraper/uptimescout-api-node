export class UptimeScoutError extends Error {constructor(status,payload){super(`UptimeScout request failed (HTTP ${status})`);this.status=status;this.payload=payload}}
export class Client {
 constructor(licenseKey,{baseUrl='https://api.uptimescout.com',timeout=30000}={}){if(!licenseKey||/[\r\n]/.test(licenseKey))throw new Error('A license key is required');this.key=licenseKey;this.baseUrl=baseUrl.replace(/\/$/,'');this.timeout=timeout}
 async request(method,params={}){if(!['services','status','statuses','summary','history','stats','incidents'].includes(method))throw new Error('Unknown method');const url=new URL(this.baseUrl+'/v1/'+method);for(const[k,v]of Object.entries(params))if(v!==undefined&&v!==null)url.searchParams.set(k,Array.isArray(v)?v.join(','):String(v));const response=await fetch(url,{headers:{Authorization:'Bearer '+this.key,Accept:'application/json'},signal:AbortSignal.timeout(this.timeout),redirect:'error'});const data=await response.json();if(!response.ok||data.status==='fail')throw new UptimeScoutError(response.status,data);return data}
 services(params={}){return this.request('services',params)}
 status(service,params={}){return this.request('status',{...params,service})}
 statuses(services,params={}){return this.request('statuses',{...params,services})}
 summary(params={}){return this.request('summary',params)}
 history(service,params={}){return this.request('history',{...params,service})}
 stats(service,params={}){return this.request('stats',{...params,service})}
 incidents(params={}){return this.request('incidents',params)}
}
export default Client;
