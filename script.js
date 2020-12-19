"use strict";
class Note {
    constructor({id, title, body, date}, noteManager) {
        this.el = null;
        this.id = id;
        this.title = title;
        this.body = body;
        this.date = new Date(date);
        this.notesManager = noteManager;
    }
}
