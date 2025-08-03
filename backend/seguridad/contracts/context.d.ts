// contracts/context.ts
import type { HttpContext } from '@adonisjs/core/http'
import type Usuario from '#models/usuario'

// Extensión del módulo solo para tipos
declare module '@adonisjs/core/http' {
  interface HttpContext {
    authUser?: Usuario
  }
}
