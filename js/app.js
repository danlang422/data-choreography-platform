// Data Choreography Platform - Main App
// This file handles the overall app initialization and basic interactions

// Wait for the page to fully load before running our code
document.addEventListener('DOMContentLoaded', function() {
    console.log('Data Choreography app loaded!');
    
    // Initialize modal functionality
    initializeModal();
    
    // Initialize capture form
    initializeCaptureForm();
    
    // Load and display existing notes
    displayNotes();
});

// Function to set up modal show/hide behavior
// Functions are reusable blocks of code
function initializeModal() {
    // Get references to the elements we need
    // Const declares variables that won't change
    const captureBtn = document.getElementById('capture-btn');
    const modal = document.getElementById('capture-modal');
    const closeBtn = document.getElementById('close-modal');
    const cancelBtn = document.getElementById('cancel-btn');
    
    // Set up event listeners
    // On click, show or hide the modal
    captureBtn.addEventListener('click', showModal);
    closeBtn.addEventListener('click', hideModal);
    cancelBtn.addEventListener('click', hideModal);
}
// Function to show the modal
function showModal() {
    const modal = document.getElementById('capture-modal');
    modal.classList.remove('hidden');
}

// Function to hide the modal
function hideModal() {
    const modal = document.getElementById('capture-modal');
    // Add 'hidden' class to hide the modal
    modal.classList.add('hidden');
}
// Function to display all notes in the list
function displayNotes() {
    const notesList = document.getElementById('notes-list');
    const notes = loadNotes();
    
    // Clear existing notes
    notesList.innerHTML = '';
    
    if (notes.length === 0) {
        // Show empty state message
        notesList.innerHTML = '<div class="empty-state">No notes yet. Click "+ Add Note" to get started!</div>';
        return;
    }
    
    // Create HTML for each note
    notes.forEach(note => {
        const noteElement = createNoteElement(note);
        notesList.appendChild(noteElement);
    });
}

// Function to create HTML element for a single note
function createNoteElement(note) {
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note-item';
    
    const createdDate = new Date(note.created).toLocaleDateString();
    
    noteDiv.innerHTML = `
        <div class="note-title">${note.title}</div>
        <div class="note-content">${parseLinksInContent(note.content)}</div>
        <div class="note-meta">
            <span class="note-type">${note.type}</span>
            <span>Created: ${createdDate}</span>
        </div>
    `;
    // Add click handlers for links
    const referenceLinks = noteDiv.querySelectorAll('.reference-link');
    const wikiLinks = noteDiv.querySelectorAll('.wiki-link');

    referenceLinks.forEach(link => {
        link.addEventListener('click', handleReferenceClick);
    });

    wikiLinks.forEach(link => {
        link.addEventListener('click', handleWikiClick);
    });
    
    return noteDiv;
}
// Function to parse @references and [[links]] in text content
function parseLinksInContent(content) {
    if (!content) return 'No content';
    
    let processedContent = content;
    
    // Parse @[title](id) format
    // This regex finds patterns like @[My Note](note-123)
    processedContent = processedContent.replace(
        /@\[([^\]]+)\]\(([^)]+)\)/g, 
        '<span class="reference-link" data-target-id="$2">@$1</span>'
    );
    
    // Parse [[title]] format  
    // This regex finds patterns like [[My Other Note]]
    processedContent = processedContent.replace(
        /\[\[([^\]]+)\]\]/g,
        '<span class="wiki-link" data-target-title="$1">[[$1]]</span>'
    );
    
    return processedContent;
}
// Function to handle clicks on @reference links
function handleReferenceClick(event) {
    const targetId = event.target.getAttribute('data-target-id');
    const notes = loadNotes();
    const targetNote = notes.find(note => note.id === targetId);
    
    if (targetNote) {
        scrollToNote(targetId);
    } else {
        alert(`Note with ID "${targetId}" not found`);
    }
}

// Function to handle clicks on [[wiki]] links  
function handleWikiClick(event) {
    const targetTitle = event.target.getAttribute('data-target-title');
    const notes = loadNotes();
    const targetNote = notes.find(note => note.title === targetTitle);
    
    if (targetNote) {
        scrollToNote(targetNote.id);
    } else {
        alert(`Note titled "${targetTitle}" not found`);
    }
}

// Function to scroll to and highlight a note
function scrollToNote(noteId) {
    alert(`Would scroll to note: ${noteId}`);
}