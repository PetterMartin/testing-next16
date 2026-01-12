import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const GameDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const request = await fetch(`${BASE_URL}/api/games/${slug}`);
  const { game } = await request.json();

  if (!game) return notFound();

  return (
    <section>
      <h1>Event Details: {slug}</h1>
    </section>
  );
};

export default GameDetailsPage;
