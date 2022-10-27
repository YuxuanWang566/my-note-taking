import {Note} from "../Types/Note";

export class NotesService {

    static getAllNotes() {
        const notes : Array<Note>= JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

        return notes.sort((a : Note, b : Note) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }

    static saveNote(noteToSave : Note) {
        const notes = NotesService.getAllNotes();
        const existing = notes.find((note) => note.id === noteToSave.id);

        // Edit/Update
        if (existing) {
            existing.title = noteToSave.title;
            existing.body = noteToSave.body;
            existing.updated = new Date().toISOString();
        } else {
            noteToSave.id = Math.floor(Math.random() * 1000000);
            noteToSave.updated = new Date().toISOString();
            notes.push(noteToSave);
        }

        localStorage.setItem("notesapp-notes", JSON.stringify(notes));
    }

    static deleteNote(id : number) {
        const notes = NotesService.getAllNotes();
        const newNotes = notes.filter((note) => note.id != id);

        localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
    }
}
