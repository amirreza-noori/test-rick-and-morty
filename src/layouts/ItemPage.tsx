import { Card, CardContent, CardMedia, Typography, CircularProgress, Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { OndemandVideo } from '@mui/icons-material';
import { useQuery } from "@apollo/client";
import { NavLink, useParams } from "react-router-dom";
import { Fragment } from 'react'

interface Inputs {
    query: any
    map: (data: any) => {
        name: string
        image?: string | undefined
        props: Object
        lists: {
            title: string
            items: {
                id: number
                title: string
                subtitle?: string | undefined
                icon: any
                path: string
            }[]
        }[]
    }
}


export default function ItemPage({ query, map }: Inputs) {
    const { id } = useParams();

    const { data, loading, error } = useQuery(query, {
        variables: { id },
    });

    if (error) return <pre>{error.message}</pre>;
    if (loading) return (
        <Box sx={{ display: 'flex', padding: 20, justifyContent: "center" }}>
            <CircularProgress />
        </Box>
    );

    const item = map(data);


    return (
        <>
            <Card sx={{ margin: "auto" }}>
                {item.image && <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.name}
                    sx={{ float: "right", width: { sm: "auto" }, marginBottom: 2, margin: { sm: 2 }, borderRadius: { sm: 2 } }}
                />}
                <CardContent>
                    <Typography gutterBottom variant="h2" component="div">
                        {item.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {Object.entries(item.props).map((iprop: any) => <Fragment key={iprop[0]}>
                            <b>{iprop[0]}</b>: {iprop[1]}<br />
                        </Fragment>)}

                    </Typography>
                    {item.lists.map((list: any) => <Box key={list.title}>
                        <Typography variant="h4" sx={{ clear: "both", marginTop: 2 }}>{list.title}</Typography>
                        <List>
                            {list.items.map((row: any) => <ListItem key={row.id}
                                component={NavLink}
                                to={row.path}>
                                <ListItemIcon>
                                    {row.icon ? row.icon : <OndemandVideo />}
                                </ListItemIcon>
                                <ListItemText
                                    primary={row.title}
                                    secondary={row.subtitle}
                                />
                            </ListItem>
                            )}
                        </List>
                    </Box>)}
                </CardContent>
            </Card>

        </>
    );
}
