const baseUrl = "http://127.0.0.1:3000";
const calendarService = new CalendarService(baseUrl);
const dayService = new DayService(baseUrl);
const noteService = new NoteService(baseUrl);

dayService.getDays();

Calendar.renderForm();
Calendar.calendarForm.addEventListener("submit", handleCalendarSubmit);
Note.noteContainer.addEventListener("submit", handleNoteSubmit);

function handleCalendarSubmit(event) {
    event.preventDefault();
    calendarService.createCalendar();
    event.target.reset();
}

function handleNoteSubmit(event) {
    event.preventDefault();
    Note.handleSubmit(event);
}