import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import {
  Grow,
  Container,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";

import { getPosts, getPostsBySearch } from "../../redux/actions/posts";
import Pagination from "../Pagination";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const dispatch = useDispatch();
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [dispatch]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAdd = (tag) => setTags([...tags, tag]);
  const handleDelete = (tagToDelete) =>
    setTags(tags.filter((tag) => tag !== tagToDelete));

  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history.push("/");
    }
  };

  return (
    <Grow in>
      <Container maxWidth='xl'>
        <Grid
          className={classes.gridContainer}
          container
          justifyContent='space-between'
          alignItems='stretch'
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position='static'
              color='inherit'
            >
              <TextField
                name='search'
                variant='outlined'
                label='Search Memories'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={handleKeyPress}
                fullWidth
              />
              <ChipInput
                label='Search Tags'
                variant='outlined'
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
              />
              <Button
                className={classes.searchButton}
                color='primary'
                variant='contained'
                onClick={searchPost}
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
