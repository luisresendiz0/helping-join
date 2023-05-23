interface EventoReporte {
  id_reporte: number;
  id_evento: number;
  id_voluntario: number;
  descripcion: string;
  fecha: string;
  estatus: string;
  voluntario_nombre: string;
  voluntario_imagen: string;
}

export default EventoReporte;
