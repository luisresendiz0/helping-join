interface Evento {
  id_evento: number;
  id_beneficiado: number;
  nombre: string;
  descripcion: string;
  fecha_inicio: string;
  fecha_fin: string;
  calle: string;
  numero_exterior: string;
  numero_interior: string;
  colonia: string;
  alcaldia: string;
  codigo_postal: string;
  entidad: string;
  imagen: string;
  interesados: number;
  interesado: any;
  reportado: any;
}

export interface EventoWithCategories extends Evento {
  categorias: number[];
}

export default Evento;
