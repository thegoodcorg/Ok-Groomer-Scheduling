import React, { useState } from "react";
import { Button } from "reactstrap";
import { getNotesByDogId, postNote } from "../Modules/NotesManager";


export const NoteForm = ({ appointment, getNotes}) => {
    const [noteContent, setNoteContent] = useState({})

    return <div className="dog-note">
        <textarea
        className="dog-note-input"
            value={noteContent.content}
            type="field"
            placeholder="Notes available for future use. Only for groomers, these do not display to the dogs owner."
            onChange={(e) => {
                const copy = { ...noteContent }
                copy.content = e.target.value
                setNoteContent(copy)
            }}>

        </textarea>
        <div className="submit-button-container">
            <Button className="btn btn-success" onClick={() => {
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
    </div>
}

