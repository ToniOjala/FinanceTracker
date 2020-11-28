import axios from 'axios';

export async function get<T>(url: string): Promise<T> {
  const { data } = await axios.get(url);
  return data;
}