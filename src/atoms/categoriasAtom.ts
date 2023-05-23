import { atom } from "jotai";

type Categoria = {
  id_categoria: number;
  nombre: string;
};

const categoriasAtom = atom<Array<Categoria>>([]);

export default categoriasAtom;
