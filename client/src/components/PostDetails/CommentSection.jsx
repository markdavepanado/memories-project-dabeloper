import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Typography, TextField, Button } from "@material-ui/core";

import { commentPost } from "../../redux/actions/posts";
import useStyles from "./styles";

const CommentSection = ({ post }) => {
  const commentsRef = useRef();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleClick = async () => {
    const finalComment = `${user.result.name}: ${comment}`;

    const newComments = await dispatch(commentPost(finalComment, post._id));

    setComments(newComments);
    setComment("");

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div>
          <Typography variant='h6' gutterBottom>
            Comments
          </Typography>
          <div className={classes.commentsInnerContainer}>
            {comments.map((comment, index) => (
              <Typography key={index} variant='subtitle1' gutterBottom>
                <strong
                  {...(user?.result?.name == comment.split(": ")[0] && {
                    style: { color: "DarkBlue" },
                  })}
                  // style={{ color: "white", backgroundColor: "black" }}
                >
                  {user?.result?.name === comment.split(": ")[0]
                    ? `${comment.split(": ")[0]} (Me)`
                    : comment.split(": ")[0]}
                  :
                </strong>
                {comment.split(":")[1]}
              </Typography>
            ))}
            <div ref={commentsRef} />
          </div>
        </div>
        {user?.result?.name && (
          <div style={{ width: "70%" }}>
            <Typography variant='h6' gutterBottom>
              Write a Comment..
            </Typography>
            <TextField
              rows={4}
              variant='outlined'
              label='Comment'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              multiline
              fullWidth
            />
            <Button
              variant='contained'
              color='primary'
              style={{ marginTop: "10px" }}
              onClick={handleClick}
              disabled={!comment}
              fullWidth
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
