const axios = require('axios');

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';

const obtenerRespuesta = async (mensaje) => {
  let respuesta = '';

  const response = await axios.post(`${OLLAMA_URL}/api/chat`, {
    model: 'gemma:2b',
    messages: [
      { role: 'system', content: 'Eres un asistente que guía al usuario en la compra y uso de la plataforma.' },
      { role: 'user', content: mensaje }
    ]
  }, { responseType: 'stream' });

  for await (const chunk of response.data) {
    const lines = chunk.toString().split('\n').filter(Boolean);
    for (const line of lines) {
      try {
        const data = JSON.parse(line);
        if (data.message && data.message.content) {
          respuesta += data.message.content;
        }
      } catch (e) {
        console.error('Error parsing chunk:', e);
      }
    }
  }

  return respuesta.trim();
};

module.exports = { obtenerRespuesta };