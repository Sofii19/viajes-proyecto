import vine from '@vinejs/vine'

export const codigo2faValidator = vine.compile(
  vine.object({
    usuario_id: vine.number().positive(),
    codigo: vine.string().minLength(6).maxLength(6).regex(/^\d{6}$/),
  })
)
