import { AppBar, styled, Toolbar, Typography } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit'
  },
});

const AppToolbar = () => {
  return (
    <AppBar position="sticky" sx={{mb: 2}}>
      <Toolbar>
        <Typography variant="h5" component="div" sx={{flexGrow: 1}}>
          <Link to="/">News</Link>
        </Typography>
        <Typography variant="h6">
          <Link to="/new-post">Add new post</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;