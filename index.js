const baseUrl = "http://127.0.0.1:3000";
const calendarService = new CalendarService(baseUrl);
const dayService = new DayService(baseUrl);
const noteService = new NoteService(baseUrl);

// dayService.getDays();

calendarService.index();
Calendar.renderForm();
Calendar.calendarForm.addEventListener("submit", handleCalendarSubmit);
Note.noteContainer.addEventListener("submit", handleNoteSubmit);

// search feature
document.getElementById("search").addEventListener("keyup", (event) => {
    // debugger;
    const searchValue = document.getElementById("search-value").value;
    const newIndexButtons = Calendar.indexButtons.filter(button => {
        // debugger;
        return button.values.title.toLowerCase().includes(searchValue.toLowerCase());
        // button.value.includes(searchValue)
    });
    
    Calendar.calendarIndex.innerHTML = "";
    const div = document.createElement("div");
    
    newIndexButtons.forEach(calendar => {
        div.innerHTML += `
        <button class="calendar-button" data-id="${calendar.values.id}" id="calendar-button-${calendar.values.id}" ${calendar.disabled ? "disabled" : "enabled"}>${calendar.values.title}</button>
        `
    })
    Calendar.calendarIndex.append(div);
    // Calendar.calendarIndex.addEventListener("click", this.handleIndexClick);

    // debugger;
})

function handleCalendarSubmit(event) {
    // debugger;
    event.preventDefault();
    if (event.submitter.value !== "Submit Changes") {
        calendarService.createCalendar();
    } else {
        const calendar_id = Calendar.calendarContainer.childNodes[1].dataset.id;
        calendarService.updateCalendar(calendar_id);
    }
    event.target.reset();
}

function handleNoteSubmit(event) {
    event.preventDefault();
    Note.handleSubmit(event);
}