import EventCard from "@/components/EventCard";
import { IGame } from "@/database";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const Home = async () => {
  const response = await fetch(`${BASE_URL}/api/games`);
  const { games } = await response.json();

  return (
    <section>
      <div className="mt-20 space-y-7">
        <h3>Features Games</h3>

        <ul className="events">
          {games &&
            games.length > 0 &&
            games.map((game: IGame) => (
              <li key={game.title} className="list-none">
                <EventCard {...game} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Home;
