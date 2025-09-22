export type ChatRole = "user" | "assistant"

export interface ChatHistoryItem {
  role: ChatRole
  content: string
}

export interface ChatRequestBody {
  query: string
  buyer_id: string
  chat_history: ChatHistoryItem[]
}

export interface ChatImageVariation {
  image_url: string
  s3_key: string
  style: string
  variation: number
}

export interface ChatImageGenerationPrompt {
  variation: number
  design_concept: string
  full_prompt: string
  furniture_type: string
  style: string
}

export interface ChatResponseBody {
  intent: string
  text_response: string
  image_data: string | null
  image_variations: ChatImageVariation[]
  sources: unknown[]
  search_terms: string | null
  image_generation_prompts: ChatImageGenerationPrompt[]
}
