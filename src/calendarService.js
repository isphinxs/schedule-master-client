class CalendarService {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    createCalendar() {
        const startMonth = document.getElementById("start-month").value;
        const startYear = document.getElementById("start-year").value;
        const endMonth = document.getElementById("end-month").value;
        const endYear = document.getElementById("end-year").value;

        const startDate = new Date(startYear, startMonth, 1);
        const endDate = new Date(endYear, endMonth, 1);

        // debugger; 

        if (endDate < startDate) {
            // debugger;
            document.getElementById("new-calendar-form").reset();
            alert("Check your dates! The end date must equal to, or come after, the start date.")
        } else {
            const calendar = {
                title: document.getElementById("title").value,
                start_month: startMonth,
                start_year: startYear,
                end_month: endMonth,
                end_year: endYear
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
                if (calendar.message) {
                    alert(calendar.message);
                } else {
                    const c = new Calendar(calendar);
                    c.addToDom();
                    Calendar.calendarForm.style.display = "none";
                }
            })
        }

    }
    
    updateCalendar(id) {
        // debugger;
        const calendar = {
            id : id, 
            title: document.getElementById("title").value,
            // start_month: document.getElementById("start-month").value,
            // start_year: document.getElementById("start-year").value,
            // end_month: document.getElementById("end-month").value,
            // end_year: document.getElementById("end-year").value
        }
        
        fetch(`${this.endpoint}/calendars/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(calendar)
        })
        .then(resp => resp.json())
        .then(calendar => {
            const c = Calendar.all[0];
            c.updateCalendar(calendar);
            
            // reset form
            const button = document.getElementById("create");
            button.value = "Submit";    
            Calendar.calendarForm.style.display = "none";
            
            alert("Updated!");
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
            Calendar.calendarForm.style.display = "block";
            document.getElementById("calendar-form-to-hide").style.display = "block";
            Calendar.calendarContainer.innerHTML = "";
            Note.noteContainer.innerHTML = "";
            alert(json.message);
        })
    }
}