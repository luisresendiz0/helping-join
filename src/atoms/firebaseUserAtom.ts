import { User } from "firebase/auth";
import { atom } from "jotai";

const firebaseUserAtom = atom<User | null>(null);

export default firebaseUserAtom;
