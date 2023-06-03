import { Card, CardBody, CardHeader, CardText } from "reactstrap";

export const DogNotes = ({ notesOnDog }) => {

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
            Notes:
        </h5>
        {notesOnDog?.map(comment => {
            return <div className="dog-notes" key={comment.id}>
                <div>
                    <Card>
                        <CardHeader>On {returnTime(`${comment.date}+00:00`)}, {comment.groomer.firstName} said</CardHeader>
                        <CardBody>
                            <CardText className="ms-3">{comment.content}</CardText>
                        </CardBody>
                    </Card>
                </div>
            </div>
        })}
    </>
}
