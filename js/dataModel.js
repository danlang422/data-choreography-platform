// Data Choreography Platform - Data Model
// This file handles data structure, storage, and retrieval

// Our main data storage - starts empty
let allNotes = [];

// Function to generate unique IDs for notes
function generateId() {
    // Simple unique ID using timestamp and random number
    return 'note-' + Date.now() + '-' + Math.random().toString(36).slice(2, 11);
}

// Function to create a new note object
function createNote(title, content) {
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
    allNotes.push(note);
    
    // Save to browser storage
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