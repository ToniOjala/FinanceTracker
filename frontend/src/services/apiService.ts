import axios from 'axios';

export async function get<T>(url: string): Promise<T> {
  const { data } = await axios.get(url);
  return data;
}

export async function post<T>(url: string, item: T): Promise<T> {
  const { data } = await axios.post(url, item);
  return data;
}

export async function put<T>(url: string, item: T): Promise<T> {
  const { data } = await axios.put(url, item);
  return data;
}