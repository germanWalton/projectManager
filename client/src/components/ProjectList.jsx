import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../graphql/projects";
import ProjectCard from "./ProjectCard";

const ProjectList = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  if (loading) return <p>...loading</p>;
  if (error) return <p>`Error:${error}`</p>;
  return (
    <div className="overflow-y-auto h-96 w-full px-5">
      {data.projects.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
