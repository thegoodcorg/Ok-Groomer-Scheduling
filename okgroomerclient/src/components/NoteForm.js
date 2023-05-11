import React, { useState } from "react";
import { Button } from "reactstrap";
import { getNotesByDogId, postNote } from "../Modules/NotesManager";


export const NoteForm = ({ appointment, getNotes}) => {
    const [noteContent, setNoteContent] = useState({})

    return <>
        <input
            value={noteContent.content}
            type="field"
            placeholder="Notes available for future use. Only for groomers, these do not display to the dogs owner."
            onChange={(e) => {
                const copy = { ...noteContent }
                copy.content = e.target.value
                setNoteContent(copy)
            }}>

        </input>
        <div>
            <Button className="btn btn-primary" onClick={() => {
                const copy = { ...noteContent }
                copy.dogId = appointment.dogId
                copy.groomerId = appointment.groomerId
                copy.date = new Date(Date.now())
                postNote(copy)
                    .then((res) => {
                        getNotes()
                        setNoteContent({ content: "" })
                    })


            }}>Submit</Button>
        </div>
        <br />
    </>
}

