class Note {
    static all = [];
    static notePopup = document.getElementById("note-popup");

    static renderForm() {
        // debugger;
        Calendar.calendarContainer.innerHTML += `
            <form id="note-popup">
                <h3>Add a Note</h3>
                <br>
                <label>Active?</label> 
                <input type="checkbox" id="active-yes" value="Y">
                <label for="active-yes">Y</label>
                <input type="checkbox" id="active-no" value="N">
                <label for="active-no">N</label>
                <br>
                <label>Note</label>
                <input type="text" id="content">
                <br>
                <button id="update-button">Update</button>
                <button id="cancel-button">Cancel</button>
            </form>
        `
        // this.notePopup.addEventListener("submit", this.handleSubmit);
        // this.notePopup.addEventListener("click", this.handleClick);
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
    
    // static handleSubmit(event) {
    //     debugger;
    //     event.preventDefault(); 
    //     console.log("Update button pressed!");
    // }

    // static handleClick(event) {
    //     debugger;
    //     if (event.target.innerText === "Update") {
    //         console.log("update button pressed");
    //     }
    //     if (event.target.innerText === "Cancel") {
    //         console.log("cancel button pressed");
    //         Note.notePopup.remove();
    //     }
    // }
}