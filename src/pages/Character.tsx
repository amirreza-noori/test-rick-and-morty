import { Card, CardContent, CardMedia, Typography, CircularProgress, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { OndemandVideo } from '@mui/icons-material';
import { useQuery, gql } from "@apollo/client";
import { NavLink, useParams } from "react-router-dom";

const GET_CHARACTER_QUERY = gql`
  query GetCharacter($characterId: ID!) {
    character(id: $characterId) {
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
  const { characterId } = useParams();

  const { data, loading, error } = useQuery(GET_CHARACTER_QUERY, {
    variables: { characterId },
  });

  if (error) return <pre>{error.message}</pre>;
  if (loading) return (
    <Box sx={{ display: 'flex', padding: 20, justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );

  const character = data.character;


  return (
    <>
      <Card sx={{ margin: "auto" }}>
        <CardMedia
          component="img"
          image={character.image}
          alt={character.name}
          sx={{ float: "right", width: { sm: "auto" }, marginBottom: 2, margin: { sm: 2 }, borderRadius: { sm: 2 } }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {character.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Species: {character.species}<br />
            Gender: {character.gender}<br />
            Status: {character.status}<br />
            Location: {character.location.name}<br />
            Origin: {character.origin.name}<br />
            Status: {character.status}<br />
            Status: {character.status}<br />

          </Typography>
          <List>
            {character.episode.map((episode: any) => <ListItem key={episode.episode}
              component={NavLink}
              to={'../episodes/' + character.id}>
              <ListItemIcon>
                <OndemandVideo />
              </ListItemIcon>
              <ListItemText

                primary={<><b>{episode.episode}</b> {episode.name}</>}
                secondary={episode.air_date}
              />
            </ListItem>
            )}
          </List>
        </CardContent>
      </Card>

    </>
  );
}
