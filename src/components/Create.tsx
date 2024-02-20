import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDosState } from "../atoms";
import { useForm } from "react-hook-form";

interface IForm {
  toDo: string;
}

function Create() {
  const setToDos = useSetRecoilState(toDosState);
  const category = useRecoilValue(categoryState);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IForm>({
    defaultValues: {
      toDo: "",
    },
  });

  const handleValid = (data: IForm) => {
    setToDos((oldToDos) => [
      ...oldToDos,
      {
        id: Date.now(),
        category,
        content: data.toDo.trim(),
      },
    ]);
    setValue("toDo", "");
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          className={`px-3 h-10 ${
            Object.keys(errors).includes("toDo") ? "border-red-400 b-1" : ""
          }`}
          {...register("toDo", {
            required: "Please write a to do",
            maxLength: { value: 50, message: "To do is too long!" },
            validate: {
              noEmpty: (value) =>
                value.trim() ? true : "Please write a to do",
            },
          })}
          placeholder="Write your to do"
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
    </>
  );
}

export default Create;
