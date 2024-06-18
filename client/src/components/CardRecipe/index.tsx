import React, { useState, useEffect } from 'react';
import Button from '../Button'

interface CardRecipeProps {
  id: string,
  name: string,
  ingredients: string[],
  instructions: string,
  cuisine: string,
  diet: string,
  difficulty: string,
  image: string
}

const path = "http://localhost:8080" 

export default function CardRecipe({id, name, ingredients, instructions, cuisine, diet, difficulty, image}: CardRecipeProps) {
  return (
    <div className="border border-grey-100 rounded-xl p-1">
      <div className="flex items-start justify-between space-x-3">
        <div className="w-1/6">
          <img src={image} alt="foto" className="rounded-xl w-40 h-40" />
        </div>
        <div className="space-y-5 w-4/6">
          <h4 className="font-semibold text-lg">{name}</h4>
          <span className="font-medium text-xs text-gray-400">{ingredients.length} ingredients</span>
          <p className="font-medium text-sm text-gray-900">{ instructions }</p>
          <div>
            <div className="flex items-center gap-1">
              <span className="w-fit truncate px-3 py-1 border rounded-3xl text-center">#{cuisine}</span>
              <span className="w-fit truncate px-3 py-1 border rounded-3xl text-center">#{diet}</span>
              <span className="w-fit truncate px-3 py-1 border rounded-3xl text-center">#{difficulty}</span>
            </div>
          </div>
        </div>
        <div className="w-1/6 py-20 relative">
          <div className="absolute bottom-4">
            <Button label="View details" url={`/recipe/${id}`} />
          </div>
        </div>
      </div>
    </div>
  )
}