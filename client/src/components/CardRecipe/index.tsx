
import Button from '../Button'

interface CardRecipeProps {
  id: string,
  name: string,
  ingredients: string[],
  instructions: string,
  cuisineId: string,
  dietId: string,
  difficultyId: string,
  image: string
}

export default function CardRecipe({id, name, ingredients, instructions, cuisineId, dietId, difficultyId, image}: CardRecipeProps) {
  return (
    <div className="border border-grey-100 rounded-xl p-1">
      <div className="flex items-end">
        <div className="w-1/6">
          <img src={image} alt="foto" className="rounded-xl w-40 h-40" />
        </div>
        <div className="space-y-3 w-4/6">
          <h4 className="font-semibold text-sm">{name}</h4>
          <p>{ instructions }</p>
          <div>
            <div className="grid grid-cols-4 gap-1">
              {ingredients.map((ingredient) => (
                <span className="w-40 truncate p-1 border rounded-3xl text-center">#{ingredient}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/6">
          <Button label="View details" url={`/recipe/${id}`} />
        </div>
      </div>
    </div>
  )
}