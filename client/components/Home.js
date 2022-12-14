import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";

import {
  createProject,
  fetchProjects,
  fetchTheUsersProjects,
} from "../store/projectSlice";
import { addInvitedUser } from "../store/copyLinkSlice";
import { compareHash } from "../store/copyLinkSlice";
import ProjectCard from "./ProjectCard";
import { Button, Typography, Grid } from "@mui/material";
import { styled as usedStyles } from "@mui/material/styles";
import Footer from "./footer/Footer";

export const Home = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth);
  const { firstName } = useSelector((state) => state.auth);
  const { userProjects } = useSelector((state) => state.project);
  const projectId = window.localStorage.projectId;

  const { hash } = useSelector((state) => state.link);
  useEffect(() => {
    dispatch(compareHash(projectId));
  }, []);

  // if (window.localStorage.invite && window.localStorage.projectId) {
  useEffect(() => {
    if (hash) {
      // console.log("one", window.localStorage.invite, hash);
      dispatch(
        addInvitedUser({
          userId: user.id,
          projectId: +localStorage.getItem("projectId"),
        })
      );
      window.localStorage.removeItem("invite");
      window.localStorage.removeItem("projectId");
    } else {
      ("invite link invalid");
    }
  }, [hash]);

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchTheUsersProjects());
  }, []);

  // Add New Project
  const [titleValue, setTitleValue] = useState({
    title: "",
  });

  const handleChange = (event) => {
    setTitleValue({ ...titleValue, [event.target.name]: event.target.value });
  };

  const [titleError, setTitleError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTitleError(false);

    if (titleValue.title === "") {
      setTitleError(true);
      return;
    }
    dispatch(createProject(titleValue));
    // console.log("handleSubmit titleValue", titleValue);
  };

  const classes = styling();

  return (
    // Whole page

    <div>
      <HomeContainer className="backgroundMain">
        <NewProjectContainer>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <FormContainer>
              <TextField
                onChange={(event) =>
                  setTitleValue({
                    ...titleValue,
                    [event.target.name]: event.target.value,
                  })
                }
                name="title"
                variant="outlined"
                placeholder="Project Title"
                required
                error={titleError}
                sx={{
                  width: "100%",
                }}
              />
              <Button type="submit" variant="contained">
                Add a New Project
              </Button>
            </FormContainer>
          </form>
        </NewProjectContainer>
        <SingleProjectContainer>
          <Grid container spacing={2}>
            {userProjects?.length &&
              userProjects?.map((project) => (
                <Grid
                  item
                  xs={9}
                  sm={4}
                  className={classes.container}
                  key={project.id}
                  sx={{ paddingBottom: 15 }}
                >
                  <ProjectCard
                    projectId={project.id}
                    title={project.title}
                    created={project.createdAt}
                  />
                </Grid>
              ))}
          </Grid>
        </SingleProjectContainer>
        <Footer />
      </HomeContainer>
    </div>
  );
};

export default Home;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const NewProjectContainer = styled.div`
  height: 150px;
  width: 30%;
  // padding: 10px;
  margin-bottom: 70px;
`;

const SingleProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  width: 80%;
`;

const styling = usedStyles({
  container: {
    overFlow: "scroll",
    marginBottom: "10px",
  },
});
