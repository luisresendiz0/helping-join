import { User } from "firebase/auth";
import { atom } from "jotai";

const userAtom = atom<User | null>(null);

export default userAtom;