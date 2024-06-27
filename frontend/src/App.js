import { useEffect, useState } from "react";
function App() {
  const [pokemon, setPokemon] = useState({});
  const [pokemonName, setPokemonName] = useState("pikachu");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`http://localhost:8080/pokemon/${pokemonName}`);
        const data = await response.json();
        setPokemon(data[0]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPokemon();
  }, [pokemonName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.elements[0].value);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" />
        <button type="submit">Search</button>
      </form>
      {pokemon.name && <h1>{pokemon.name}</h1>}
      {pokemon.sprites && <img src={pokemon.sprites} alt={pokemon.name} />}
    </div>
  );
}

export default App;
