import { TaskCard } from "./TaskCard";

export const TasksList = ({ tasks }) => {
  return (
    <div>
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  );
};
