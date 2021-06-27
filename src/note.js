class Note {
    static all = [];
    static noteContainer = document.getElementById("note-container");

    static renderForm(calendar_id, day_id) {
        this.noteContainer.innerHTML += `
            <form data-calendar_id="${calendar_id}" data-day_id="${day_id}" id="note-popup">
                <h3>Add a Note</h3>
                <br>
                <label>Active?</label> 
                <input type="radio" name="active-button" id="active-yes" value="Y" checked>
                <label for="active-yes">Y</label>
                <input type="radio" name="active-button" id="active-no" value="N">
                <label for="active-no">N</label>
                <br>
                <label>Note</label>
                <input type="text" id="content">
                <br>
                <button id="update-button">Update</button>
                <button id="cancel-button">Cancel</button>
            </form>
        `
    }

    constructor({id, content, is_active, calendar_id, day_id}) {
        this.id = id;
        this.content = content;
        this.is_active = is_active;
        this.calendar_id = calendar_id;
        this.day_id = day_id;

        // this.element = document.createElement("div");
        // this.element.innerHTML = `
        //     <div id="note-${id}">
        //         <ul></ul>
        //         <button data-id="${id}" class="note-button" id="note-button-${id}">+</button>
        //     </div>
        // `;

        // debugger;

        // const day = document.getElementById(`day-${this.day_id}`);
        // day.append(this.element);

        Note.all.push(this);
    }
    
    static handleSubmit(event) {
        event.preventDefault(); 
        if (event.submitter.id === "update-button") {
            const calendar_id = event.target.dataset.calendar_id;
            const day_id = event.target.dataset.day_id;
            // debugger;
            noteService.createNote(calendar_id, day_id);
            // noteService.updateNote(note_id);
            return;
        }
        if (event.submitter.id === "cancel-button") {
            event.target.remove();
            return;
        }
    }

    addToDom() {
        const day = document.getElementById(`day-${this.day_id}`);
        const ul = document.getElementById(`note-${this.day_id}`).getElementsByTagName("ul")[0];
        
        // debugger;
        
        if (this.is_active) {
            if (!day.classList.contains("active")) {
                day.classList.add("active");
            }
        } else {
            if (day.classList.contains("active")) {
                day.classList.remove("active");
            }
        }
        if (this.content) {
            const li = document.createElement("li");
            li.innerHTML += this.content;
            ul.append(li);
        }
    }

    updateNote(newNote) {
        // debugger;
        this.is_active = newNote.is_active;
        this.content = newNote.content;
        return this;
    }
}