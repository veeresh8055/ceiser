
import api from '../../utils/axios'

async function sendMessage(payload) {
 try {
    const {data}=await api.post("/api/agent/chat",payload)
    return data
 } catch (error) {
    console.error('AI request failed:', error.response?.data || error.message)
    return {
      error: true,
      message: error.response?.data?.message || 'The AI service is temporarily unavailable.'
    }
 }
}

export default sendMessage
