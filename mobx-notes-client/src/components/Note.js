import React from "react";
import { Card } from "react-bootstrap";
import { observer } from "mobx-react";

export const Note = observer((props) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <Card.Body>{note.body}</Card.Body>
            </Card.Body>
            <Card.Footer>Tags: {note.tags}</Card.Footer>
        </Card>
    );
});
