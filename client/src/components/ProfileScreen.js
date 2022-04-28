import { Typography, Box, Grid, Button, List, Divider } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle'
import { useNavigate } from 'react-router-dom'
import { useContext, useRef, useLayoutEffect } from 'react'
import AuthContextProvider from '../auth'
import GlobalStoreContext from '../store';
import ProfileCard from './ProfileCard'

export default function ProfileScreen() {
    const firstRender = useRef(false);
    const {auth} = useContext(AuthContextProvider)
    const {store} = useContext(GlobalStoreContext)
    let navigate = useNavigate()

    let profileURL = window.location.href.substring(window.location.href.indexOf("/profile/") + 9);
    if (auth.user === null && profileURL !== "") {
        auth.loadProfile(profileURL);
        store.loadProfileWorks(profileURL);
    }

    useLayoutEffect(() => {
        if (firstRender.current) {
            store.loadProfileWorks(auth.user._id);
        }
        firstRender.current = true;
    }, [store.mode]);

    function handleFollow() {
        let user = auth.user;
        user.follows.push(auth.session._id);
        auth.updateUser(user);
    }

    function handleUnfollow() {
        let user = auth.user;
        user.follows.splice(user.follows.indexOf(auth.session._id), 1)
        auth.updateUser(user);
    }

    let drafts = ""
    let profileButtons = ""
    let profile_image = <AccountCircle id="profile_image"/>

    if (auth.session !== null && auth.user !== null && auth.session._id === auth.user._id) {
        drafts = 
        <div>
            <Grid id="profile_drafts_title_container" item xs={12}>
                <Typography id="profile_works_title">
                    Drafts
                </Typography>
            </Grid>
            <Grid id="profile_works_border" item xs={12}>
                <List id="profile_works_list">
                {
                    store.works.filter(work => work.published === null).map((work, index) => {
                        if (store.works.filter(work => work.published === null).length - index > 1)
                            return (
                                <div key={"draft" + index}>
                                    <ProfileCard work={work}/>
                                    <Divider id="divider"/>
                                </div> )
                        else {
                            return (
                                <ProfileCard key={"draft" + index} work={work}/>
                            )
                        }
                    })
                }
                </List>
            </Grid>
        </div>
        profileButtons =
            <Grid item xs={4} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button id="text_button" onClick={() => navigate('/storyboard/')}>Create Drawing</Button>
                <Button id="text_button" onClick={() => navigate('/upload' + store.mode + '/')}>Upload New</Button>
            </Grid>
    }

    return (
        <Box id="profile_box" className="profile_centered">
            <Grid className="profile_centered" item={true} xs={10} container sx={{ minWidth: '1200px' }}>
                <Grid item xs={3} sx={{ alignItems: 'right' }}>
                    <Grid className="profile_centered" item xs={12} pb={6}>
                        { profile_image }
                    </Grid>
                    <Grid className="profile_centered" item xs={12} pb={2}>
                        { 
                        (auth.session !== null && auth.user !== null && auth.session._id !== auth.user._id) ? 
                            ((auth.user.follows.includes(auth.session._id) ? 
                                ( <Button id="button" variant="contained" onClick={handleUnfollow}>Unfollow User</Button> )
                            : 
                                ( <Button id="button" variant="contained" onClick={handleFollow}>Follow User</Button>)
                            )) : ""
                        }
                    </Grid>
                    <Grid className="profile_centered" item xs={12} pb={6}>
                        <Box sx={{ width: '350px', textAlign: 'center' }}>
                            <Typography color="white">
                                A long description is a way to provide long alternative text for non-text elements, such as images. 
                                Generally, alternative text exceeding 250 characters, which cannot be made more concise without making it less 
                                descriptive or meaningful, should have a long description. Examples of suitable use of long description are 
                                charts, graphs, maps, infographics, and other complex images. Like alternative text, long description should 
                                be descriptive and meaningful. It should also include all text that is incorporated into the image. A long 
                                description should provide visually-impaired users with as much information as sighted users would understand 
                                from the image.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={7}>
                    <Grid id="profile_name" item xs={12}>
                        <Typography id="profile_name_text">{(auth.user !== null) ? auth.user.username : ""}</Typography>
                    </Grid>
                    <Grid id="profile_status" item xs={12}>
                        <Typography id="profile_status_text">{(auth.user !== null && auth.user.admin) ? "admin" : "user"}</Typography>
                    </Grid>
                    <Grid id="profile_uploaded_title_container" item xs={12}>
                        <Grid item xs={8}>
                            <Typography id="profile_works_title">
                                Uploaded Works
                            </Typography>
                        </Grid>
                        { profileButtons }
                    </Grid>
                    <Grid id="profile_works_border" item xs={12}>
                        <List id="profile_works_list">
                        {
                            store.works.filter(work => work.published !== null).map((work, index) => {
                                if (store.works.filter(work => work.published !== null).length - index > 1)
                                    return (
                                        <div key={ "published" + index }>
                                            <ProfileCard work={work}/>
                                            <Divider id="divider"/>
                                        </div> )
                                else {
                                    return (
                                        <ProfileCard key={"published" + index} work={work}/>
                                    )
                                } 
                            })
                        }
                        </List>
                    </Grid>
                    { drafts }
                </Grid>
            </Grid>
        </Box>
    )
}