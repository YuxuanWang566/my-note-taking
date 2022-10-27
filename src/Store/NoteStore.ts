import {NoteView} from "../Component/NoteView";
import {NotesService} from "../Service/NotesService";
import { action, computed, makeObservable, observable } from "mobx";
import {Note} from "../Types/Note";

export class NoteStore {
    constructor() {
        makeObservable(this);
        this._refreshNotes();
    }
    @observable
    notes : Note[] = [];
    @observable
    activeNote : Note | undefined ;

    _refreshNotes() {
        const notes = NotesService.getAllNotes();

        this._setNotes(notes);

        if (notes.length > 0) {
            this._setActiveNote(notes[0]);
        }
    }

    _setNotes(notes : Note[]) {
        this.notes = notes;

    }

    _setActiveNote(note : Note) {
        this.activeNote = note;
    }


}
