import React from "react";
import { Card, Button } from "react-bootstrap";
import history from "../history";

const Note = (props) => {
    let {note} = props;

    const handleEditClick = () => {
        history.pushState({note: note}, "/notes/edit");
    };

    const handleDeleteCLick = () => {

    };

    return (
    <Card>
        <Button onClick={handleEditClick}>Edit</Button>
        <Button onClick={handleDeleteCLick}>Delete</Button>
        <Card.Body>
            <Card.Title>{note.title}</Card.Title>
            <Card.Body>{note.body}</Card.Body>
        </Card.Body>
        <Card.Footer>Tags: {note.tags}</Card.Footer>
    </Card>
    );
};

export {Note};
