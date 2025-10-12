import { atom } from 'jotai';
import {Product} from "@/app/components/types";

export const selectCategoryAtom = atom<string[]>([]);

export const cartAtom = atom<Map<number, Partial<Product>>>(new Map());;
