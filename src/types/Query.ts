export interface Query {
  text: string, // texto a buscar
  type: 'evento' | 'organizacion' | 'civil', // eventos, organizaciones, civiles independientes
  categoryId: number, // categoria de evento u organizacion
  fecha_inicio: string, // fecha de inicio de evento
  fecha_fin: string, // fecha de fin de evento
  entidad: string, // estado de evento u organizacion
  alcaldia: string, // ciudad de evento u organizacion
}