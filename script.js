
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
        const notesJSON = JSON.stringify(notesArray); //JS array objects to JSON 
        localStorage.setItem('notes-app-data', notesJSON);
    } catch (error) {
        console.error('Error saving notes to localStorage:', error);
    }
};

// ============================================
// STATE MANAGEMENT
// ============================================
    let notes = []  
    function initializeNotes() {
    try{
        let storedNotes = loadNotes();
        if (storedNotes !== null) {
            notes = storedNotes;
        } 
        } catch (error) {
        console.error('Error initializing notes:', error);
        notes = [];
        }
    }



// ============================================
// CRUD OPERATIONS
// ============================================
    function createNote(Title, Content) {
        const NoteObject = {
            id: Date.now(), // Unique identifier (number)
            title: Title,
            content: Content,
            createdAt: new Date().toLocaleDateString() // Readable date string
        };

        notes.push(NoteObject);
        saveNotes(initializeNotes());
        renderNotes();
    }


    /** 

FUNCTION deleteNote(NoteId):
    // 1. Update State
    SET notes = notes array FILTERED by removing the note WHERE note.id EQUALS NoteId
    
    // 2. Update Persistence
    CALL saveNotes(notes)
    
    // 3. Update View
    CALL renderNotes()


FUNCTION editNote(NoteId, NewTitle, NewContent):
    // 1. Locate Target
    FIND note in notes array WHERE note.id EQUALS NoteId
    
    // 2. Update Data and Persistence
    IF note IS FOUND:
        SET note.title = NewTitle
        SET note.content = NewContent
        CALL saveNotes(notes)
        
        // 3. Update View
        CALL renderNotes()


// ============================================
// DOM RENDERING
// ============================================

FUNCTION renderNotes():
    // 1. Setup
    GET element reference TO #notes-container
    CLEAR inner HTML of #notes-container
    
    // 2. Conditional Rendering (Empty State)
    IF notes array IS empty:
        CREATE EmptyStateMarkup: '<div class="empty-state"><p>No notes yet. Create your first note!</p></div>'
        SET inner HTML of #notes-container TO EmptyStateMarkup
    
    // 3. Rendering List
    ELSE:
        FOR EACH NoteObject in notes array:
            // a. Construct the HTML structure for the note card
            CREATE NoteCardMarkup WITH:
                - Outer div (class "note-card")
                - h3 content EQUALS NoteObject.title
                - p (class "note-date") content EQUALS NoteObject.createdAt
                - p content EQUALS NoteObject.content
                - Action div (class "note-actions") CONTAINING:
                    - Edit button (class "btn-edit", data-id EQUALS NoteObject.id)
                    - Delete button (class "btn-delete", data-id EQUALS NoteObject.id)
            
            // b. Insert into DOM
            APPEND NoteCardMarkup TO #notes-container


// ============================================
// EVENT HANDLING
// ============================================

EVENT: When DOM content is fully loaded:

    // --- Add Note Event Setup ---
    GET element reference TO #add-note-btn
    ADD CLICK listener TO #add-note-btn:
        
        // a. Retrieve and Prepare Input
        GET trimmed Title FROM input #note-title
        GET trimmed Content FROM textarea #note-content
        
        // b. Validation
        IF Title IS empty OR Content IS empty:
            ALERT message: "Please fill in both title and content"
            RETURN
        
        // c. Execution and Cleanup
        CALL createNote(Title, Content)
        CLEAR value of #note-title
        CLEAR value of #note-content

    
    // --- Edit & Delete Events Setup (Delegation) ---
    GET element reference TO #notes-container
    ADD CLICK listener TO #notes-container:
        
        SET ClickedElement = Event.target
        
        // Identify the note ID from the clicked action button
        SET NoteId = GET data-id attribute FROM ClickedElement
        SET NoteIdNumber = CONVERT NoteId TO Number
        
        
        // --- DELETE Logic ---
        IF ClickedElement HAS class "btn-delete":
            CALL deleteNote(NoteIdNumber)
        
        
        // --- EDIT Logic ---
        IF ClickedElement HAS class "btn-edit":
            
            FIND TargetNote in notes array WHERE note.id EQUALS NoteIdNumber
            
            IF TargetNote IS FOUND:
                // Prompt User for new values
                SET NewTitle = PROMPT user with "Edit title:" (prefill with TargetNote.title)
                SET NewContent = PROMPT user with "Edit content:" (prefill with TargetNote.content)
                
                // Process and Validate New Input
                IF NewTitle IS NOT NULL AND NewContent IS NOT NULL: // Check if user hit OK/didn't cancel
                    SET TrimmedNewTitle = TRIM NewTitle
                    SET TrimmedNewContent = TRIM NewContent
                    
                    IF TrimmedNewTitle IS NOT empty AND TrimmedNewContent IS NOT empty:
                        CALL editNote(NoteIdNumber, TrimmedNewTitle, TrimmedNewContent)

*/
// ============================================
// INITIALIZATION
// ============================================
    document.addEventListener('DOMContentLoaded', async() => {
        await renderNotes();
    });
