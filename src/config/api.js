const hostDev = 'http://122.155.201.109:3001/api'
const hostProduction = 'http://122.155.201.109:3001/api'
export const hostName = 'https://cms.vingtv.com'
const production = process.env.NODE_ENV === 'production';
const api = {
  host: production ? hostProduction : hostDev
}

export default api
