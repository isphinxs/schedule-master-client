class NoteService {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }
    
    createNote(calendar_id, day_id) {
        const calendar = Calendar.all.find(c => c.id === parseInt(calendar_id));

        const note = {
            content: document.getElementById("content").value,
            is_active: this.is_active(), 
            calendar_id: parseInt(calendar_id),
            day: parseInt(day_id)
        }
        
        const configObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(note)
        }
        
        // debugger; 
        
        fetch(`${this.endpoint}/notes`, configObject)
        .then(resp => resp.json())
        .then(note => {
            const n = new Note(note);
            calendar.notes.push(n);
            n.addToDom();
            Note.noteContainer.innerHTML = "";
        })
    }
    
    is_active() {
        const radio_values = document.getElementsByName("active-button");
        if (radio_values[0].checked) {
            return true;
        } else {
            return false;
        }
    }
    
    updateNote(note_id) {

        const note = {
            id: note_id,
            content: document.getElementById("content").value,
            is_active: this.is_active(),
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
            const n = Note.all.find(n => n.id === note.id);
            n.updateNote(note);
            n.addToDom();
            Note.noteContainer.innerHTML = "";
        })
        
    }
}