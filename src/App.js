import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import * as types from "./redux/actionType";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
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
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
function App() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("paneer");

  const { recipes } = useSelector((state) => state.data);
  const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  const [expanded, setExpanded] = React.useState(false);
  const [cardValue, setCardValue] = useState("")

  const handleExpandClick = (index) => {
    setExpanded(!expanded);
    setCardValue(index);
  };

  const updateSearch = () => {
    setQuery(search);
    setSearch("");
  };
  const [spacing, setSpacing] = React.useState(2);

  const jsx = `
  <Grid container spacing={${spacing}}>
  `;
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: types.FETCH_RECIPE_START, query });
  }, [query]);
  return (
    <div className="App">
      <h1>Recepie App</h1>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "45ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Enter Recipe"
          variant="outlined"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant="contained"
          style={{ width: "80px", height: "50px" }}
          onClick={updateSearch}
        >
          Search
        </Button>
      </Box>
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={spacing}>
            {recipes &&
              recipes.hits &&
              recipes.hits.map((item,index) => (
                <Grid key={index} item>
                  {/* {item.recipe.label} */}
                  <Card sx={{ width: 345,margin:"15px"}}>
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                          R
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={item.recipe.label}
                      subheader={
                        <span>
                          <DirectionsRunIcon />
                          {item.recipe.calories}
                        </span>
                      }
                    />
                    <CardMedia
                      component="img"
                      height="194"
                      image={item.recipe.image}
                      alt="Paella dish"
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      ></Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                      <ExpandMore
                        expand={expanded}
                        onClick={()=>handleExpandClick(index)}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>
                    <Collapse in={index === cardValue && expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Typography >Cusine Type : {item.recipe.cuisineType[0]}</Typography>
                        <Typography >Diet Labels : {item.recipe.dietLabels[0]}</Typography>
                        <Typography >DishType : {item.recipe.dishType[0]}</Typography>
                        <Typography>Recipe : {item.recipe.ingredientLines}</Typography>
          
                      </CardContent>
                    </Collapse>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
