import { atom } from 'jotai';

export const selectCategoryAtom = atom<string[]>([]);

export const cartAtom = atom(new Map([]));
