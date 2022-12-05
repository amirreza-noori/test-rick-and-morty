import { Grid, Card, CardActions, CardActionArea, Button, CardContent, CardMedia, Typography, Pagination, CircularProgress, Box } from '@mui/material';
import { useQuery, gql } from "@apollo/client";
import { NavLink } from "react-router-dom";
import { useState } from 'react'


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
  const [page, setPage] = useState(1);
  const { data, loading, error } = useQuery(GET_CHARACTERS_QUERY, {
    variables: { page },
  });

  if (error) return <pre>{error.message}</pre>;
  if (loading) return (
    <Box sx={{ display: 'flex', padding: 20, justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );



  return (
    <>
      <Box sx={{ display: "flex", padding: 2, justifyContent: "center" }}>
        <Pagination count={data.characters.info.pages}
          page={page}
          onChange={(e: any, newPage: any) => setPage(newPage)} color="primary" />
      </Box>
      <Grid container spacing={2}>
        {data.characters.results.map((character: any) => (<Grid key={character.id} item xs={12} sm={6} md={4} lg={3}>
          <Card
            sx={{ maxWidth: 345, margin: "auto" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={character.image}
                alt={character.name}
              />

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {character.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Species: {character.species}<br />
                  Gender: {character.gender}<br />
                  Status: {character.status}<br />
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small"
                  component={NavLink}
                  to={character.id}>Learn Info</Button>
              </CardActions>
            </CardActionArea>
          </Card>
        </Grid>))}
      </Grid>
    </>
  );
}
