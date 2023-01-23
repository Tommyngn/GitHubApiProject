import React from 'react';
import { CurrentProfile } from '../../../Shared/Context/GithubProvider';
import { Drawer, Box, Grid, Avatar, Divider} from '@mui/material';

const ContributerInfoDrawer = ({isOpen ,setOpen}) => {
    const currentProfile = CurrentProfile();
    const {bio, login, location, followers, following, avatar_url, name} = currentProfile;

    return (
        <Drawer anchor='right' open={isOpen} onClose={() => {setOpen(false);}}>
            <Box sx={{width: 300, padding: 3}}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Avatar src={avatar_url} sx={{width: 100, height: 100}} />
                    </Grid> 
                    <Grid item xs={12}>
                        {name}
                    </Grid>
                    <Grid item xs={12}>
                        Username: {login}
                    </Grid>
                    <Grid item xs={12}>
                        Location: {location}
                    </Grid>
                    <Grid item xs={12}>
                        Followers: {followers}
                    </Grid>
                    <Grid item xs={12}>
                        Following: {following}
                    </Grid>
                    
                    <Grid item xs={12}>
                        <Divider />
                        {bio}
                    </Grid>
                </Grid>
            </Box>
        </Drawer>
    );
}

export default ContributerInfoDrawer;