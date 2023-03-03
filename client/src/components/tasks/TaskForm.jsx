import { useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { CREATE_TASK } from "../../graphql/task";

export const TaskForm = () => {
  const [createTask] = useMutation(CREATE_TASK, {
    refetchQueries: ["getProject"],
  });
  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTask({
      variables: {
        title: e.target.title.value,
        projectId: params.id,
      },
    });
    e.target.reset();
    e.target.title.focus();
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="bg-zinc-900 text-white w-full p-2 rounded-lg mb-2"
        type="text"
        name="title"
        placeholder="Add a task"
      />
      <button className="bg-sky-900 text-white w-full p-2 rounded-lg">
        Add
      </button>
    </form>
  );
};
