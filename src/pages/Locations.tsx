import { gql } from "@apollo/client";
import ItemsPage from '../layouts/ItemsPage';


const GET_LOCATIONS_QUERY = gql`
  query GetLocations($page: Int) {
    locations(page: $page) {
      info {
        count
        pages
      }
      results {
        id
        name
        dimension
        type
        created
      }
    }
  }
`;

export default function Locations() {


  return (

    <ItemsPage query={GET_LOCATIONS_QUERY} map={(data: any) => ({
      pages: data.locations.info.pages,
      path: 'locations/',
      items: data.locations.results.map((location: any) => ({
        id: location.id,
        name: location.name,
        type: location.type,
        props: {
          Dimension: location.dimension,
          Type: location.type,
          Created: location.created,
        }
      }))
    })}
    />
  );

}
