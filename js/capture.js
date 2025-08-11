// Data Choreography Platform - Capture
// This file handles note creation and form interactions

// Function to initialize form handling
function initializeCaptureForm() {
    const form = document.getElementById('note-form');
    
    // Listen for form submission
    // Listens for click on save button or pressing Enter key
    form.addEventListener('submit', handleFormSubmit);
}

// Function to handle when the form is submitted
function handleFormSubmit(event) {
    // Prevent the form from doing its default behavior (page refresh)
    event.preventDefault();
    
    // Get the form data
    const titleInput = document.getElementById('note-title');
    const contentInput = document.getElementById('note-content');
    
    // Trim whitespace and get values from inputs
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();
    
    // Basic validation - ensure title is provided
    if (!title) {
        alert('Please enter a title for your note');
        return;
    }
    
    // Create and save the note
    const note = createNote(title, content);
    saveNote(note);
    
    // Clear the form
    titleInput.value = '';
    contentInput.value = '';
    
    // Close the modal
    hideModal();
    
    // Refresh the notes display
    displayNotes();
    
    console.log('Form submitted successfully');
}