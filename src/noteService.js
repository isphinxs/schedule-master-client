class NoteService {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    createNote(day, calendar) {
        debugger;
        const note = {
            content: document.getElementById("content"),
            is_active: true, // fix
            calendar_id: calendar.id,
            day_id: day.id
        }

        const configObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        }

        fetch(`${this.endpoint}/notes`, configObject)
        .then(resp => resp.json())
        .then(note => {
            const n = new Note(note);
        })
    }
}