// Data Choreography Platform - Main App
// This file handles the overall app initialization and basic interactions

// Wait for the page to fully load before running our code
// DOM is Document Object Model, which represents the page structure
document.addEventListener('DOMContentLoaded', function() {
    console.log('Data Choreography app loaded!');
    
    // Initialize modal functionality, function defined below
    initializeModal();
    
    // Initialize capture form
    // Function defined in capture.js
    initializeCaptureForm();
    
    // Load and display existing notes
    // Function defined below
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
    
    noteDiv.innerHTML = createDisplayModeHTML(note);

    // Add click handlers for links
    addLinkHandlers(noteDiv);

    // Add click handler to make the entire note editable
    noteDiv.addEventListener('click', function(event) {
        console.log('Note clicked!', note);

        // Replace the note display with edit form
        noteDiv.innerHTML = createEditModeHTML(note);

        const titleInput = noteDiv.querySelector('.edit-title');
        const contentTextarea = noteDiv.querySelector('.edit-content');

        titleInput.addEventListener('click', function(event) {
            event.stopPropagation();
        });

        contentTextarea.addEventListener('click', function(event) {
            event.stopPropagation();
        });

        // Connect cancel button
        const cancelBtn = noteDiv.querySelector('.cancel-edit-btn');
        cancelBtn.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent bubbling to parent
            console.log('Cancel clicked!');

            // Restore original display
            noteDiv.innerHTML = createDisplayModeHTML(note);
            addLinkHandlers(noteDiv); // Reattach link handlers
        });

        // Connect save button
        const saveBtn = noteDiv.querySelector('.save-edit-btn');
        saveBtn.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent bubbling to parent
            console.log('Save clicked!');

            // Get the edited values from the form
            const newTitle = titleInput.value;
            const newContent = contentTextarea.value;

            console.log('New title:', newTitle);
            console.log('New content:', newContent); 

            // Update the note object with new values
            note.title = newTitle;
            note.content = newContent;
            note.modified = new Date().toISOString(); // Update modified date

            // Save the updated note back to storage
            localStorage.setItem('choreography-notes', JSON.stringify(allNotes));

            // Restore original display
            noteDiv.innerHTML = createDisplayModeHTML(note);
            addLinkHandlers(noteDiv); // Reattach link handlers
        });
    });
    
    return noteDiv;
}

// Function to create edit mode HTML for a note
function createEditModeHTML(note) {
    return `
        <div class="note-edit-form">
            <input type="text" class="edit-title" value="${note.title}" placeholder="Note title">
            <textarea class="edit-content" placeholder="Note content">${note.content}</textarea>
            <div class="edit-buttons">
                <button class="save-edit-btn">Save</button>
                <button class="cancel-edit-btn">Cancel</button>
            </div>
        </div>
    `;
}

// Function to create display mode HTML for a note
function createDisplayModeHTML(note) {
    const createdDate = new Date(note.created).toLocaleDateString();

    return `
        <div class="note-title">${note.title}</div>
        <div class="note-content">${parseLinksInContent(note.content)}</div>
        <div class="note-meta">
            <span class="note-type">${note.type}</span>
            <span>Created: ${createdDate}</span>
        </div>
    `;
}

// Function to add event listeners to links within a note
function addLinkHandlers(noteDiv) {
    const referenceLinks = noteDiv.querySelectorAll('.reference-link');
    const wikiLinks = noteDiv.querySelectorAll('.wiki-link');

    referenceLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent bubbling to parent
            handleReferenceClick(event);
        });
    });

    wikiLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.stopPropagation(); // Prevent bubbling to parent
            handleWikiClick(event);
        });
    });
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
    event.stopPropagation(); // Prevent bubbling to parent
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
    event.stopPropagation(); // Prevent bubbling to parent
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