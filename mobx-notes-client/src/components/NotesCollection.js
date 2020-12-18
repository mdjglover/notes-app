import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { observer } from "mobx-react";
import { AppStoreContext } from "../stores/AppStore";
import { Note } from "./Note";

export const NotesCollection = observer(
    class NotesCollection extends React.Component {
        constructor(props) {
            super(props);

            const store = useContext(AppStoreContext);
        }
        
        handleEdit(index) {
            
        }

        render() {
            const notes = store.notes.map((note, idx) => {
                <li key={note._id}>
                    <Note note={note} handleEdit={this.handleEdit(idx)} />
                </li>;
            });

            return (
                <Container>
                    <ul>{notes}</ul>
                </Container>
            );
        }
    }
);
