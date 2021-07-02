class Calendar {
    static all = [];
    static calendarContainer = document.getElementById("calendar-container");
    static calendarForm = document.getElementById("calendar-form-container");
    static calendarIndex = document.getElementById("calendar-index");
    static currentCalendarId;
    static monthSelector = `
        <option value="1">January</option>
        <option value="2">February</option>
        <option value="3">March</option>
        <option value="4">April</option>
        <option value="5">May</option>
        <option value="6">June</option>
        <option value="7">July</option>
        <option value="8">August</option>
        <option value="9">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
    `
    static weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    static indexButtons = [];
    
    static renderForm() {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        Calendar.calendarForm.innerHTML += `
            <p>Create a new calendar, or choose from the existing calendars below.</p>
            <form id="new-calendar-form">
                <label for="title">Title:</label> 
                <input type="text" id="title">
                <div id="calendar-form-to-hide">
                    <label for="start-month">Starting Month:</label> 
                    <select id="start-month">
                        ${this.monthSelector}
                    </select>
                    <label for="start-year">Starting Year:</label> 
                    <input type="text" id="start-year" value="${currentYear}">
                    <br>
                    <label for="end-month">Ending Month:</label> 
                    <select id="end-month">
                        ${this.monthSelector}
                    </select>
                    <label for="end-year">Ending Year:</label> 
                    <input type="text" id="end-year" value="${currentYear}">
                </div>
                <input type="submit" id="create">
            </form>
        `
    }

    static renderIndex() {
        Calendar.calendarIndex.innerHTML = "";
        const div = document.createElement("div");
        div.innerHTML += `
        <h3>Other Calendars</h3>
        `
        Calendar.indexButtons.forEach(calendar => {
            div.innerHTML += `
            <button class="calendar-button" data-id="${calendar.values.id}" id="calendar-button-${calendar.values.id}" ${calendar.disabled ? "disabled" : "enabled"}>${calendar.values.title}</button>
            `
        })
        Calendar.calendarIndex.append(div);
        Calendar.calendarIndex.addEventListener("click", this.handleIndexClick);
    }

    static handleIndexClick(event) {
        if (event.target.nodeName === "BUTTON") {
            Calendar.resetButtons();
            const calendar_id = parseInt(event.target.dataset.id);
            Calendar.currentCalendarId = calendar_id;
            calendarService.show(calendar_id);
    
            const newButton = Calendar.indexButtons.find(calendar => calendar.values.id === calendar_id);
            newButton.disabled = true;
            Calendar.renderIndex();
            window.scrollTo(0,0);
        }
    }
    
    static resetButtons() {
        if (this.currentCalendarId) {
            const oldButton = Calendar.indexButtons.find(calendar => calendar.values.id === this.currentCalendarId);
            oldButton.disabled = false;
        }
    }

    constructor({ id, title, start_month, start_year, end_month, end_year, notes }) {
        this.id = id;
        this.title = title;
        this.start_month = start_month;
        this.start_year = start_year;
        this.end_month = end_month;
        this.end_year = end_year;

        if (notes.length > 0) {
            this.notes = notes.map(note => new Note(note));
        } else {
            this.notes = [];
        }

        this.element = document.createElement("div");
        this.element.dataset.id = this.id;
        this.element.id = `calendar-${this.id}`;
        this.element.addEventListener("click", this.handleClick);
        
        Calendar.all.push(this);
    }
    
    titleHTML() {
        const title = document.createElement("h3");
        title.id = "calendar-title";
        title.innerHTML = this.titleText();
        return title;
    }
    
    calendarHTML() {
        if (this.element.innerText === "") {
            Calendar.weekdays.forEach(weekday => {
                this.element.innerHTML += `<div class="calendar-day header">${weekday}</div>`;
            })
            
            const startDate = new Date(this.start_year, this.start_month - 1, 1);
            const endDate = new Date(this.end_year, this.end_month, 0)
    
            const dates = [startDate];
            for (let day = 2; dates[dates.length - 1 ] < endDate; day++) {
                dates.push(new Date(this.start_year, this.start_month - 1, day));
            }
    
            const firstDay = startDate.getDay();
            if (firstDay !== 0) {
                for (let counter = 0; counter < firstDay; counter++) {
                    const newBlankDay = document.createElement("div");
                    newBlankDay.innerHTML = `<div class="calendar-day"></div>`;
                    newBlankDay.style.visibility = "hidden";
                    this.element.append(newBlankDay);
                }
            }
            
            dates.forEach((date, index) => {
                const currentDate = date.getDate();
                const currentMonth = date.getMonth();
                const currentYear = date.getFullYear();
                const currentDay = date.getDay();
                const d = new Day({ 
                    id: index, 
                    day: currentDate, 
                    month: currentMonth, 
                    year: currentYear, 
                    weekday: currentDay 
                });
                const newDayHTML = d.element.innerHTML === "" ? d.dayHTML() : d.element;
                this.element.append(newDayHTML);
                // noteService.createNote(date, this);
            })
            
            this.element.innerHTML += `
            <button id="calendar-new-button">New</button>
            <button id="calendar-delete-button">Delete</button>
            <button id="calendar-edit-button">Edit</button>
            `
        }
        return this.element;
    }
    
    addToDom() {
        Calendar.calendarContainer.innerHTML = "";
        Calendar.calendarContainer.append(this.titleHTML());
        Calendar.calendarContainer.append(this.calendarHTML());

        if (this.notes.length > 0) {
            this.notes.forEach(note => {
                note.addToDom();
            })
        }
    }
    
    handleClick(event) {
        // debugger;
        if (event.target.innerText === "New") {
            Calendar.calendarForm.style.display = "block";
            document.getElementById("calendar-form-to-hide").style.display = "block";
            Calendar.calendarContainer.innerHTML = "";
            Note.noteContainer.innerHTML = "";
            Calendar.resetButtons();
            Calendar.renderIndex();

            alert("Calendar saved. Please create a new calendar.");
            return;
        }
        if (event.target.innerText === "Delete") {
            calendarService.deleteCalendar(this.dataset.id);
            return;
        }
        if (event.target.innerText === "Edit") {
            Calendar.calendarForm.style.display = "block";
            document.getElementById("calendar-form-to-hide").style.display = "none";
            const button = document.getElementById("create");
            button.value = "Submit Changes";
            return;
        }
        if (event.target.innerText === "+") {
            // debugger;
            const calendar_id = event.path[3].dataset.id;
            const day_id = event.target.dataset.id;
            Note.renderForm(calendar_id, day_id);
            return;
        }
    }
    
    titleText() {
        let title = "";
        const start = `${Day.months[this.start_month - 1]}, ${this.start_year}`;
        const end = `${Day.months[this.end_month - 1]}, ${this.end_year}`
        if (start === end) {
            title = `${this.title}: ${start}`;
        } else {
            title = `${this.title}: ${start} - ${end}`;
        }
        return title;
    }

    updateCalendar(calendar) {
        this.title = calendar.title;
        const title = document.getElementById("calendar-title");
        title.innerHTML = this.titleText();
        
        // this.start_month = calendar.start_month;
        // this.start_year = calendar.start_year;
        // this.end_month = calendar.end_month;
        // this.end_year = calendar.end_year;
        
        return this;
    }
}