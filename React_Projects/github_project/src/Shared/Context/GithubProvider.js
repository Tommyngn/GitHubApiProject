import React, {useEffect, useContext, useState} from 'react';
import { Octokit } from 'octokit';

const octokit = new Octokit()

const AccessCurrentProfile = React.createContext({});
const AccessContributionList = React.createContext({});
const ChangeProfile = React.createContext({});
const ChangePageNext = React.createContext({});
const ChangePagePrevious = React.createContext({});

export const ContributerList = () =>  useContext(AccessContributionList);
export const CurrentProfile = () =>  useContext(AccessCurrentProfile);
export const SwitchProfile = () => useContext(ChangeProfile);
export const NextPage = () => useContext(ChangePageNext);
export const PreviousPage = () => useContext(ChangePagePrevious);


const GithubProvider = ({ children }) => {
    const [listOfContributers, setListOfContributers] = useState(null);
    const [currentProfile, setCurrentProfile] = useState({});
    const [pageNumber, setPageNumber] = useState(1);

    const checkCurrentProfile = (profile) => {
        setCurrentProfile(profile)
    };

    const navigateNextPage = () => {
        setPageNumber(pageNumber + 1);
    };

    const navigatePreviousPage = () => {
        if(pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    }

    const retrieve = async () => {
        const {data: response} = await octokit.request(`GET https://api.github.com/repos/Facebook/react/contributors?page=${pageNumber}`)
        .then(response => {
            return response;
        }).catch(error => {
            console.log(error);
        })
        setListOfContributers(response)
    }

    useEffect(() => {
        retrieve();
    }, [pageNumber]);


    return (
        <AccessContributionList.Provider value={listOfContributers}>
            <AccessCurrentProfile.Provider value={currentProfile}>
                <ChangeProfile.Provider value={checkCurrentProfile}>
                    <ChangePageNext.Provider value={navigateNextPage}>
                        <ChangePagePrevious.Provider value={navigatePreviousPage}>
                            {children}
                        </ChangePagePrevious.Provider>
                    </ChangePageNext.Provider>
                </ChangeProfile.Provider>
            </AccessCurrentProfile.Provider>
        </AccessContributionList.Provider>
    );

};

export default GithubProvider;


