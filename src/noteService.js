class NoteService {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    createNote(day, calendar) {
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
    
    updateNote(note_id) {
        const is_active = () => {
            const radio_values = document.getElementsByName("active-button");
            for (let i = 0; i < 2; i++) {
                if (radio_values[i].checked) {
                    return radio_values[i] ? true : false;
                }
            }
        }

        const note = {
            id: note_id,
            content: document.getElementById("content").value,
            is_active: is_active(),
            // calendar_id: calendar_id,
            // day_id: day_id
        }
    
        const configObject = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        }
    
        // debugger; 

        fetch(`${this.endpoint}/notes/${note.id}`, configObject)
        .then(resp => resp.json())
        .then(note => {
            // debugger;
            // CHECK: content is not updating correctly
            const n = Note.all.find(n => n.id === note.id);
            n.addToDom();
            // remove note form
        })
        
    }
}