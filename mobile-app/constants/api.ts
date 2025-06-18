import Constants from 'expo-constants';

const hostUri = Constants.expoConfig?.hostUri || '';
const host = hostUri.split(':')[0];

if (host === '') console.warn('Host URI is not defined. Please check your Expo configuration.')
else console.log('Host URI:', host);

export const API_URL = `http://${host}:5043`;