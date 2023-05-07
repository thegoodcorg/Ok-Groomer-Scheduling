import React, { useEffect, useState } from "react";
import { getMyDogs } from "../Modules/DogManager";
import { me } from "../Modules/authManager";
import { Link } from "react-router-dom";

export const OwnerHomePage = () => {

    const [myDogs, setMyDogs] = useState([])
    const [userProfile, setUserProfile] = useState({})

    useEffect(() => {
        me().then((res) => {
            setUserProfile(res);
        }
        );
    }, [])


    
    useEffect(() => {
        if(userProfile.id){
        getMyDogs(userProfile.id)
        .then((res) => {
            setMyDogs(res)
        })}
    },[userProfile])

   return <div><Link to={"/Appointments"}>book an appointment!</Link></div>
}