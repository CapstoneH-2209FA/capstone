import * as React from "react";
import { styled as styling } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

const styles = styling({
  gridContainer: {
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingBottom: "40px",
  },
});

let randomColor = Math.floor(Math.random() * 16777215).toString(16);
const pickedColor = "#" + randomColor;

const ProjectCard = (props) => {
  const usersWithProjects = useSelector(
    (state) => state.project.assignedProjects
  );

  const projectUsers = usersWithProjects.filter(
    (project) => project.id === props.projectId
  );

  const classes = styles();
  const date = props.created.slice(0, 12);
  const time = props.created.slice(14);

  return (
    <Link to={`/projects/${props.projectId}`}>
      <Card
        sx={{
          maxWidth: 345,
          borderRadius: "20px",
          textAlign: "center",
          fontFamily: "Ubutu",
        }}
      >
        <CardHeader
          sx={{
            maxHeight: 20,
            padding: 4,
            // color: "text.secondary",
            fontFamily: "Ubutu",
          }}
          title={
            <Typography sx={{ fontFamily: "Ubutu", fontSize: 28 }}>
              {props.title}
            </Typography>
          }
        />
        <CardMedia
          component="img"
          height="300"
          image="/images/ProjectIcon/WF.jpg"
        />
        <CardContent>
          <h2 style={{ textAlign: "center" }}>Members</h2>
          <AssigneeBox>
            {projectUsers[0]?.users.map((user) => (
              <Assignee key={user.id}>
                {user.avatarURL ? (
                  <Frame>
                    <img height="60px" width="60px" src={user.avatarURL} />
                  </Frame>
                ) : (
                  <Avatar
                    sx={{
                      bgcolor: pickedColor,
                      width: "59px",
                      height: "59px",
                    }}
                  >
                    {user.firstName.charAt(0).toUpperCase()}
                    {user.lastName.charAt(0).toUpperCase()}
                  </Avatar>
                )}
              </Assignee>
            ))}
          </AssigneeBox>
        </CardContent>
        <CardActions disableSpacing></CardActions>
      </Card>
    </Link>
  );
};

export default ProjectCard;

const Frame = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  overflow: hidden;
`;

const Assignee = styled.div`
  display: flex;
  flex-basis: row;
`;

const AssigneeBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;
