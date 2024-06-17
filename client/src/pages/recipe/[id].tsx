import { useRouter } from 'next/router';

export default function Recipe() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Recipe Details ID: {id}</h1>
    </main>
  );
};
