import { useRecoilValue, useSetRecoilState } from "recoil";
import { IToDo, categoriesState, toDosState } from "../atoms";

function ToDo({ id, category, content }: IToDo) {
  const categories = useRecoilValue(categoriesState);
  const setToDos = useSetRecoilState(toDosState);
  const moveCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((t) => t.id === id);
      const newToDo = { id, content, category: name };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  const onClickRemove = () => {
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((t) => t.id === id);
      return [
        ...oldToDos.slice(0, targetIndex),
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };
  return (
    <li className="flex justify-between p-2 space-x-2 group/item">
      <div>
        <button
          className="bg-white px-2 rounded-full hover:bg-slate-100 invisible group-hover/item:visible"
          onClick={onClickRemove}
        >
          X
        </button>
      </div>
      <div className="flex-1">{content}</div>
      <div className="space-x-2 invisible group-hover/item:visible">
        {categories
          .filter((c) => c !== category)
          .map((c) => (
            <button
              key={c}
              name={c}
              onClick={moveCategory}
              className="bg-slate-400 hover:bg-slate-500 text-white px-1 rounded-md"
            >
              {c}
            </button>
          ))}
      </div>
    </li>
  );
}

export default ToDo;
