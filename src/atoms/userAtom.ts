import { atom } from "jotai";
import Voluntario from "../types/Voluntario";
import Beneficiado from "../types/Beneficiado";

const userAtom = atom<Voluntario | Beneficiado | null>(null);

export default userAtom;