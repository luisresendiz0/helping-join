interface Beneficiado {
  alcaldia: string;
  calle: string;
  codigo_postal: string;
  colonia: string;
  contrasena: string;
  descripcion: string;
  email: string;
  entidad: string;
  evento_eliminados: number;
  id_beneficiado: number;
  imagen: string;
  nombre: string;
  numero_exterior: string;
  numero_interior: string;
  responsable: string;
  telefono: string;
  tipo: string;
}

export interface BeneficiadoWithCategories extends Beneficiado {
  categorias: number[];
}

export default Beneficiado;
