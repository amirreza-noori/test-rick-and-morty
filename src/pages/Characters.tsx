import { gql } from "@apollo/client";
import ItemsPage from '../layouts/ItemsPage';


const GET_CHARACTERS_QUERY = gql`
  query GetCharacters($page: Int) {
    characters(page: $page) {
      info {
        count
        pages
      }
      results {
        id
        name
        status
        species
        type
        gender
        image
        location {
          dimension
        }
        origin {
          dimension
        }
        episode {
          name
        }
        created
      }
    }
  }
`;

export default function Characters() {


  return (

    <ItemsPage query={GET_CHARACTERS_QUERY} map={(data: any) => ({
      pages: data.characters.info.pages,
      path: 'characters/',
      items: data.characters.results.map((character: any) => ({
        id: character.id,
        name: character.name,
        image: character.image,
        type: character.type,
        props: {
          Species: character.species,
          Gender: character.gender,
          Status: character.status,
        }
      }))
    })}
    />
  );

}
