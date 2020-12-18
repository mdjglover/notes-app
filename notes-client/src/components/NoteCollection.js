import React from "react";
import axios from "axios";

import { Container, Button } from "react-bootstrap";
import { Note } from "./Note";
import { NoteEdit } from "./NoteEdit";
import Switch from "react-bootstrap/esm/Switch";

class NoteCollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
        };

        this.getNotes.bind(this);
        this.createNote.bind(this);
        this.deleteNote.bind(this);
        this.updateNote.bind(this);
    }

    async componentDidMount() {
        let notes = await this.getNotes();
        this.setState({ notes: notes });
    }

    async getNotes() {
        let { accessToken } = this.props;
        try {
            let result = await axios.get("http://localhost:5000/notes/all", {
                headers: {
                    Authorization: "Bearer " + accessToken,
                },
            });

            return result.data;
        } catch {
            console.log("Error loading notes");
        }

        return [];
    }

    async createNote(note) {
        let { accessToken } = this.props;
        try {
            let result = await axios.post(
                "http://localhost:5000/notes/create",
                { note: note },
                {
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                }
            );

            if (result.status === 201) {
                return;
            }
        } catch {
            console.log("Error creating note");
        }
    }

    async deleteNote(id) {
        let { accessToken } = this.props;
        try {
            let result = await axios.post(
                "http://localhost:5000/notes/delete",
                { noteID: id },
                {
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                }
            );

            if (result.status === 200) {
                return;
            }

            console.log("Error deleting note");
        } catch {
            console.log("Error deleting note");
        }
    }

    async updateNote(note) {
        let { accessToken } = this.props;
        try {
            let result = await axios.post(
                "http://localhost:5000/notes/update",
                { note: note },
                {
                    headers: {
                        Authorization: "Bearer " + accessToken,
                    },
                }
            );

            if (result.status === 200) {
                return;
            }

            console.log("Error updating note");
        } catch {
            console.log("Error updating note");
        }
    }

    render() {
        let notes = this.state.notes.map((note) => {
            return (
                <li key={note._id}>
                    <Note note={note} />
                </li>
            );
        });

        return (
            <Switch>
                <Route exact path="/">
                    <Container>
                        <ul>{notes}</ul>
                    </Container>
                </Route>
                <Route path="/edit">
                    <NoteEdit updateNote={this.updateNote} createNote={this.createNote}/>
                </Route>
            </Switch>
        );
    }
}

export { NoteCollection };
