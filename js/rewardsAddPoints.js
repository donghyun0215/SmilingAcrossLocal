const addingPoints = localStorage.getItem('user_points');
const userName = localStorage.getItem('user_name');
const userEmail = localStorage.getItem('user_email');

// Database creation
// Create an instance of a db object for us to store the open database in
let db;
// window.onload = function() {
    
// Open our database; it is created if it doesn't already exist
// (see onupgradeneeded below)
let request = window.indexedDB.open('smilingAcrossLocal', 2);
// onerror handler signifies that the database didn't open successfully

request.onsuccess = function() {
    db = request.result;
    if(localStorage.getItem('add')!=='false'){
        addPoints();
    }
};

function addPoints(){
    let transaction = db.transaction(['user_acc'], 'readwrite');

    // call an object store that's already been added to the database
    let objectStore = transaction.objectStore('user_acc');        
    objectStore.openCursor().onsuccess = function(e){
        let cursor = e.target.result;
        if (cursor) {
            if (cursor.value.user_name == userName) {
                const updateData = cursor.value;
                console.log(updateData);
                updateData.points = addingPoints;
                const request = cursor.update(updateData);

                request.onsuccess = function() {
                    // console.log("Redeem Successful");
                    window.location.href = "Maps.html"; 
                    localStorage.setItem("add",false);
                };

            }  
            cursor.continue();

        } 
    }
}
