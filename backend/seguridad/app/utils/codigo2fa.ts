export function generarCodigo2FA(): string {
  return Math.floor(100000 + Math.random() * 900000).toString() // código de 6 dígitos
}
