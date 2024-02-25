import PocketBase from 'pocketbase';
export const BASE_URL = 'http://127.0.0.1:8090';
const client = new PocketBase(BASE_URL);
export default client;
