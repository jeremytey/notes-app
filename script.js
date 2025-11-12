
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
        return [];
    }
};
console.log(loadNotes());

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
        saveNotes(notes);
        renderNotes();
    } 

    function deleteNote(NoteId) {
        notes = notes.filter(note => note.id !== NoteId);
        saveNotes(notes);
        renderNotes();
    }
       
    function editNote(NoteId, NewTitle, NewContent) {
        const targetNote = notes.find(note => note.id === NoteId);
        if (targetNote) {
            targetNote.title = NewTitle;
            targetNote.content = NewContent;
            saveNotes(notes);
            renderNotes();
        }
    }

// ============================================
// DOM RENDERING
// ============================================
    function renderNotes() {
    const notesContainer = document.querySelector('#notes-container');
    notesContainer.innerHTML = '';

    if (notes.length === 0) {
        const emptyStateMarkup = `
            <div class="empty-state">
                <p>No notes yet. Create your first note!</p>
            </div>
        `;
        notesContainer.innerHTML = emptyStateMarkup;
    } else {
        notes.forEach(note => {
            const noteCardMarkup = `
                <div class="note-card">
                    <h3>${note.title}</h3>
                    <p class="note-date">${note.createdAt}</p>
                    <p>${note.content}</p>
                    <div class="note-actions">
                        <button class="btn-edit" data-id="${note.id}">Edit</button>
                        <button class="btn-delete" data-id="${note.id}">Delete</button>
                    </div>
                </div>
            `;
            notesContainer.insertAdjacentHTML('beforeend', noteCardMarkup);
        }
        );
    }
}
// ============================================
// EVENT HANDLING
// ============================================

const domContentLoadedHandler = document.addEventListener('DOMContentLoaded', function() {
    const addNoteBtn = document.querySelector('#add-note-btn');
    const noteTitleInput = document.querySelector('#note-title');
    const noteContentInput = document.querySelector('#note-content');
    const notesContainer = document.querySelector('#notes-container');

    addNoteBtn.addEventListener('click', function() {
        const Title = noteTitleInput.value.trim();
        const Content = noteContentInput.value.trim();
        if (Title === '' || Content === '') {
            alert('Please fill in both title and content');
            return;
        } else{
            createNote(Title, Content);
            noteTitleInput.value = '';
            noteContentInput.value = '';
        }
    });

    
    
    // --- Edit & Delete Events Setup (Delegation) ---
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


// ============================================
// INITIALIZATION
// ============================================
    document.addEventListener('DOMContentLoaded', function() {
         renderNotes();
    });
    initializeNotes();
