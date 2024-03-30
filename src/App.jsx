import { useState, useEffect } from 'react';
import './App.css';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

function App() {
  const [recipes, setRecipes] = useState(null);

  useEffect(() => {
    const fetchRecipesData = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}`
        );
        const json = await response.json();
        setRecipes(json.results); // Assuming the results contain an array of recipes
      } catch (error) {
        console.error('Error fetching recipes data:', error);
      }
    };
    fetchRecipesData();
  }, []);

  return (
    <div className="whole-page">
      <h1>My Recipes List</h1>
      <ul>
        {recipes &&
          recipes.map((recipe) => (
            <li key={recipe.id}>
              <img src={recipe.image} alt={recipe.title} />
              <h3>{recipe.title}</h3>
              {/* Add more details of the recipe */}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default App;
