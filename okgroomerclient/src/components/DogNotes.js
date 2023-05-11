import React, { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { me } from "../Modules/authManager";
import { useParams } from "react-router-dom"

export const DogNotes = ({ notesOnDog }) => {
    const [currentUser, setCurrentUser] = useState({});

    const { id } = useParams();

    useEffect(() => {
        me().then((res) => {
            setCurrentUser(res);
        });
    }, []);

    const returnTime = (datetoBeConverted) => {
        const date = new Date(datetoBeConverted);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
        return formattedDate
    }


    return <>
        <h5>
            Notes
        </h5>
        <br />
        {notesOnDog?.map(comment => {
            return <React.Fragment key={comment.id}>
                <div>
                <u>On {returnTime(`${comment.date}+00:00`)}, {comment.groomer.firstName} said</u>
                <div>
                {comment.content}
                </div>
                </div>
            </React.Fragment>
        })}
    </>
}