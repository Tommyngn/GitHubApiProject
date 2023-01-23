import React from 'react';
import { Grid, Button, Typography, Avatar } from '@mui/material';
import { SwitchProfile } from '../../../../Shared/Context/GithubProvider';
import { Octokit } from 'octokit';
import 'rsuite/dist/rsuite.min.css';

const octokit = new Octokit()



const ContributerListView = ({ username, contributionAmount, avatar, openDrawer }) => {
    const checkCurrentProfile = SwitchProfile();

    return (
        <Grid container spacing={2}>
            <Grid item>
                <Avatar src={avatar} />
            </Grid>
            <Grid item>
                <Button variant='outlined' onClick={async () => {
                    const {data: response} = await octokit.request(`GET https://api.github.com/users/${username}`)
                    .then(response => {
                        return response;
                    }).catch(error => {
                        console.log(error);
                    })
                    if (response) {
                        checkCurrentProfile(response);
                        openDrawer();
                    }
                }}>
                    {username}
                </Button>
            </Grid>
            <Grid item>
                <Typography variant='overline'>
                    Contribution Amount: {contributionAmount}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default ContributerListView;
