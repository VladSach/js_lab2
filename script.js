import NoteManager from "./NoteManager.js";
import IndexView from "./IndexView.js";

const noteManager = new NoteManager({
    el: document.querySelector('.left-bar-nav'),
    noteBody: document.querySelector('.note-body'),
    notes: localStorageLoader().sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
    })
})

function localStorageLoader() {
    let notes = [];
    for (let i = 0; i < localStorage.length; i++) {

        let key = localStorage.key(i);
        if (key === 'loglevel:webpack-dev-server')
            continue;

        let raw = localStorage.getItem(key);
        notes.unshift(JSON.parse(raw));
    }
    return notes;
}

noteManager.onNewNote = (note) => {
    localStorage.setItem(note.id, JSON.stringify(make_json_note(note)));
    console.log("Note added ", note.id);
};

noteManager.onEditNote = (note) => {
    localStorage.setItem(note.id, JSON.stringify(make_json_note(note)));
    console.log("Note changed ", note.id);
};

noteManager.onRemoveNote = (note) => {
    localStorage.removeItem(note.id);
    console.log("Note removed ", note.id);
};

function make_json_note({id, title, body, date}) {
    return {
        id,
        title,
        body,
        date
    }
}

(function () {
    new IndexView(noteManager);
    noteManager.renderNotes();

    const newNoteBtn = document.getElementById('add-button');
    newNoteBtn.onclick = () => {
        noteManager.addNote({
            id: `f${(~~(Math.random() * 1e8)).toString(16)}`,
            title: '',
            body: '',
            date: new Date()
        })
    };



})();