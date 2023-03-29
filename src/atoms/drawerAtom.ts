import { atom } from "jotai";

export const drawerAtom = atom({
  isOpen: false,
  itemSelected: 0,
});
