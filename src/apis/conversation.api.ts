import { SuccessResponse } from '../types/utils.type';
import http from '../util/http';

const URL = 'Conversations';

const converApi = {
  getConvers() {
    return http.get<SuccessResponse<Conver[]>>(URL);
  },
  getConverDetail(id: string) {
    return http.get<SuccessResponse<Conver>>(`${URL}/${id}`);
  },
};

export interface Conver {
  user1: string;
  user1Info: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
  user2: string;
  user2Info: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
  createAt: string;
  messages: Message[];
  id: string;
  status: number;
  isDeleted: boolean;
  lastUpdateDate: any;
}

export interface Message {
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string;
  id: string;
  status: number;
  isDeleted: boolean;
  lastUpdateDate: any;
}

export default converApi;
