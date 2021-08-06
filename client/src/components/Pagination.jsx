import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Pagination, PaginationItem } from "@material-ui/lab";

import { getPosts } from "../redux/actions/posts";
import useStyles from "./styles";

const Paginate = ({ page }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { numberOfPages } = useSelector((state) => state.posts);

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/posts?page=${item.page}`}
        />
      )}
      variant='outlined'
      color='primary'
    />
  );
};

export default Paginate;
