import { useRecoilState, useRecoilValue } from "recoil";
import { categoriesState, categoryState, toDoSelector } from "./atoms";
import Create from "./components/Create";
import ToDo from "./components/ToDo";
import Category from "./components/Category";
import { useState } from "react";

function App() {
  const toDos = useRecoilValue(toDoSelector);
  const categories = useRecoilValue(categoriesState);
  const [category, setCategory] = useRecoilState(categoryState);
  const [isToDo, setIsToDo] = useState(true);
  const toggle = () => setIsToDo((prev) => !prev);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as string);
  };
  return (
    <>
      <div className="p-8 font-mono bg-slate-200 h-lvh">
        <h1 className="text-xl font-bold mb-3">
          {isToDo ? "To Do" : "Category"} List
          <button
            className="ml-5 bg-slate-300 text-base px-2 py-1 hover:bg-white cursor-pointer"
            onClick={toggle}
          >
            Switch
          </button>
        </h1>
        {isToDo ? (
          <>
            <div className="flex space-x-3 items-baseline">
              <select className="px-2 h-10" value={category} onInput={onInput}>
                {categories.map((label) => (
                  <option value={label} key={label}>
                    {label}
                  </option>
                ))}
              </select>
              <Create />
            </div>
            <ul className="divide-y divide-slate-4 bg-white">
              {toDos.map((toDo) => (
                <ToDo key={toDo.id} {...toDo} />
              ))}
            </ul>
          </>
        ) : (
          <Category />
        )}
      </div>
    </>
  );
}

export default App;
