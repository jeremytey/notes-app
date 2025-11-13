
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

    //logic for edit and delete buttons using event delegation (targeting parent container)
    notesContainer.addEventListener('click', function(event) {
        const ClickedElement = event.target;
        const noteID = ClickedElement.getAttribute('data-id');
        const noteIDNumber = Number(noteID);

        if (ClickedElement.classList.contains('btn-delete')) {
            deleteNote(noteIDNumber);
            return;
        }
        
        if (ClickedElement.classList.contains('btn-edit')) {
            const TargetNote = notes.find(note => note.id === noteIDNumber);
            if (TargetNote) {
                const NewTitle = prompt('Edit title:', TargetNote.title);
                const NewContent = prompt('Edit content:', TargetNote.content);
                if (NewTitle !== null && NewContent !== null) {
                    const TrimmedNewTitle = NewTitle.trim();
                    const TrimmedNewContent = NewContent.trim();
                    if (TrimmedNewTitle !== '' && TrimmedNewContent !== '') {
                        editNote(noteIDNumber, TrimmedNewTitle, TrimmedNewContent);
                    }
                }
            }
        }
    });


// ============================================
// INITIALIZATION
// ============================================
    document.addEventListener('DOMContentLoaded', function() {
         renderNotes();
    });
    initializeNotes();
});
