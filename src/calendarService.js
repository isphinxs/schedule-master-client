class CalendarService {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    createCalendar() {
        const calendar = {
            title: document.getElementById("title").value,
            start_month: document.getElementById("start-month").value,
            start_year: document.getElementById("start-year").value,
            end_month: document.getElementById("end-month").value,
            end_year: document.getElementById("end-year").value
        }
        
        const configObject = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(calendar)
        }
        
        fetch(`${this.endpoint}/calendars`, configObject)
        .then(resp => resp.json())
        .then(calendar => {
            const c = new Calendar(calendar);
            c.addToDom();
            Calendar.calendarForm.style.visibility = "hidden";
        })
    }
    
    updateCalendar(id) {
        debugger;
        const calendar = {
            id : id, 
            title: document.getElementById("title").value,
            start_month: document.getElementById("start-month").value,
            start_year: document.getElementById("start-year").value,
            end_month: document.getElementById("end-month").value,
            end_year: document.getElementById("end-year").value
        }

        fetch(`${this.endpoint}/calendars/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(calendar)
        })
        .then(resp => resp.json())
        .then(json => {
            alert("Updated!");
            const button = document.getElementById("create");
            button.value = "Submit";
            // const c = Calendar.all[0];

            // Calendar.calendarContainer.innerHTML = "";
            // Note.noteContainer.innerHTML = "";
            // alert(json.message);
        })

    }

    deleteCalendar(id) {
        fetch(`${this.endpoint}/calendars/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(resp => resp.json())
        .then(json => {
            Calendar.calendarForm.style.visibility = "visible";
            Calendar.calendarContainer.innerHTML = "";
            Note.noteContainer.innerHTML = "";
            alert(json.message);
        })
    }
}