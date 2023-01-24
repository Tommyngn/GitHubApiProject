import React, { useState } from 'react';
import ListView from './components/ContributerListView/ContributerListView';
import ContributerInfoDrawer from './components/ContributerInfoDrawer';
import { ContributerList } from '../../Shared/Context/GithubProvider';
import { NextPage, PreviousPage } from '../../Shared/Context/GithubProvider';
import { Button, Grid } from '@mui/material';
import './LandingPage.css'


const LandingPage = () => {
    const listOfContributers = ContributerList();
    const navigateNextPage = NextPage();
    const navigatePreviousPage = PreviousPage();
    const [openDrawer, setOpenDrawer] = useState(false);
    return (
        <div className='background-color'>
            <h1 className='title-color'>FrontLine Education</h1>
            {listOfContributers  ?  listOfContributers.map((contributer) => {
                const {login, contributions, avatar_url} = contributer;
                return <ListView username={login} contributionAmount={contributions} avatar={avatar_url} openDrawer={() => {setOpenDrawer(true);}} />
            }) : <></>}
            <Grid container spacing={4} className='content'>
                <Grid item>
                    <Button variant='contained' onClick={() => {navigatePreviousPage()}}> Previous </Button>
                </Grid>
                <Grid item>
                    <Button variant='contained' onClick={() => {navigateNextPage()}}> Next </Button>
                </Grid>
            </Grid>
            <ContributerInfoDrawer isOpen={openDrawer} setOpen={setOpenDrawer}/>
        </div>
    )

};
export default LandingPage;