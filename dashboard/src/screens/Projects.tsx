import { useState, useEffect } from "react";
import axiosClient from "../../axios-client";
import { Link } from "react-router-dom";
import { Project } from "@types/Project";
import { Thumbnail } from "@components/thumbnail";
import { Button } from "@components/ui/button";

const getProjects = async (signal: AbortSignal) => {
  try {
    const response = await axiosClient.get("/projects", { signal });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[] | []>([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      const ProjectsPromise = getProjects(signal);
      try {
        const [projects] = await Promise.all([ProjectsPromise]);
        console.log(projects);
        setProjects(projects);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className="flex-1 space-y-4 mt-1">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <Link to={"/projects/new"}>add new</Link>
          </Button>
        </div>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {projects &&
          projects.map((project) => (
            <li key={project.slug} className="w-full">
              <Thumbnail
                key={project.slug}
                item={project}
                className={"ThumbnailClass"}
                aspectRatio="square"
                width={320}
                height={300}
                type={"project"}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Projects;
