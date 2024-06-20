import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import '../../app/globals.css';

export default function Recipe() {
  const [recipe, setRecipe] = useState([]);
  const [error, setError] = useState(null);
  const path = "http://localhost:8080" // qui potremmo inserire un variabile env
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if(id) {
      const fetchData = async () => {
        try {
          const response = await fetch(`${path}/recipes/${id}`);
          const data = await response.json();
          setRecipe(data);
          console.log(id)
        } catch (error) {
          setError(error);
        }
      };
  
      fetchData();
    }
  }, [id]);

  return (
    <main className="p-24">
      <section>
      {error ? (
            <p>Error fetching recipes: {error.message}</p>
          ) : (
            <section className="space-y-5">
              <h1 className="text-2xl font-semibold text-gray-800">Recipe name {recipe.name}</h1>
              <div className="bg-gray-200">
                <img src={path + recipe.image} className="object-cover h-[500px] w-full rounded-lg" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">Recipe ingredients:</h1>
                <ul>
                  {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">Reviews:</h1>
              </div>
            </section>
          )}
      </section>
    </main>
  );
};
