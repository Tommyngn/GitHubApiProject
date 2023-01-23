import React, { useState } from 'react';
import ListView from './components/ContributerListView/ContributerListView';
import ContributerInfoDrawer from './components/ContributerInfoDrawer';
import { ContributerList } from '../../Shared/Context/GithubProvider';
import './LandingPage.css'


const LandingPage = () => {
    const listOfContributers = ContributerList();
    const [openDrawer, setOpenDrawer] = useState(false);
    return (
        <div className='background-color'>
            <h1 className='title-color'>FrontLine Education</h1>
            {listOfContributers  ?  listOfContributers.map((contributer) => {
                const {login, contributions, avatar_url} = contributer;
                return <ListView username={login} contributionAmount={contributions} avatar={avatar_url} openDrawer={() => {setOpenDrawer(true);}} />
            }) : <></>}
            <ContributerInfoDrawer isOpen={openDrawer} setOpen={setOpenDrawer}/>
        </div>
    )

};
export default LandingPage;