// Data Choreography Platform - Data Model
// This file handles data structure, storage, and retrieval

// Our main data storage - starts empty
// An array is a list that can hold multiple items - tables can be created by nesting arrays
let allNotes = [];

// Function to generate unique IDs for notes
function generateId() {
    // Simple unique ID using timestamp and random number
    return 'note-' + Date.now() + '-' + Math.random().toString(36).slice(2, 11);
}

// Function to create a new note object
function createNote(title, content) {
    // Timestamps using toISOString, which returns a standardized string version of a date and time
    const now = new Date().toISOString();
    
    return {
        id: generateId(),
        type: 'note',
        base_type: 'document',
        title: title,
        content: content,
        properties: {},
        tags: [],
        created: now,
        modified: now
    };
}

// Function to save a note
function saveNote(note) {
    // Add to our array
    // Uses push() method to add the note to the end of the array
    allNotes.push(note);
    
    // Save to browser storage
    // localStorage is a simple key-value store in the browser
    // .setItem(key, value) saves a value under a specific key (choreography-notes, in this case)
    // JSON.stringify() converts our array into a string for storage
    localStorage.setItem('choreography-notes', JSON.stringify(allNotes));
    
    console.log('Note saved:', note);
}

// Function to load all notes from storage
function loadNotes() {
    const stored = localStorage.getItem('choreography-notes');
    if (stored) {
        allNotes = JSON.parse(stored);
    }
    return allNotes;
}