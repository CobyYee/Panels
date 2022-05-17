import { Typography, Box, Grid, Button, List, Divider } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle'
import { useNavigate } from 'react-router-dom'
import { useContext, useState, useRef, useEffect, useLayoutEffect } from 'react'
import AuthContextProvider from '../auth'
import GlobalStoreContext from '../store';
import ProfileCard from './ProfileCard'

export default function ProfileScreen() {
    const firstRender = useRef(false);
    const {auth} = useContext(AuthContextProvider)
    const {store} = useContext(GlobalStoreContext)
    let navigate = useNavigate()

    const [description, setDescription] = useState("")

    /*
    let profileURL = window.location.href.substring(window.location.href.indexOf("/profile/") + 9);
    if (auth.user === null && profileURL !== "") {
        auth.loadProfile(profileURL);
        store.loadProfileWorks(profileURL);
    }
    */

    let profile_image = <AccountCircle id="profile_icon"/>

    if (auth.user !== null && auth.user_image !== null) {
        profile_image = <img id="profile_image" src={auth.user_image} alt="" />
    }

    let profile_container = <div></div>

    if (auth.session !== null && auth.user !== null && auth.session._id === auth.user._id) {
        profile_container = 
            <div id="profile_image_container">
                <input id="profile_input" type="file" onChange={(event) => {handleFileUpload(event)}} />
                <label htmlFor="profile_input">
                    { profile_image }
                </label>
            </div>
    }
    else {
        profile_container = 
            <div id="profile_image_container">
                { profile_image }
            </div>
    }

    useEffect(() => {
        if (auth.user !== null) {
            setDescription(auth.user.description);
        }
    }, [auth.user])

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
        user.follows.splice(user.follows.indexOf(auth.session._id), 1);
        auth.updateUser(user);
    }

    function handleDescription() {
        if (description !== auth.user.description) {
            let user = auth.user;
            user.description = description;
            auth.updateUser(user);
        }
    }

    function handleFileUpload(event) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = function() {
            auth.changeProfileImage(reader.result);
            //setImage(reader.result);
        }
        reader.onerror = function (error) {
            console.log("File onload error: " + error);
        }
    }

    let drafts = ""
    let profileButtons = ""

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
                <Button id="text_button" onClick={() => navigate('/upload' + store.mode + '/')}>Create New {store.mode}</Button>
            </Grid>
    }

    return (
        <div id="profile_box" className="profile_centered">
            <Grid className="profile_centered" item={true} xs={10} container sx={{ minWidth: '1200px' }}>
                <Grid item xs={3} sx={{ alignItems: 'right' }}>
                    <Grid className="profile_centered" item xs={12} pb={3}>
                    { profile_container }
                    </Grid>
                    <Grid className="profile_centered" item xs={12} pb={5}>
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
                        {
                            (auth.session !== null && auth.user !== null && auth.session._id === auth.user._id) ?
                                <textarea id="profile_description" 
                                          value={description} 
                                          onChange={(event) => setDescription(event.target.value)} 
                                          onBlur={() => handleDescription()}
                                          spellCheck="false"
                                />
                            :
                            <div style={{ color: 'white' }}>
                                { description }
                            </div>
                        }
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
        </div>
    )
}