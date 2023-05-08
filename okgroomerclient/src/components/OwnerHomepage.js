import React, { useEffect, useState } from "react";
import { getMyDogs } from "../Modules/DogManager";
import { me } from "../Modules/authManager";
import { Link } from "react-router-dom";
import corgibath from "../images/corgibath.jpg"
import Header from "../Header";

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

   return <>
   <div className="owner-landing-photo">
   <img className="photo" src={corgibath} alt="corgi in a bathub with soap on his head and a rubber duck" />
   </div>
    <div className="about-section">About us</div>
   </>
}