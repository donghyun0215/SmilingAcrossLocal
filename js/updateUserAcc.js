// Forms
const updateForm = document.querySelector("#updateForm");

// For Update
const userNameLoggedIn = localStorage.getItem('user_name');

const newUserName = document.querySelector('#updateUserName');
const newUserEmail = document.querySelector('#updateUserEmail');
const newUserPassword = document.querySelector('#newPassword');
const cfmNewPassword = document.querySelector('#cfmNewPassword');

// Database creation
// Create an instance of a db object for us to store the open database in
let db;
window.onload = function() {
    nameDisplayCheck();
    // Open our database; it is created if it doesn't already exist
    // (see onupgradeneeded below)
    let request = window.indexedDB.open('smilingAcrossLocal', 2);
    // onerror handler signifies that the database didn't open successfully

    request.onsuccess = function() {
        db = request.result;
        displayData();
    };
    
    // Update
    updateForm.onsubmit = update;
    
    function update(e){
        // console.log(localStorage.getItem('user_name'));
        e.preventDefault();
        if(newUserPassword.value!=='' && cfmNewPassword.value!=='' && newUserPassword.value == cfmNewPassword.value){
            let transaction = db.transaction(['user_acc'], 'readwrite');
        
            // call an object store that's already been added to the database
            let objectStore = transaction.objectStore('user_acc');        
            let successCounter = 0;
            objectStore.openCursor().onsuccess = function(e){
                let cursor = e.target.result;
                if (cursor) {
                    if (cursor.value.user_name == userNameLoggedIn) {
                        const updateData = cursor.value;
                        console.log(updateData);
                        updateData.user_name = newUserName.value;
                        const request1 = cursor.update(updateData);

                        updateData.email = newUserEmail.value;
                        const request2 = cursor.update(updateData);
                        
                        updateData.password = cfmNewPassword.value;
                        const request3 = cursor.update(updateData);
                        
                        request3.onerror = function() {
                            alert("Update Failed");
                        };

                        request3.onsuccess = function() {
                            // alert("Update Successful");
                            Swal.fire({    
                                icon: 'success',
                                title: 'Update Success!',
                                text:"Update Successful !",
                                confirmButtonColor: 'green'
                                }).then(function() {
                                    localStorage.setItem('user_name', newUserName.value);
                                    window.location.href = "index.html";
                                })
                        };
                    }  
                    cursor.continue();
                } 
            }
        }
    }; 
    function displayData() {
        let objectStore = db.transaction('user_acc').objectStore('user_acc');

        objectStore.openCursor().onsuccess = function(e) {
            // Get a reference to the cursor
            let cursor = e.target.result;

            // If there is still another data item to iterate through, keep running this code
            if(cursor) {
                // console.log(cursor.value)
                if (cursor.value.user_name == userNameLoggedIn) {
                    newUserName.value = cursor.value.user_name;
                    newUserEmail.value = cursor.value.email;
                }
                
                cursor.continue();
            } 
        };
    }; 
}