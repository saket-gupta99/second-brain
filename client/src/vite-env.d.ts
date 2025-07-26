/// <reference types="vite/client" />

interface Login {
  username: string;
  password: string;
}

interface Signup {
  username: string;
  password: string;
}

interface Content {
  _id?: string;
  type: "tweet" | "document" | "video" | "tags" | "article";
  linkUrl?: string;
  title: string;
  content?: string;
  tags?: { _id: string; title: string }[];
  createdAt?: Date;
}

type FormContent = Pick<Content, "type" | "title" | "linkUrl" | "content"> & {
  tags?: string[];
};

interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

interface ApiError {
  statusCode?: number;
  message: string;
  success: boolean;
  data: null;
  errors: string[];
}

type Filter = "all" | "tweet" | "document" | "article" | "videos";
