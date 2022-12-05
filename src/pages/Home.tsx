import { Group, LiveTv, Map } from '@mui/icons-material';
import { Grid, Typography, Button, Card, CardActionArea, CardContent, CardMedia, CardActions } from '@mui/material';
import { NavLink } from 'react-router-dom';
import HomeFav from './HomeFav';


export default function Home() {

  const pagesIndex = [
    { title: "CHARACTERS", path: "characters", icon: <Group />, description: "List of characters can be found here" },
    { title: "LOCATIONS", path: "locations", icon: <Map />, description: "List of locations can be found here" },
    { title: "EPISODES", path: "episodes", icon: <LiveTv />, description: "List of episodes can be found here" },
  ]

  return (
    <>
      <Grid container spacing={2}>
        {pagesIndex.map((page: any) => (<Grid key={page.title} item xs={12} sm={4}>
          <Card
            sx={{ maxWidth: 345, margin: "auto", textAlign: "center" }}>
            <CardActionArea component={NavLink} to={page.path}>
              {page.image && <CardMedia
                component="img"
                height="140"
                image={page.image}
                alt={page.name}
              />}

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {page.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {page.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small"
                component={NavLink}
                to={page.path}>More Info</Button>
            </CardActions>
          </Card>
        </Grid>))}
      </Grid>
      <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "center", padding: 2, paddingTop: 6, color: 'blue' }}>
        Your Favourite Parts
      </Typography>
      <HomeFav />
    </>
  );

}
