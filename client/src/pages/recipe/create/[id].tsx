import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from '../../../components/Button'
import '../../../app/globals.css';

const path = "http://localhost:8080" // qui potremmo inserire un variabile env

export default function UpdateRecipe() {
  const router = useRouter();
  const { id } = router.query;
  const [recipe, setRecipe] = useState([])
  const [error, setError] = useState(null);
  const [ingredientInput, setIngredientInput] = useState('');

  const [cuisines, setCuisines] = useState([
    {
      "id": "1",
      "name": "Italian"
    },
    {
      "id": "2",
      "name": "American"
    },
    {
      "id": "3",
      "name": "Mexican"
    },
    {
      "id": "4",
      "name": "Indian"
    },
    {
      "id": "5",
      "name": "Japanese"
    },
    {
      "id": "6",
      "name": "Spanish"
    },
    {
      "id": "7",
      "name": "French"
    },
    {
      "id": "8",
      "name": "Greek"
    },
    {
      "id": "9",
      "name": "Thai"
    },
    {
      "id": "10",
      "name": "British"
    },
    {
      "id": "11",
      "name": "Russian"
    },
    {
      "id": "12",
      "name": "Middle Eastern"
    },
    {
      "id": "13",
      "name": "North African"
    },
    {
      "id": "14",
      "name": "Korean"
    }
  ])

  const postData = async (updatedRecipe) => {
    try {
      return await fetch(`${path}/recipes/${id}`, { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRecipe)
      });
    } catch (error) {
      setError(error);
    }
  };

  const handleInputChange = (event) => {
    setIngredientInput(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && ingredientInput.trim() !== '') {
      const updatedRecipe = {
        ...recipe,
        ingredients: [...(recipe.ingredients || []), ingredientInput.trim()],
      };
      setRecipe(updatedRecipe);
      postData(updatedRecipe);
      setIngredientInput('');
    }
  };

  const handleCuisineChange = (event) => {
    const selectedCuisine = event.target.value;
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      cuisineId: selectedCuisine
    }));
  };

  const handleDietChange = (event) => {
    const selectedDiet = event.target.value;
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      dietId: selectedDiet
    }));
  };

  const handleDifficultyChange = (event) => {
    const selectedDifficulty = event.target.value;
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      difficultyId: selectedDifficulty
    }));
  };

  const onSave = async () => {
    try {
      await postData(recipe);
      router.push('/recipe');
    } catch(error) {
      console.error(error)
    }
  }

  const onReset = () => router.push('/recipe'); // dovrei riportare i campi allo stato iniziale

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const response = await fetch(`${path}/recipes/${id}`);
          const data = await response.json();
          setRecipe(data);
        } catch (error) {
          setError(error);
        }
      };

      fetchData();
    }
  }, [id]);

  return (
    <main className="min-h-screen">
    <div className="w-full border py-10 px-4">
      <Button label="List recipe" url={"/recipe"} />
    </div>
    {error ? (
          <p>Error fetching recipes: {error.message}</p>
        ) : (
          recipe ? (
            <section className="space-y-5 w-2/3 p-24">
              <h1 className="text-2xl font-semibold text-gray-800">Update Recipe</h1>
              <div>
                <div className="space-y-1 py-3">
                  <label className="text-lg font-semibold text-gray-800 block">Name</label>
                  <input type="text" placeholder="insert name" className="border border-gray-200 shadow p-3 rounded-lg w-1/3" value={recipe.name}/>
                </div>
                <div className="space-y-1 py-3">
                  <label className="text-lg font-semibold text-gray-800 block">Ingredients</label>
                  <input 
                    type="text" 
                    placeholder="insert ingredients" 
                    className="border border-gray-200 shadow p-3 rounded-lg w-1/3"
                    value={ingredientInput}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress} 
                  />
                  <div className="grid grid-cols-3 gap-4 w-1/3">
                  {
                    recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                      <div key={index} className="col-span-1 border border-gray-200 rounded-2xl p-2 text-center truncate">#{ingredient}</div>
                    ))
                  }
                  </div>
                </div>
                <div className="space-y-1 py-3">
                  <label className="text-lg font-semibold text-gray-800 block">Instructions</label>
                  <input type="text" placeholder="insert instructions" className="border border-gray-200 shadow p-3 rounded-lg w-1/3" value={recipe.instructions}/>
                </div>
                <div className="space-y-1 py-3">
                  <label className="text-lg font-semibold text-gray-800 block">Cuisines</label>
                  <select 
                    className="border border-gray-200 shadow p-3 rounded-lg w-1/3"
                    value={recipe.cuisineId || '0'}
                    onChange={handleCuisineChange}
                  >
                    <option value="0">...</option>
                    {cuisines && cuisines.map((cuisine) => (
                      <option key={cuisine.id} value={cuisine.id}>{cuisine.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1 py-3">
                  <label className="text-lg font-semibold text-gray-800 block">Difficulties</label>
                  <select 
                    className="border border-gray-200 shadow p-3 rounded-lg w-1/3"
                    value={recipe.difficultyId || '0'}
                    onChange={handleDifficultyChange}
                  >
                    <option value="0">...</option>
                    <option value="1">Easy</option>
                    <option value="2">Medium</option>
                    <option value="3">Hard</option>
                  </select>
                </div>
                <div className="space-y-1 py-3">
                  <label className="text-lg font-semibold text-gray-800 block">Diets</label>
                  <select 
                    className="border border-gray-200 shadow p-3 rounded-lg w-1/3"
                    value={recipe.dietId || '0'}
                    onChange={handleDietChange}
                  >
                    <option value="0">...</option>
                    <option value="1">Vegetarian</option>
                    <option value="2">Mediterranean</option>
                    <option value="3">Non-Vegetarian</option>
                    <option value="4">Pescatarian</option>
                  </select>
                </div>
                <div className="flex items-center py-3 space-x-4">
                  <button 
                    className="bg-red-500 text-xs uppercase text-white px-10 py-3 rounded-3xl hover:bg-red-600"
                    onClick={onSave}
                  >
                    salva
                  </button>
                  <button 
                    className="bg-gray-500 text-xs uppercase text-white px-10 py-3 rounded-3xl hover:bg-gray-600"
                    onClick={onReset}
                  >
                    reset
                  </button>
                </div>
              </div>
            </section>
          ) : (
            <p>Loading...</p>
          )
        )}
  </main>
  );
};
