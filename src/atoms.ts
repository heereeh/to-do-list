import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface IToDo {
  content: string;
  category: string;
  id: number;
}

export interface ICategory {
  label: string;
  id: number;
}

const { persistAtom } = recoilPersist({
  key: "toDoLocal",
  storage: localStorage,
});

export const categoriesState = atom<string[]>({
  key: "categories",
  default: ["TO DO", "DOING", "DONE"],
  effects_UNSTABLE: [persistAtom],
});

export const categoryState = atom<string>({
  key: "category",
  default: "TO DO",
});

export const toDosState = atom<IToDo[]>({
  key: "toDos",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDosState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
