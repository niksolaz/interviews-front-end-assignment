import React, { useState, useEffect } from 'react';
import CardRecipe from '../../components/CardRecipe'
import Button from '../../components/Button'
import '../../app/globals.css';

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [diets, setDiets] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [error, setError] = useState(null);
  const path = "http://localhost:8080" 

  const getCuisine = (cuisineId: string): any => {
    return cuisines.find((c) => c.id === cuisineId).name
  }

  const getDiet = (dietId: string): any => {
    return diets.find((d) => d.id === dietId).name
  }

  const getDifficulty = (difficultyId: string): any => {
    return difficulties.find((d) => d.id === difficultyId).name
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resCuisine = await fetch(`${path}/cuisines`);
        const dataCuisines = await resCuisine.json();
        console.log(dataCuisines)
        setCuisines(dataCuisines);
      } catch (error) {
        console.error(error);
      }
      try {
        const resDiets = await fetch(`${path}/diets`);
        const dataDiets = await resDiets.json();
        setDiets(dataDiets);
      } catch (error) {
        console.error(error);
      }
      try {
        const resDifficulties = await fetch(`${path}/difficulties`);
        const dataDifficulties = await resDifficulties.json();
        setDifficulties(dataDifficulties);
      } catch (error) {
        console.error(error);
      }
      try {
        const response = await fetch(`${path}/recipes`);
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);


  return (
    <main className="min-h-screen">
      <div className="w-full border py-10 px-4">
        <Button label="Add" url={"/recipe/create"} />
      </div>
      <div className="flex space-x-2 p-4">
        <section className="w-1/3">
          <h1 className="text-3xl">filters</h1>
          <div className="border rounded-xl h-full px-4">
            <div>
              <h4 className="font-semibold text-lg">Search Name</h4>
              <input type="text" className="border border-gray-200 p-2 rounded-3xl w-full" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Filter by Cuisine</h4>
              <select className="border border-gray-200 p-2 rounded-3xl w-full">
                <option value="1">...</option>
              </select>
            </div>
            <div>
              <h4 className="font-semibold text-lg">Filter by Diet</h4>
              <select className="border border-gray-200 p-2 rounded-3xl w-full">
                <option value="1">...</option>
              </select>
            </div>
            <div>
              <h4 className="font-semibold text-lg">Filter by Difficulty</h4>
              <select className="border border-gray-200 p-2 rounded-3xl w-full">
                <option value="1">...</option>
              </select>
            </div>
          </div>
        </section>
        <section className="w-2/3">
          <h1 className="text-3xl">List Recipes</h1>
          {error ? (
            <p>Error fetching recipes: {error.message}</p>
          ) : (
            <div className="space-y-3">
              {recipes.map((recipe,i) => (
                <CardRecipe image={`${path}${recipe.image}`} id={recipe.id} name={recipe.name} ingredients={recipe.ingredients} instructions={recipe.instructions} cuisine={getCuisine(recipe.cuisineId)} diet={getDiet(recipe.dietId)} difficulty={getDifficulty(recipe.difficultyId)} key={i}/>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
