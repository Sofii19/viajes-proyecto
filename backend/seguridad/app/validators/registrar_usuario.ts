import vine from '@vinejs/vine'

export const registroUsuarioValidator = vine.compile(
  vine.object({
    primerNombre: vine.string().minLength(2).maxLength(100),
    segundoNombre: vine.string().maxLength(100).optional().nullable(),
    apellidoPaterno: vine.string().minLength(2).maxLength(100),
    apellidoMaterno: vine.string().maxLength(100).optional().nullable(),
    email: vine.string().email(),
    password: vine.string().minLength(6),
    rol: vine.enum(['cliente', 'administrador']).optional(),
    activo: vine.boolean().optional(), // Opcional
  })
)
