import { Avatar } from '@mui/material';
import { gql } from "@apollo/client";
import ItemPage from '../layouts/ItemPage';

const GET_LOCATION_QUERY = gql`
  query GetLocation($id: ID!) {
    location(id: $id) {
      id
      name
      type
      dimension
      residents {
        id
        name
        image
      }
      created
    }
  }
`;

export default function Location() {


  return (
    <ItemPage query={GET_LOCATION_QUERY}

      map={({ location }: any) => ({

        name: location.name,
        props: {
          Type: location.type,
          Dimension: location.dimension,
          Created: location.created,
        },
        lists: [{
          title: "Residents",
          items: location.residents.map((resident: any) => ({
            id: resident.id,
            title: resident.name,
            icon: <Avatar alt={resident.name} src={resident.image} />,
            path: '../characters/' + resident.id
          }))
        }]

      })} />

  );
}
