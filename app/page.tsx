"use client";

import { useState } from "react";

const Home = () => {
  const shoppingItems = [
    { name: "Melon", price: 50 },
    { name: "Orange", price: 30 },
    { name: "Apple", price: 40 },
  ];

  const [cart, setCart] = useState([]);

  function AddToCart(item) {
    setCart((prev) => [...prev, item]);
  }

  function highestNumber(num) {
    return Math.max(...num);
  }

  return (
    <section>
      <div>
        <ul>
          {shoppingItems.map((item) => (
            <li key={item.name}>
              {item.name}{" "}
              <button
                onClick={() => AddToCart(item)}
                className="text-green-500"
              >
                Add To Cart
              </button>
            </li>
          ))}
        </ul>

        <ul>
          {cart.map((item) => (
            <li key={item.name}>{item.name}</li>
          ))}
        </ul>
      </div>

      {/* <p>{count}</p>
        <button onClick={() => setCount((prev) => prev + 1)}>Click here</button> */}

      {/* <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events">
          {events.map((event) => (
            <li key={event.title}>
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div> */}
    </section>
  );
};

export default Home;
