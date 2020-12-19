export default class NoteBody {
    constructor(note, noteManager) {
        this.el = null;

        this.note = note;
        this.date = new Date(note.date);
        this.notesManager = noteManager;
    }

    getTemplate(){
        return `
        <div class = 'note-body'>
            <div class = 'note-body-time'>{{date}}</div>
            <div class = 'note-body-text'>
                <textarea class="note-title" type="text" placeholder="Name" maxlength = 20 contenteditable="true">{{title}}</textarea>
                <textarea class="note-textarea" placeholder="Text" contenteditable="true">{{body}}</textarea>
            </div>
        </div>`;
    }

    attachEventListeners() {
        const titleField = this.el.querySelector('.note-title');
        const bodyField = this.el.querySelector('.note-textarea');

        titleField.addEventListener('input', () => {
            this.notesManager.onEditTitle(this.note);
        });

        bodyField.addEventListener('input', () => {
            this.notesManager.onEditBody(this.note);
        });
    }

    buildNote() {
        const tpl = this.getTemplate();
        const tmpDiv = document.createElement('div');

        const time = this.date.toLocaleString('ru', {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        tmpDiv.innerHTML = tpl
            .replace('{{date}}', time)
            .replace('{{title}}', this.note.title)
            .replace('{{body}}', this.note.body);

        this.el = tmpDiv.children[0];

        this.attachEventListeners();

        return this.el
    }


}