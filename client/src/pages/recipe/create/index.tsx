import Button from '../../../components/Button'
import '../../../app/globals.css';

export default function CreateRecipe() {
  return (
    <main className="min-h-screen">
      <div className="w-full border py-10 px-4">
        <Button label="List recipe" url={"/recipe"} />
      </div>
      <section className="space-y-5 w-2/3 p-24">
        <h1 className="text-2xl font-semibold text-gray-800">Create Recipe</h1>
        <div>
          <div className="space-y-1 py-3">
            <label className="text-lg font-semibold text-gray-800 block">Name</label>
            <input type="text" placeholder="insert name" className="border border-gray-200 shadow p-3 rounded-lg w-1/3" />
          </div>
          <div className="space-y-1 py-3">
            <label className="text-lg font-semibold text-gray-800 block">Ingredients</label>
            <input type="text" placeholder="insert ingredients" className="border border-gray-200 shadow p-3 rounded-lg w-1/3" />
          </div>
          <div className="space-y-1 py-3">
            <label className="text-lg font-semibold text-gray-800 block">Instructions</label>
            <input type="text" placeholder="insert instructions" className="border border-gray-200 shadow p-3 rounded-lg w-1/3" />
          </div>
          <div className="space-y-1 py-3">
            <label className="text-lg font-semibold text-gray-800 block">Cuisines</label>
            <select className="border border-gray-200 shadow p-3 rounded-lg w-1/3">
              <option value="0">...</option>
              <option value="1">Italian</option>
            </select>
          </div>
          <div className="space-y-1 py-3">
            <label className="text-lg font-semibold text-gray-800 block">Difficulties</label>
            <select className="border border-gray-200 shadow p-3 rounded-lg w-1/3">
              <option value="0">...</option>
              <option value="1">Easy</option>
              <option value="2">Medium</option>
              <option value="3">Hard</option>
            </select>
          </div>
          <div className="space-y-1 py-3">
            <label className="text-lg font-semibold text-gray-800 block">Diets</label>
            <select className="border border-gray-200 shadow p-3 rounded-lg w-1/3">
              <option value="0">...</option>
              <option value="1">Vegetarian</option>
              <option value="2">Mediterranean</option>
              <option value="3">Non-Vegetarian</option>
              <option value="4">Pescatarian</option>
            </select>
          </div>
          <div className="flex items-center py-3 space-x-4">
            <button className="bg-red-500 text-xs uppercase text-white px-10 py-3 rounded-3xl hover:bg-red-600">
              salva
            </button>
            <button className="bg-gray-500 text-xs uppercase text-white px-10 py-3 rounded-3xl hover:bg-gray-600">
              reset
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
