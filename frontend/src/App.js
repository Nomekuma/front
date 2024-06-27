import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [pokemon, setPokemon] = useState({});
  const [pokemonName, setPokemonName] = useState("pikachu");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          `https://backend-two-kappa-79.vercel.app/pokemon/${pokemonName}`
        );
        const data = await response.json();
        if (data && data.length > 0) {
          setPokemon(data[0]);
        } else {
          setPokemon({});
        }
      } catch (err) {
        setPokemon({});
      }
    };

    fetchPokemon();
  }, [pokemonName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.elements[0].value);
  };

  return (
    <div className="pokemon-app">
      <h1>Pokemon Search</h1>
      <p>Enter a pokemon name to search for it</p>
      <p>Try "pikachu" or "charizard"</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter pokemon name" />
        <button type="submit">Search</button>
      </form>
      <div className="pokemon-info">
        {pokemon.name ? (
          <>
            <h1>{pokemon.name}</h1>
            {pokemon.sprites && (
              <img src={pokemon.sprites} alt={pokemon.name} />
            )}
          </>
        ) : (
          <h1 className="not-found">Not Found</h1>
        )}
      </div>
    </div>
  );
}

export default App;
