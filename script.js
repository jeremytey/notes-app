
// DATA LAYER (localStorage interaction)
// ============================================

function loadNotes () { //return array from localStorage
    try {
        const notesJSON = localStorage.getItem('notes-app-data');
        if (notesJSON) {
            const notesArray = JSON.parse(notesJSON);
            if (Array.isArray(notesArray)) {
                return notesArray;
            } else {
                console.warn('Data in localStorage is not an array. Returning empty array.');
                return [];
            }
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error loading notes from localStorage:', error);
        return null;
    }
};

function saveNotes (notesArray) { //save array to localStorage
    try {
        const notesJSON = JSON.stringify(notesArray);
        localStorage.setItem('notes-app-data', notesJSON);
    } catch (error) {
        console.error('Error saving notes to localStorage:', error);
    }
};

// ============================================
// STATE MANAGEMENT
// ============================================
/** 
let notes = [];
const storedNotes = loadNotes();
if (storedNotes) {
    notes = storedNotes;
} else {
    notes = [];
}


// ============================================
// CRUD OPERATIONS
// ============================================

FUNCTION createNote(title, content):
    CREATE note object with:
        - id: Date.now() (timestamp as unique ID)
        - title: title parameter
        - content: content parameter  
        - createdAt: new Date().toLocaleDateString() (formatted date string)
    PUSH note to notes array
    CALL saveNotes(notes)
    CALL renderNotes()




FUNCTION deleteNote(noteId):
    FILTER notes array to exclude note with matching id
    SET notes = filtered result
    CALL saveNotes(notes)
    CALL renderNotes()

FUNCTION editNote(noteId, newTitle, newContent):
    FIND note in notes array where note.id === noteId
    IF note found:
        UPDATE note.title = newTitle
        UPDATE note.content = newContent
        CALL saveNotes(notes)
        CALL renderNotes()


// ============================================
// DOM RENDERING
// ============================================

FUNCTION renderNotes():
    GET reference to #notes-container element
    CLEAR innerHTML of container
    
    IF notes array is empty:
        SET innerHTML to empty state message:
            '<div class="empty-state"><p>No notes yet. Create your first note!</p></div>'
    ELSE:
        FOR EACH note in notes array:
            CREATE div element with class "note-card"
            SET innerHTML with structure:
                - h3 with note.title
                - p with class "note-date" showing note.createdAt
                - p with note.content
                - div with class "note-actions" containing:
                    * Edit button with data-id attribute = note.id
                    * Delete button with data-id attribute = note.id
            APPEND the note-card div to container


// ============================================
// EVENT HANDLING
// ============================================

EVENT: When DOM content loaded:

    // Add Note Event
    GET reference to #add-note-btn
    ADD click listener:
        GET value from #note-title (trim whitespace)
        GET value from #note-content (trim whitespace)
        
        IF title is empty OR content is empty:
            ALERT "Please fill in both title and content"
            RETURN early (don't create note)
        
        CALL createNote(title, content)
        CLEAR #note-title value
        CLEAR #note-content value
        


    const addNoteBtn = document.getElementById('add-note-btn');
    addNoteBtn.addEventListener('click', function() {






    
    // Edit & Delete Events (using Event Delegation)
    GET reference to #notes-container
    ADD click listener:
        GET the clicked element (event.target)
        
        IF clicked element has class "btn-delete":
            GET data-id attribute value
            CONVERT to number
            CALL deleteNote(id)
        
        IF clicked element has class "btn-edit":
            GET data-id attribute value
            CONVERT to number
            
            FIND the note with matching id in notes array
            IF note found:
                PROMPT user with "Edit title:" (prefill with current note.title)
                PROMPT user with "Edit content:" (prefill with current note.content)
                
                IF user didn't cancel prompts:
                    TRIM the new values
                    IF newTitle is not empty AND newContent is not empty:
                        CALL editNote(id, newTitle, newContent)


// ============================================
// INITIALIZATION
// ============================================

WHEN page loads:
    CALL renderNotes() to display any existing notes
```

---

**🎯 Modern Dev Workflow Notes:**

1. **Event Delegation Usage:** We attach ONE listener to `#notes-container` 
   - Dynamically created buttons automatically get the handler
   - Reduces memory footprint
   - Follows the principle of "delegate to parent, identify child"

2. **Data Flow Pattern:**
```
   User Action → CRUD Function → saveNotes() → renderNotes()

   