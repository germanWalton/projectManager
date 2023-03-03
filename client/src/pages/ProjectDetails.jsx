import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECT, DELETE_PROJECT } from "../graphql/projects";
import { TasksList } from "../components/tasks/TasksList";
import { TaskForm } from "../components/tasks/TaskForm";

const ProjectDetails = () => {
  const params = useParams();
  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: {
      id: params.id,
    },
    skip: !params.id,
  });

  const [deleteProject, { loading: deleting, error: deleteError }] =
    useMutation(DELETE_PROJECT, {
      refetchQueries: ["getProjects"],
    });
  const navigate = useNavigate();

  const handleDelete = async () => {
    const result = await deleteProject({
      variables: {
        id: params.id,
      },
    });
    if (result.data.deleteProject._id) {
      navigate("/projects");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: `${error}`</p>;

  return (

    <div>
      <Link to="/projects">
        <button className="bg-zinc-600 mb-2 text-white px-3 py-2 w-full">Back</button>
      </Link>
      <div className="bg-zinc-900 mb-2 p-10 flex justify-between">
        <div>
          <h1 className="text-2xl">{data.project.name}</h1>
          <p>{data.project.description}</p>
        </div>
      </div>
      <button className="bg-red-500 w-full px-3 py-2 mb-1"  onClick={handleDelete}>
        Delete project
      </button>
      <TaskForm />
      <TasksList tasks={data.project.tasks} />
    </div>
  );
};

export default ProjectDetails;
