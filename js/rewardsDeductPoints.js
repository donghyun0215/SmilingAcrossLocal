const userPoints = localStorage.getItem('user_points');
const userName = localStorage.getItem('user_name');
const userEmail = localStorage.getItem('user_email');

// Database creation
// Create an instance of a db object for us to store the open database in
let db;
    
nameDisplayCheck();
// Open our database; it is created if it doesn't already exist
let request = window.indexedDB.open('smilingAcrossLocal', 2);
// onerror handler signifies that the database didn't open successfully

request.onsuccess = function() {
    db = request.result;
    if(localStorage.getItem('redeemed')!=='false'){
        deductPoints();        
    }
};

function deductPoints(){
    let transaction = db.transaction(['user_acc'], 'readwrite');

    // call an object store that's already been added to the database
    let objectStore = transaction.objectStore('user_acc');        
    objectStore.openCursor().onsuccess = function(e){
        let cursor = e.target.result;
        if (cursor) {
            if (cursor.value.user_name == userName) {
                const updateData = cursor.value;
                console.log(updateData);
                updateData.points = userPoints;
                const request = cursor.update(updateData);

                request.onsuccess = function() {
                    window.location.href = "Rewards.html"; 
                    localStorage.setItem("redeemed",false);
                };

            }  
            cursor.continue();

        } 
    }
}
    
