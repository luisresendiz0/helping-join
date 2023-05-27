interface Voluntario {
  id_voluntario: number;
  nombre: string;
  edad: string;
  email: string;
  calle: string;
  numero_exterior: string;
  numero_interior: string;
  colonia: string;
  alcaldia: string;
  codigo_postsl: string;
  entidad: string;
  imagen: string;
  contrasena: string;
  verificado: 1 | 0;
}

export interface VoluntarioWithCategories extends Voluntario {
  categorias: number[];
}

export default Voluntario;
