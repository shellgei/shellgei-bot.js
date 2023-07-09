import {MISS_KEY_CREATE_NOTE_API_KEY, MISS_KEY_HOST, MISS_KEY_REACTION_API_KEY} from '../../../env';

const missKeyBaseUrl = new URL(`https://${MISS_KEY_HOST}`)

const method = 'POST';
const headers = new Headers();
headers.append('Content-Type', 'application/json');

const fetchApi = (pathName: string, apiKey: string) => {
  const apiUrl = new URL(pathName, missKeyBaseUrl);
  return async (body: any) => {
    const res = await fetch(apiUrl, {
      method,
      headers,
      body: JSON.stringify({...body, i: apiKey}),
    })
    return await res.text();
  };
}

const fetchMissKeyApi = {
  createNote: fetchApi('/api/notes/create', MISS_KEY_CREATE_NOTE_API_KEY),
  addReaction: fetchApi('/api/notes/reactions/create', MISS_KEY_REACTION_API_KEY),
}

export default fetchMissKeyApi