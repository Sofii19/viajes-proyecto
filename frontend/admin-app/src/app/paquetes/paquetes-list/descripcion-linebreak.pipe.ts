import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descripcionLinebreak'
})
export class DescripcionLinebreakPipe implements PipeTransform {
  transform(value: string, palabrasPorLinea: number = 4): string {
    if (!value) return '';
    const palabras = value.split(' ');
    let resultado = '';
    for (let i = 0; i < palabras.length; i++) {
      resultado += palabras[i] + ' ';
      if ((i + 1) % palabrasPorLinea === 0) {
        resultado += '<br>';
      }
    }
    return resultado.trim();
  }
}
