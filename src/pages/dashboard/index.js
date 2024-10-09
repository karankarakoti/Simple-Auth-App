import { Grid, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const DashboardDefault = () => {

  const { user }  = useSelector((state) => state.user);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold" }}
        >
          Welcome {user.name}!
        </Typography>
      </Grid>
    </Grid>
  );
};

export default DashboardDefault;