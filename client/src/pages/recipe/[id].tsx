import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import '../../app/globals.css';

export default function Recipe() {
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const path = "http://localhost:8080"; // qui potremmo inserire una variabile env
  const router = useRouter();
  const { id } = router.query;

  const getDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // I mesi in JavaScript sono 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const getRating = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating); // al posto dei simboli possiamo usare un icon
  };

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
        try {
          const responseComment = await fetch(`${path}/comments?recipeId=${id}`);
          const result = await responseComment.json();
          setComments(result);
        } catch (error) {
          console.error(error);
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
          recipe ? (
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
                <h1 className="text-2xl font-semibold text-gray-800">Recipe instructions:</h1>
                <p className="w-1/3 text-left">{recipe.instructions}</p>
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">Comments:</h1>
                <ul>
                  {comments.map((comment, index) => (
                    <li key={index} className="border-b border-gray-200 py-3 w-1/3">
                      <div className="space-y-2">
                        <p><strong>{getDate(comment.date)}</strong></p>
                        <p>{comment.comment}</p>
                        <p>{getRating(comment.rating)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ) : (
            <p>Loading...</p>
          )
        )}
      </section>
    </main>
  );
}