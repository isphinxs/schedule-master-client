class Note {
    static all = [];

    static renderForm() {
        debugger;
    }

    constructor({id, content, is_active, calendar_id, day_id}) {
        this.content = content;
        this.is_active = is_active;
        this.calendar_id = calendar_id;
        this.day_id = day_id;

        this.element = document.createElement("li");
        this.element.dataset.id = id;
        this.element.id = `note-${this.id}`;

        Note.all.push(this);
    }
}