export function getWsUrl() {
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;
  const userToken = process.env.EXPO_PUBLIC_USER_TOKEN;

  if (!apiUrl) {
    throw new Error('EXPO_PUBLIC_API_URL is not set');
  }

  if (!userToken) {
    throw new Error('EXPO_PUBLIC_USER_TOKEN is not set');
  }

  const url = new URL(apiUrl);

  url.protocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
  url.pathname = `${url.pathname.replace(/\/$/, '')}/ws`;
  url.searchParams.set('token', userToken);

  return url.toString();
}