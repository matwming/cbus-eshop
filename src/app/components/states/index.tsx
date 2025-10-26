import { atom } from "jotai";
import type { CartItem, Category } from "@/app/components/types";

export const selectCategoryAtom = atom<Category[]>([]);

export const cartAtom = atom<Map<number, CartItem>>(new Map());
