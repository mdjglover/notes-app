import React from "react";
import { Form, Button } from "react-bootstrap";
import "../history";
import history from "../history";

class NoteEdit extends React.Component {
    constructor(props) {
        super(props);
        let { note } = props;
        this.state = {
            isNew: note ? true : false,
            _id: note._id ? note._id : "",
            title: note.title ? note.title : "",
            body: note.body ? note.body : "",
            tags: note.tags ? note.tags : "",
        };

        this.handleBodyChange.bind(this);
        this.handleTagsChange.bind(this);
        this.handleTitleChange.bind(this);
        this.handleCancelClick.bind(this);
        this.handleSaveClick.bind(this);
    }

    handleTitleChange(e) {
        this.setState({ title: e.target.value });
    }

    handleBodyChange(e) {
        this.setState({ body: e.target.value });
    }

    handleTagsChange(e) {
        this.setState({ tags: e.target.value });
    }

    handleCancelClick() {
        history.replace("/notes");
    }

    handleSaveClick() {
        let note = {
            _id: this.state._id,
            title: this.state.title,
            body: this.state.body,
            tags: this.state.tags,
        };

        if (this.state.isNew) {
            this.props
                .createNote(note)
                .then(history.push("/notes"))
                .catch(alert("Error creating note"));
        } else {
            this.props
                .updateNote(note)
                .then(history.push("/notes"))
                .catch(alert("Error updating note"));
        }
    }

    createNewNote() {}

    saveExistingNote() {}

    render() {
        return (
            <Form>
                <Form.Group controlId="noteTitle">
                    <Form.Control
                        type="text"
                        placeholder="Title"
                        defaultValue={this.state.title}
                        onChange={this.handleTitleChange}
                    />
                </Form.Group>
                <Form.Group controlId="noteBody">
                    <Form.Control
                        type="text"
                        placeholder="Body"
                        defaultValue={this.state.body}
                        onChange={this.handleBodyChange}
                    />
                </Form.Group>
                <Form.Group controlId="noteTags">
                    <Form.Control
                        type="text"
                        placeholder="Tags"
                        defaultValue={this.state.tags}
                        onChange={this.handleTagsChange}
                    />
                </Form.Group>
                <Button variant="primary" onClick={this.handleCancelClick}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={this.handleSaveClick}>
                    Save
                </Button>
            </Form>
        );
    }
}

export { NoteEdit };
