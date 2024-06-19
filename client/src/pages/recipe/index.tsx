import React, { useState, useEffect } from 'react';
import CardRecipe from '../../components/CardRecipe'
import Button from '../../components/Button'
import '../../app/globals.css';

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [selectedCuisine, setSelectedCuisine] = useState("0"); 
  const [diets, setDiets] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState("0"); 
  const [difficulties, setDifficulties] = useState([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("0"); 
  const [searchName, setSearchName] = useState('');
  const [error, setError] = useState(null);
  
  const path = "http://localhost:8080" // qui potremmo inserire un variabile env

  const getCuisine = (cuisineId: string) => {
    return cuisines.find((c) => c.id === cuisineId).name
  }

  const getDiet = (dietId: string) => {
    return diets.find((d) => d.id === dietId).name
  }

  const getDifficulty = (difficultyId: string) => {
    return difficulties.find((d) => d.id === difficultyId).name
  }

  type TSelectcion = {
    target: {
      value: string
    }
  }

  const handleSelectedCuisine = (e: TSelectcion): any => {
    setSelectedCuisine(e.target.value)
  }

  const handleSelectedDiet = (e: TSelectcion): any => {
    setSelectedDiet(e.target.value)
  }

  const handleSelectedDifficulty = (e: TSelectcion): any => {
    setSelectedDifficulty(e.target.value)
  }

  const handleSearchName = (e: TSelectcion): any => {
    setSearchName(e.target.value)
  }

  type TRecipe = {
    cuisineId: string;
    dietId: string;
    difficultyId: string;
  }

  const filteredRecipes = recipes.filter((recipe: TRecipe) => {
    return (
      (selectedCuisine === "0" || recipe.cuisineId === selectedCuisine) &&
      (selectedDiet === "0" || recipe.dietId === selectedDiet) &&
      (selectedDifficulty === "0" || recipe.difficultyId === selectedDifficulty) &&
      (searchName === '' || recipe.name.toLowerCase().includes(searchName.toLowerCase()))
    )
  })


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
              <input 
                type="text" 
                className="border border-gray-200 p-2 rounded-3xl w-full" 
                value={searchName}
                onChange={handleSearchName}
              />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Filter by Cuisine</h4>
              <select 
                className="border border-gray-200 p-2 rounded-3xl w-full"
                value={selectedCuisine}
                onChange={handleSelectedCuisine}
              >
                <option value="0">...</option>
                {
                  cuisines.map((c,i) => {
                    return (
                      <option value={c.id} key={i}>{c.name}</option>
                    )
                  })
                }
              </select>
            </div>
            <div>
              <h4 className="font-semibold text-lg">Filter by Diet</h4>
              <select 
                className="border border-gray-200 p-2 rounded-3xl w-full"
                value={selectedDiet}
                onChange={handleSelectedDiet}
              >
                <option value="0">...</option>
                {
                  diets.map((d, i) => (
                    <option value={d.id} key={i}>{d.name}</option>
                  ))
                }
              </select>
            </div>
            <div>
              <h4 className="font-semibold text-lg">Filter by Difficulty</h4>
              <select 
                className="border border-gray-200 p-2 rounded-3xl w-full"
                value={selectedDifficulty}
                onChange={handleSelectedDifficulty}
              >
                <option value="0">...</option>
                {
                  difficulties.map((d, i) => (
                    <option value={d.id} key={i}>{d.name}</option>
                  ))
                }
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
              {filteredRecipes.map((recipe,i) => (
                <CardRecipe 
                  image={`${path}${recipe.image}`} 
                  id={recipe.id} 
                  name={recipe.name} 
                  ingredients={recipe.ingredients} 
                  instructions={recipe.instructions} 
                  cuisine={getCuisine(recipe.cuisineId)} 
                  diet={getDiet(recipe.dietId)} 
                  difficulty={getDifficulty(recipe.difficultyId)} 
                  key={i}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
