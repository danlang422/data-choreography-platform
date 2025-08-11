// JavaScript comments use // for single lines or /* */ for blocks
        let editIndex = null;  // This will hold the index of the note being edited, if any

        // Load notes when page loads - this runs automatically when browser finishes loading the page
        window.onload = function() {
            loadNotes();
        };
        
        // Function that runs when "Save Note" button is clicked
        function saveNote() {
            // document = JavaScript's way to interact with the HTML page
            // getElementById = finds the element with the specified id
            // .value = gets the text that user typed in the text editor
            const noteText = document.getElementById('noteInput').innerHTML;
            
            // Check if the note is empty (trim removes spaces from beginning/end)
            if (noteText.trim() === '') {
                alert('Please write something first!');
                return;  // Exit the function early if no text
            }
            
            // Get existing notes from browser's localStorage
            // localStorage can only store strings, not JavaScript objects
            // JSON.parse converts the JSON string back to a JavaScript object/array
            // || '[]' provides empty array as default if no notes exist yet
            let notes = JSON.parse(localStorage.getItem('myNotes') || '[]');
            
            if (editIndex !==null) {
                // Update existing note if editIndex is set
                notes[editIndex] = {
                    text: noteText,
                    timestamp: new Date().toLocaleString()
                };
                editIndex = null;  // Reset editIndex after saving
            } else {
                // Create a new note object with text and timestamp
                notes.push({
                    text: noteText,
                    timestamp: new Date().toLocaleString()
                });
                }
            
            // Save the updated array back to localStorage
            // JSON.stringify converts JavaScript objects to JSON string format
            // This is the actual "saving" - storing as string in browser memory
            localStorage.setItem('myNotes', JSON.stringify(notes));
            
            // Clear the textarea after saving
            document.getElementById('noteInput').innerHTML = '';
            
            // Refresh the display to show the new note
            loadNotes();
        }
        
        // Function to format text in the note editor
        function formatText(command) {
            document.getElementById('noteInput').focus();  // Make sure the editor is focused
            document.execCommand(command, false, null);  // Apply the formatting command (like bold or italic)
        }

        // Function that loads and displays all saved notes
        function loadNotes() {
            // Get notes from localStorage and convert JSON string back to JavaScript objects
            const notes = JSON.parse(localStorage.getItem('myNotes') || '[]');
            
            // Find the div where we want to display notes
            const noteDisplay = document.getElementById('noteDisplay');
            
            // If no notes exist, show a message
            if (notes.length === 0) {
                noteDisplay.innerHTML = '<p>No notes yet. Create your first note above!</p>';
                return;
            }
            
            // Create HTML for all notes and display them
            // notes.map() goes through each note object in the array
            // (note, index) means: note = the current note object, index = its position (0, 1, 2...)
            // The backticks `` allow us to embed variables with ${} syntax
            noteDisplay.innerHTML = notes.map((note, index) => `
                <div class="note" onclick="editNote(${index})">
                    <p>${note.text}</p>
                    <small>Created: ${note.timestamp}</small>
                    <button onclick="deleteNote(${index})" style="float: right; background: #dc3545;">Delete</button>
                </div>
            `).join('');  // .join('') combines all the HTML pieces into one big string
            
            // Note: Delete buttons get both the general button styles AND inline red background
            // The index gets embedded in onclick="deleteNote(0)", onclick="deleteNote(1)", etc.
        }
        
        function editNote(index) {
            let notes = JSON.parse(localStorage.getItem('myNotes') || '[]');
            let noteToEdit = notes[index];
            document.getElementById('noteInput').innerHTML = noteToEdit.text;  // Set editor to note text

            editIndex = index;  // Store the index of the note being edited
        }
        // Function that deletes a specific note based on its array position
        function deleteNote(index) {
            // Load current notes from localStorage
            let notes = JSON.parse(localStorage.getItem('myNotes') || '[]');
            
            // Remove 1 item at the specified index position
            // splice(index, 1) means: start at 'index', remove 1 item
            notes.splice(index, 1);
            
            // Save the updated array back to localStorage
            localStorage.setItem('myNotes', JSON.stringify(notes));
            
            // Refresh the display to show updated list
            loadNotes();
        }

        function showEditor() {
            document.getElementById('editorPanel').style.display = 'block';  
        }

         function hideEditor() {
            document.getElementById('editorPanel').style.display = 'none';
            // Clear the editor when closing
            document.getElementById('noteInput').innerHTML = '';
            editIndex = null; // Reset edit state
        }

        // Function that clears all notes
        function clearNotes() {
            // confirm() shows a yes/no dialog - returns true if user clicks OK
            if (confirm('Are you sure you want to delete all notes?')) {
                localStorage.removeItem('myNotes');  // Delete the entire stored data
                loadNotes();  // Refresh display (will show "no notes" message)
            }
        }
        
        // Bonus feature: Allow Ctrl+Enter to save notes
        // addEventListener lets us listen for keyboard events on the text editor
        document.getElementById('noteInput').addEventListener('keydown', function(event) {
            // Check if Ctrl key AND Enter key are pressed together
            if (event.ctrlKey && event.key === 'Enter') {
                saveNote();  // Save the note
            }
        });