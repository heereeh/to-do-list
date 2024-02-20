import { useRecoilState, useSetRecoilState } from "recoil";
import { categoriesState, categoryState, toDosState } from "../atoms";
import { useForm } from "react-hook-form";

interface IForm {
  name: string;
}
const DEFAULT_CATEGORIES = ["TO DO", "DOING", "DONE"];
function Category() {
  const setCategory = useSetRecoilState(categoryState);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const setToDos = useSetRecoilState(toDosState);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      name: "",
    },
  });

  const handleValid = (data: IForm) => {
    setCategories((oldCategories) => [...oldCategories, data.name]);
    setValue("name", "");
  };

  const onClickRemove = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setCategories((oldCategories) => {
      const targetIndex = oldCategories.findIndex((c) => c === name);
      return [
        ...oldCategories.slice(0, targetIndex),
        ...oldCategories.slice(targetIndex + 1),
      ];
    });
    setToDos((oldToDos) => {
      return [...oldToDos.filter((t) => t.category !== name)];
    });
    setCategory((oldCategory) =>
      oldCategory === name ? categories[0] : oldCategory
    );
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(handleValid)}>
          <input
            className="px-3 h-10"
            placeholder="Add new category"
            {...register("name", {
              required: "Please enter name",
              maxLength: { value: 30, message: "Too long!" },
              validate: {
                noEmpty: (value) => (value.trim() ? true : "Please enter name"),
                duplicated: (value) =>
                  categories.includes(value.trim()) ? "Duplicated name" : true,
              },
            })}
          />
          <button
            type="submit"
            className="w-8 h-8 ml-2 rounded-full bg-slate-400 hover:bg-slate-500 text-white"
          >
            +
          </button>
          <div className="text-red-400 font-bold text-xs mt-1 ml-2 h-5">
            {Object.values(errors)
              .map((e) => e?.message)
              .join(", ")}
          </div>
        </form>
        {categories.map((c) => (
          <div key={c} className="group/item flex">
            <div className="w-6 mr-1">
              {!DEFAULT_CATEGORIES.includes(c) && (
                <button
                  className="invisible group-hover/item:visible hover:bg-white rounded-full w-full"
                  name={c}
                  onClick={onClickRemove}
                >
                  X
                </button>
              )}
            </div>
            {c}
          </div>
        ))}
      </div>
    </>
  );
}

export default Category;
