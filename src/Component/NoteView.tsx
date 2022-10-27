import {NoteStore} from "../Store/NoteStore";
import {NotesService} from "../Service/NotesService";
import {Note} from "../Types/Note";

interface INoteViewProps {
    store : NoteStore,
}


export const NoteView = ({store} : INoteViewProps) => {

    const refresh = () => {
        updateNoteList(store.notes);
        updateNotePreviewVisibility(store.notes.length > 0);
    }

    const _handlers = () => {
        return {
            onNoteSelect: (noteId : String | undefined) => {
                if (!noteId) return;
                const selectedNote = store.notes.find((note) => Number(note.id) === Number(noteId));
                if(!selectedNote) return;
                store._setActiveNote(selectedNote);
                updateActiveNote(store.activeNote);
            },
            onNoteAdd: () => {
                const newNote = {
                    id : 1,
                    title: "新建笔记",
                    body: "开始记录...",
                    updated : ""
                };

                NotesService.saveNote(newNote);
                store._refreshNotes();
                refresh();
            },
            onNoteEdit: (title : string, body : string) => {
                NotesService.saveNote({
                    id: store.activeNote!.id,
                    title,
                    body,
                    updated :""
                });

                store._refreshNotes();
                refresh();
            },
            onNoteDelete: (noteId : String | undefined) => {
                if(!noteId) return;
                NotesService.deleteNote(Number(noteId));
                store._refreshNotes();
                refresh();
            },
        };
    }

    const {onNoteSelect,
        onNoteAdd,
        onNoteEdit,
        onNoteDelete, } = _handlers();



        const btnAddNote = document.querySelector(".notes__add") as HTMLButtonElement;
        const inpTitle = document.querySelector(".notes__title")  as HTMLInputElement;
        const inpBody = document.querySelector(".notes__body")  as HTMLInputElement;

        if(!btnAddNote || ! inpTitle || ! inpBody) return (<> null</>);

        btnAddNote.addEventListener("click", () => {
            onNoteAdd();
        });

        [inpTitle, inpBody].forEach((inputField) => {
            inputField.addEventListener("blur", () => {
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();

                onNoteEdit(updatedTitle, updatedBody);
            });
        });




    const _createListItemHTML = (id : number, title : string, body : string, updated : Date) =>{
        const MAX_BODY_LENGTH = 60;

        return `
          <div class="notes__list-item" data-note-id="${id}">
              <div class="notes__small-title">${title}</div>
              <div class="notes__small-body">
                  ${body.substring(0, MAX_BODY_LENGTH)}
                  ${body.length > MAX_BODY_LENGTH ? "..." : ""}
              </div>
              <div class="notes__small-updated">
                  ${updated.toLocaleString(undefined, {
            dateStyle: "full",
            timeStyle: "short",
        })}
              </div>
          </div>
      `;
    }

    const updateNoteList = (notes : Note[]) => {
        const notesListContainer = document.querySelector(".notes__list");

        if(!notesListContainer) return;
        // Empty list
        notesListContainer.innerHTML = "";

        for (const note of notes) {
            const html = _createListItemHTML(
                note.id,
                note.title,
                note.body,
                new Date(note.updated)
            );

            notesListContainer.insertAdjacentHTML("beforeend", html);
        }

        // Add select/delete events for each list item
        notesListContainer
            .querySelectorAll(".notes__list-item")
            .forEach((noteListItem) => {
                noteListItem = noteListItem  as HTMLDivElement;
                noteListItem.addEventListener("click", () => {
                    onNoteSelect((noteListItem  as HTMLDivElement).dataset.noteId);
                });

                noteListItem.addEventListener("dblclick", () => {
                    const doDelete = window.confirm("确认要删除该笔记吗?");

                    if (doDelete) {
                        onNoteDelete((noteListItem  as HTMLDivElement).dataset.noteId);
                    }
                });
            });
    }

    const updateActiveNote = (note: Note | undefined) => {
        if(!note) return;
        (document.querySelector(".notes__title")! as HTMLInputElement).value = note.title;
        (document.querySelector(".notes__body")! as HTMLTextAreaElement).value = note.body;

        document.querySelectorAll(".notes__list-item").forEach((noteListItem) => {
            noteListItem.classList.remove("notes__list-item--selected");
        });

        document
            .querySelector(`.notes__list-item[data-note-id="${note.id}"]`)!
            .classList.add("notes__list-item--selected");
    }

    const updateNotePreviewVisibility = (visible : boolean) => {
        (document.querySelector(".notes__preview")! as HTMLDivElement).style.visibility = visible
            ? "visible"
            : "hidden";
    }

    updateNotePreviewVisibility(false);
    return(
        <>
            <div className="notes__sidebar">
                <button className="notes__add" type="button">添加新的笔记 📒</button>
                <div className="notes__list"></div>
            </div>
            <div className="notes__preview">
                <input className="notes__title" type="text" placeholder="新笔记...">
                    <textarea className="notes__body">编辑笔记...</textarea>
                </input>
            </div>
        </>
    )
}


