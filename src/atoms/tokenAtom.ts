import { atom } from "jotai";

const tokenAtom = atom<string | null>(null);

export default tokenAtom;