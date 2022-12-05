import { CrisisAlert } from '@mui/icons-material';
import { Box, Typography, Button } from '@mui/material';
import { Navigate, NavLink, useParams } from 'react-router-dom';


export default function NotFound() {

  const params = useParams();

  return (
    <>
      {params['*'] !== 'notfound' && <Navigate to={"/notfound"} />}

      <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", padding: 10, paddingBottom: 2 }}>
        <CrisisAlert sx={{ fontSize: 100, margin: 4 }} />
        <Typography sx={{ fontSize: 20 }}>The page you are looking for is not exist.</Typography>
      </Box>
      <Box sx={{ textAlign: "center", padding: 2 }}>
        <Button variant="contained" component={NavLink} to={'..'} sx={{ margin: "auto" }}>Go to home page</Button>
      </Box>
    </>
  );
}
