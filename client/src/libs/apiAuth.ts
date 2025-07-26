import api from "./axios";

export async function login(data: Login) {
  const res = await api.post(`/signin`, data);
  return res.data;
}

export async function signup(data: Login) {
  const res = await api.post(`/signup`, data);
  return res.data;
}

export async function currentUser() {
  const res = await api.get(`/current-user`);
  return res.data;
}
