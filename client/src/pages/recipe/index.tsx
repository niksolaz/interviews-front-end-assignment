import React, { useState, useEffect } from 'react';
import CardRecipe from '../../components/CardRecipe'
import Button from '../../components/Button'
import '../../app/globals.css';

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const path = "http://localhost:8080" 

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('http://localhost:8080/recipes');
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        setError(error);
      }
    };

    getData();
  }, []);


  return (
    <main className="min-h-screen">
      <div className="w-full border py-10 px-4">
        <Button label="Add" url={"/recipe/create"} />
      </div>
      <div className="flex space-x-2 p-4">
        <section className="w-1/3">
          <h1 className="text-3xl">filters</h1>
          <div className="border rounded-xl h-full"></div>
        </section>
        <section className="w-2/3">
          <h1 className="text-3xl">List Recipes</h1>
          {error ? (
            <p>Error fetching recipes: {error.message}</p>
          ) : (
            <div className="space-y-3">
              {recipes.map((recipe) => (
                <CardRecipe image={`${path}${recipe.image}`} id={recipe.id} name={recipe.name} ingredients={recipe.ingredients} instructions={recipe.instructions} cuisineId={recipe.cuisineId} dietId={recipe.dietId} difficultyId={recipe.difficultyId}/>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
