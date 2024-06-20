import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

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
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Recipe Details: {id}</h1>
      <section>
      {error ? (
            <p>Error fetching recipes: {error.message}</p>
          ) : (
            <p>{recipe.name}</p>
          )}
      </section>
    </main>
  );
};
