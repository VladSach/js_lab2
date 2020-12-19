"use strict";
export default class Note {
    constructor({id, title, date, body}, noteManager) {
        this.el = null;

        this.id = id;
        this.title = title;
        this.date = new Date(date);
        this.body = body;

        this.notesManager = noteManager;
    }

    getTemplate() {
        return `
        <li class="nav-note" id='{{id}}'>
            <button class="remove-btn">X</button>
            <div class = 'note_name'>{{title}}</div>
            <div class = 'note_time'>{{date}}</div>
            <div class = 'note_description'>{{description}}</div>
        </li>`
    }

    attachEventListeners() {
        const btnRemove = this.el.querySelector('.remove-btn');
        const iEl = btnRemove.getElementsByTagName('BUTTON');

        btnRemove.onclick = () => {
            this.notesManager.removeNote(this);
            history.pushState(null, null, '/');
        }

        this.el.addEventListener('click', (e) => {
            if (e.target !== iEl[0])
                this.notesManager.onShowNote(this);
        });

    }

    buildNote() {
        const tpl = this.getTemplate();
        const tmpLi = document.createElement('li');

        const time = this.date.toLocaleDateString('ru');

        const desc = this.body.slice(0, 20)

        tmpLi.innerHTML = tpl
            .replace('{{id}}', this.id)
            .replace('{{title}}', this.title)
            .replace('{{date}}', time)
            .replace('{{description}}', desc);

        this.el = tmpLi.children[0];

        this.attachEventListeners();

        return this.el
    }

}
