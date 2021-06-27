const baseUrl = "http://127.0.0.1:3000";
const calendarService = new CalendarService(baseUrl);
const dayService = new DayService(baseUrl);
const noteService = new NoteService(baseUrl);

// dayService.getDays();

Calendar.renderForm();
Calendar.calendarForm.addEventListener("submit", handleCalendarSubmit);
Note.noteContainer.addEventListener("submit", handleNoteSubmit);

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