import React, {useEffect, useContext, useState} from 'react';
import { Octokit } from 'octokit';

const octokit = new Octokit({ auth:'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'})

const AccessCurrentProfile = React.createContext({});
const AccessContributionList = React.createContext({});
const ChangeProfile = React.createContext({});

export const ContributerList = () =>  useContext(AccessContributionList);
export const CurrentProfile = () =>  useContext(AccessCurrentProfile);
export const SwitchProfile = () => useContext(ChangeProfile);


const GithubProvider = ({ children }) => {
    const [listOfContributers, setListOfContributers] = useState(null);
    const [currentProfile, setCurrentProfile] = useState({});

    const checkCurrentProfile = (profile) => {
        setCurrentProfile(profile)
    };

    useEffect(() => {
        const retrieve = async () => {
            const {data: response} = await octokit.request('GET https://api.github.com/repos/Facebook/react/contributors')
            .then(response => {
                return response;
            }).catch(error => {
                console.log(error);
            })
            setListOfContributers(response)
        }
        
        retrieve();

    }, []);

    return (
        <AccessContributionList.Provider value={listOfContributers}>
            <AccessCurrentProfile.Provider value={currentProfile}>
                <ChangeProfile.Provider value={checkCurrentProfile}>
                    {children}
                </ChangeProfile.Provider>
            </AccessCurrentProfile.Provider>
        </AccessContributionList.Provider>
    );

};

export default GithubProvider;


