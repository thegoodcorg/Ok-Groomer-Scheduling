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

    return <>
        <h5>
            Notes
        </h5>
        <br />
        {notesOnDog?.map(comment => {
            return <React.Fragment key={comment.id}>
                <li>
                    {comment.content}
                </li>
            </React.Fragment>
        })}
    </>
}