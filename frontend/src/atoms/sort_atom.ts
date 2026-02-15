import { atom } from "jotai";

// sorting atom
export const sortAtom = atom<"lastUpdateTime" | "creationTime">("lastUpdateTime");
