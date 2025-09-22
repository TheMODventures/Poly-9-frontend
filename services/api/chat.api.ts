import axiosService from "../middleware/axios.middleware"
import type { ApiResponse } from "../interface"
import type { ChatRequestBody, ChatResponseBody } from "../interface/chat/chat.interface"

const CHAT_ENDPOINTS = {
  chat: "/v1/documents/chat",
} as const

class ChatApiService {
  async createChatCompletion(body: ChatRequestBody): Promise<ApiResponse<ChatResponseBody>> {
    const response = await axiosService.post<ChatResponseBody>(CHAT_ENDPOINTS.chat, body)
    return response
  }
}

export const chatService = new ChatApiService()
