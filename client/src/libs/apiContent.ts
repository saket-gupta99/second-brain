import api from "./axios";

export const getContent = async () => {
  const res = await api.get(`/content`);
  return res.data;
};

export const createContent = async (data: FormContent) => {
  const res = await api.post(`/content`, data);
  return res.data;
};

export const deleteContent = async (data: { contentId: string }) => {
  const res = await api.delete(`/content`, { data });
  return res.data;
};

export const shareLink = async (data: { share: boolean }) => {
  const res = await api.post("/brain/share", data);
  return res.data;
};

export const showLinkToVisitors = async (shareLink: string) => {
  console.log(shareLink)
  const res = await api.get(`/brain/${shareLink}`);
  return res.data;
};
