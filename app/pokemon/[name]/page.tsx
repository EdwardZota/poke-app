import { getAllPokemonDetail } from "@/app/_services/pokemonApi";
import PokemonDetail from "@/app/_components/pokemon/PokemonDetail";
import {AllPokemonDetail} from "@/app/_utils/SinglePokemonInfo";

type Params = Promise<{ name: string }>

export default async function PokemonPage(props: { params: Params }) {
    const params = await props.params;
    const pokemon: AllPokemonDetail = await getAllPokemonDetail(params.name);

    return <PokemonDetail pokemon={pokemon}/>;
}
