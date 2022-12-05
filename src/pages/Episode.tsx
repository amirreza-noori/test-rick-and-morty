import { Avatar } from '@mui/material';
import { gql } from "@apollo/client";
import ItemPage from '../layouts/ItemPage';

const GET_EPISODE_QUERY = gql`
  query GetEpisode($id: ID!) {
    episode(id: $id) {
      id
      name
      air_date
      episode
      characters {
        id
        name
        origin {
          name
        }
        image
      }
      created
    }
  }
`;

export default function Episode() {


  return (
    <ItemPage query={GET_EPISODE_QUERY}

      map={({ episode }: any) => ({

        name: episode.name,
        props: {
          "Air date": episode.air_date,
          Episode: episode.episode,
          Created: episode.created,
        },
        lists: [{
          title: "Characters in this episode",
          items: episode.characters.map((character: any) => ({
            id: character.id,
            title: character.name,
            subtitle: character.origin.name,
            icon: <Avatar alt={character.name} src={character.image} />,
            path: '../characters/' + character.id
          }))
        }]

      })} />

  );
}
