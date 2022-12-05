import { Grid, Card, CardActions, CardActionArea, Button, CardContent, CardMedia, Typography, Pagination, CircularProgress, Box } from '@mui/material';
import { useQuery } from "@apollo/client";
import { NavLink } from "react-router-dom";
import { useState, Fragment } from 'react'
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { favItemsAdd, favItemsRemove } from '../utils/actions/favItemsActions';
import { connect } from 'react-redux';

interface Inputs {
    query: any
    map: (data: any) => {
        pages: number
        path: string
        items: {
            id: number
            name: string
            image?: string | undefined
            type: string
            props: Object
        }[]

    }
    favouriteItemsAdd: any
    favouriteItemsRemove: any
    favouriteItems: any[]
}



function ItemsPage({ query, map, favouriteItemsAdd, favouriteItemsRemove, favouriteItems }: Inputs) {
    const [page, setPage] = useState(1);
    const { data, loading, error } = useQuery(query, {
        variables: { page },
    });

    if (error) return <pre>{error.message}</pre>;
    if (loading) return (
        <Box sx={{ display: 'flex', padding: 20, justifyContent: "center" }}>
            <CircularProgress />
        </Box>
    );

    const mapedData = map(data);

    return (
        <>
            <Box sx={{ display: "flex", padding: 2, justifyContent: "center" }}>
                <Pagination count={mapedData.pages}
                    page={page}
                    onChange={(e: any, newPage: any) => setPage(newPage)} color="primary" />
            </Box>
            <Grid container spacing={2}>
                {mapedData.items.map((item: any) => (<Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                    <Card
                        sx={{ maxWidth: 345, margin: "auto" }}>
                        <CardActionArea component={NavLink} to={item.id}>
                            {item.image && <CardMedia
                                component="img"
                                height="140"
                                image={item.image}
                                alt={item.name}
                            />}

                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {Object.entries(item.props).map((iprop: any) => <Fragment key={iprop[0]}>
                                        <b>{iprop[0]}</b>: {iprop[1]}<br />
                                    </Fragment>)}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small"
                                component={NavLink}
                                to={item.id}>More Info</Button>

                            {favouriteItems.findIndex((i: any) => i.path === mapedData.path + item.id) < 0 ?
                                <Button size="small" sx={{ marginLeft: "auto", color: "red" }}
                                    onClick={() => favouriteItemsAdd(mapedData.path + item.id, item.name, mapedData.path.replace('/', ''))}>
                                    <FavoriteBorder />
                                </Button> :
                                <Button size="small" sx={{ marginLeft: "auto", color: "red" }}
                                    onClick={() => favouriteItemsRemove(mapedData.path + item.id)}>
                                    <Favorite />
                                </Button>
                            }

                        </CardActions>
                    </Card>
                </Grid>))}
            </Grid>
        </>
    );
}



const reduxMapDispatchToProps = (dispatch: any) => ({
    favouriteItemsAdd: (path: string, title: string, type: string) => dispatch(favItemsAdd(path, title, type)),
    favouriteItemsRemove: (path: string) => dispatch(favItemsRemove(path)),
});

const reduxMapStatesToProps = (store: any) => ({
    favouriteItems: store.favItemsState.favItems,
});


export default connect(reduxMapStatesToProps, reduxMapDispatchToProps)(ItemsPage);