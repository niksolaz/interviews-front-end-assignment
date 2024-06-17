import axios from 'axios';

const API_BASE_URL = "http://localhost:8080"  // qui si potrebbe settare un env variable

async function get(url: String): Promise<any> {
  const response = await axios.get(`${API_BASE_URL}${url}`);
  console.log('get', response)
  return response.data;
}

async function post(url: String, data: any): Promise<any> {
  const response = await axios.post(`${API_BASE_URL}${url}`, data);
  return response.data;
}

async function put(url: String, data: any): Promise<any> {
  const response = await axios.put(`${API_BASE_URL}${url}`, data);
  return response.data;
}

async function remove(url: String): Promise<any> {
  const response = await axios.delete(`${API_BASE_URL}${url}`);
  return response.data;
}

export { get, post, put, remove };
