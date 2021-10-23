import axios from "axios";

const YOUR_APP_ID = "ceb6158f";
const YOUR_APP_KEY = "ca03bd3ef7ce2e88d201595ed1eab4cd";



export const getRecipes = async (query) => {
    const url = `https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;
    return await axios.get(url);
};
