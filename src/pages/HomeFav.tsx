import { Box, Grid, Typography, Button, Card, CardActionArea, CardContent, CardActions } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { favItemsRemove } from '../utils/actions/favItemsActions';
import { Favorite } from '@mui/icons-material';


function HomeFav({ favouriteItems, favouriteItemsRemove }: any) {

  return (
    <Grid container spacing={2}>
      {favouriteItems.length > 0 ? favouriteItems.map((item: any) => (<Grid key={item.title} item xs={12} sm={4}>
        <Card
          sx={{ maxWidth: 345, margin: "auto", textAlign: "center" }}>
          <CardActionArea component={NavLink} to={item.path}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.title}
              </Typography>
              <Typography gutterBottom variant="h6" component="div" color="text.secondary">
                {item.type}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small"
              component={NavLink}
              to={item.path}>View</Button>


            <Button size="small" sx={{ marginLeft: "auto", color: "red" }}
              onClick={() => favouriteItemsRemove(item.path)}>
              Remove
            </Button>

          </CardActions>
        </Card>
      </Grid>))
        :
        <>
          <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center" }}>
            <Favorite sx={{ fontSize: 100, margin: 4, color: "red" }} />
            <Typography sx={{ fontSize: 20 }}>You can add items to this part by pushing <Favorite /> at the bottom of each card.</Typography>
          </Box>
        </>}
    </Grid >
  );

}

const reduxMapDispatchToProps = (dispatch: any) => ({
  favouriteItemsRemove: (path: string) => dispatch(favItemsRemove(path)),
});

const reduxMapStatesToProps = (store: any) => ({
  favouriteItems: store.favItemsState.favItems,
});


export default connect(reduxMapStatesToProps, reduxMapDispatchToProps)(HomeFav);