import { gql } from "@apollo/client";
import ItemsPage from '../layouts/ItemsPage';


const GET_EPISODES_QUERY = gql`
  query GetEpisodes($page: Int) {
    episodes(page: $page) {
      info {
        count
        pages
      }
      results {
        id
        name
        air_date
        episode
        characters {
          name
        }
        created
      }
    }
  }
`;

export default function Episodes() {


  return (

    <ItemsPage query={GET_EPISODES_QUERY} map={(data: any) => ({
      pages: data.episodes.info.pages,
      path: 'episodes/',
      items: data.episodes.results.map((episode: any) => ({
        id: episode.id,
        name: episode.name,
        type: episode.type,
        props: {
          "Air Date": episode.air_date,
          Code: episode.episode,
          Characters: episode.characters.map((character: any) => character.name).join(", "),
          Created: episode.created,
        }
      }))
    })}
    />
  );

}
