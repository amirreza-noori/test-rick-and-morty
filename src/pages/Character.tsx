import { OndemandVideo } from '@mui/icons-material';
import { gql } from "@apollo/client";
import ItemPage from '../layouts/ItemPage';

const GET_CHARACTER_QUERY = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      image
      location {
        name
      }
      origin {
        name
      }
      episode {
        name
        air_date
        episode
      }
      created
    }
  }
`;

export default function Character() {


  return (
    <ItemPage query={GET_CHARACTER_QUERY}

      map={({ character }: any) => ({

        name: character.name,
        image: character.image,
        props: {
          Species: character.species,
          Gender: character.gender,
          Status: character.status,
          Location: character.location.name,
          Origin: character.origin.name,
        },
        lists: [{
          title: "Episode with this character",
          items: character.episode.map((episode: any) => ({
            id: character.id,
            title: <><b>{episode.episode}</b> {episode.name}</>,
            subtitle: episode.air_date,
            icon: <OndemandVideo />,
            path: '../episodes/' + character.id
          }))
        }]

      })} />

  );
}
