const OpenAIService = require("../services/chatbot.service");
const ConversacionesRepository = require("../repositories/chatbot.repository");

const conversar = async (req, res) => {
  try {
    const { usuario_id, mensaje } = req.body;
    if (!usuario_id || !mensaje) {
      return res
        .status(400)
        .json({ mensaje: "usuario_id y mensaje son requeridos." });
    }

    // Obtener respuesta del chatbot (OpenAI)
    const respuesta = await OpenAIService.obtenerRespuesta(mensaje);

    // Guardar la conversación en la base de datos
    await ConversacionesRepository.guardarConversacion({
      usuario_id,
      mensaje_usuario: mensaje,
      respuesta_bot: respuesta,
    });

    res.json({ respuesta });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

module.exports = { conversar };
