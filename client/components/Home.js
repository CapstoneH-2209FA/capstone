import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createProject, fetchProjects } from "../store/projectSlice";

export const Home = () => {
  const dispatch = useDispatch();
  // const { email } = useSelector((state) => state.auth);
  const { userProjects } = useSelector((state) => state.project);
  const [titleValue, setTitleValue] = useState({
    title: "",
  });

  useEffect(() => {
    dispatch(fetchProjects());
    console.log(userProjects);
  }, []);

  const handleChange = (event) => {
    setTitleValue({ ...titleValue, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createProject(titleValue));
  };
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit}>
        <input name="title" value={titleValue.title} onChange={handleChange} />
        <button type="submit">Start new Project</button>
      </form>
      <ProjectContainer>
        {userProjects.length &&
          userProjects.map((project) => (
            <Link key={project.id} to={`/projects/${project.id}`}>
              {project.title}
            </Link>
          ))}
      </ProjectContainer>
    </HomeContainer>
  );
};

export default Home;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  height: 200px;
  width: 80%;
  border-radius: 10px;
  padding: 10px;
`;
