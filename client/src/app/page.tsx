import Image from 'next/image';
import WelcomeImg from '../assets/images/welcome.png'
import LogoImg from '../assets/images/logo.png'
import Button from '../components/button';

export default function Home() {
  return (
    <main className="flex items-center justify-between bg-white">
      <div className="w-1/2">
        <Image src={WelcomeImg} alt="Welcome" layout="responsive" className="rounded-xl m-8" />
      </div>
      <div className="w-1/2 text-center space-y-3">
        <Image src={LogoImg} alt="Logo" className="mx-auto" />
        <h1 className="text-6xl">RecipeBook</h1>
        <p>Discover Recipes</p>
        <div className="py-20">
          <Button label="Explore" url="/recipe" />
        </div>
      </div>
    </main>
  );
}
