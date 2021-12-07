// Forms
const signupForm = document.querySelector('#signupForm'); 
const updateForm = document.querySelector("#updateForm");
const loginForm = document.querySelector('#loginForm'); 

// For Sign Up
const userName = document.querySelector('#userName');
const userEmail = document.querySelector('#userEmail');
const pwd1 = document.querySelector('#pwd1');
const cfmPwd = document.querySelector('#cfmPwd');

// For Log In
const loginEmail = document.querySelector('#loginEmail');
const loginPwd = document.querySelector('#loginPwd');

// For Update
const userNameLoggedIn = document.querySelector('#UserName');
const newUserName = document.querySelector('#updateUserName');
const newUserEmail = document.querySelector('#updateUserEmail');
const newUserPassword = document.querySelector('#newPassword');
const cfmNewPassword = document.querySelector('#cfmNewPassword');


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
        
    }
    
    // Setup the database tables if this has not already been done Usually only need to do this once it's like innit like that
    request.onupgradeneeded = function(e) {
        // Grab a reference to the opened database
        let db = e.target.result;

        //Create an objectStore to store our notes in (basically like a single table)
        //including a auto-incrementing key
        let objectStore = db.createObjectStore('user_acc', { keyPath: 'id', autoIncrement:true });

        // Define what data items the objectStore will contain
        objectStore.createIndex('user_name', 'user_name', { unique: false });
        objectStore.createIndex('email', 'email', { unique: false });
        objectStore.createIndex('password', 'password', { unique: false });
        objectStore.createIndex('points', 'points', { unique: false });

        let objectStoreNew = db.createObjectStore('travel_history', { keyPath: 'id', autoIncrement:true });

        // Define what data items the objectStore will contain
        objectStoreNew.createIndex('email', 'email', { unique: false });
        objectStoreNew.createIndex('location_name', 'location_name', { unique: false });
        objectStoreNew.createIndex('time_visited', 'time_visited', { unique: false });
        objectStoreNew.createIndex('category', 'category', { unique: false });
        
        // console.log('Database setup complete');
    };
    
    // Registration 
    if(signupForm!== null){
        signupForm.onsubmit = register;
    }

    // Login 
    if(loginForm!== null){
        loginForm.onsubmit = login;
    }

    // Define the register() function 
    function register(e) {
        // prevent default - we don't want the form to submit in the conventional way
        e.preventDefault();

        checkEmailUserName(userName.value,userEmail.value);

        // validate the forms first before allowing registration
        if (localStorage.getItem('checking')=='false'){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: localStorage.getItem('errMsg'),
                confirmButtonColor: 'tomato'
                })
            userName.value = '';
            userEmail.value = '';
            cfmPwd.value = '';
            pwd1.value = ''
        }
        else if ( (cfmPwd.value!=='' || pwd1.value!=='') && pwd1.value === cfmPwd.value ){
            // grab the values entered into the form fields and store them in an object ready for being inserted into the DB
            let newItem = { user_name: userName.value, 
                            email: userEmail.value, 
                            password: cfmPwd.value, 
                            points: 100 };
                
            // open a read/write db transaction, ready for registration
            let transaction = db.transaction(['user_acc'], 'readwrite');
        
            // call an object store that's already been added to the database
            let objectStore = transaction.objectStore('user_acc');

            // Make a request to add our newItem object to the object store
            let request = objectStore.add(newItem);
            
            request.onsuccess = function() {
                // Clear the form, ready for adding the next entry
                
               
                cfmPwd.value='';
                pwd1.value='';
            };
            // Report on the success of the transaction completing, when everything is done
            transaction.oncomplete = function() {
                var usernamee = userName.value;
                // alert('Registration Successful '+usernamee+' !');
                // Session
                localStorage.setItem('user_name', userName.value);
                localStorage.setItem('user_points', 100);
                localStorage.setItem('user_email', userEmail.value);
                localStorage.setItem("redeemed",false);
                Swal.fire({    
                    icon: 'success',
                    title: 'Registration Success!',
                    text:"Wecome "+usernamee+" !",
                    confirmButtonColor: 'green'
                    }).then(function() {
                        window.location.href = "index.html";
                    })
                           
                userName.value = '';
            };
            transaction.onerror = function() {
                console.log('Transaction not opened due to error');
            };
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid Password !',
                confirmButtonColor: 'tomato'
                })
        }
    };
    // Admin Account
    function createAdmin_Once() {
        var adminCount = 0;
        let newItem = { user_name: 'Admin', 
            email: 'sunjun@admin.com', 
            password: '654321', 
            points:1500 };
        let transaction = db.transaction(['user_acc'], 'readwrite');
        let objectStore = transaction.objectStore('user_acc');
        objectStore.openCursor().onsuccess = function(e) {
            // Get a reference to the cursor
            let cursor = e.target.result;
            if(cursor) {
                if(cursor.value.user_name == 'Admin'){
                    adminCount++;
                }
                
                cursor.continue();
            }else {
                if(adminCount==0){
                    objectStore.add(newItem);
                    return
                };
            }
            
        }
    }
    
    // Check for similar account
    function checkEmailUserName(username,email){
        var userNameFound = 0;
        var userEmailFound = 0;
        let transaction = db.transaction('user_acc');
        let objectStore = transaction.objectStore('user_acc');
        objectStore.openCursor().onsuccess = function(e) {
            // Get a reference to the cursor
            let cursor = e.target.result;
            if(cursor) {
                if(cursor.value.user_name == username){
                    userNameFound ++;
                } 
                if (cursor.value.email == email){
                    userEmailFound ++;
                } 
                cursor.continue();
            } else {
                console.log('')
            } 
            console.log(userNameFound, userEmailFound);
            if(userNameFound!==0 || userEmailFound!==0){
                localStorage.setItem('checking', false);
                localStorage.setItem('errMsg', 'Username / Email already exist !');
            } else {
                localStorage.setItem('checking', true);
            }
            
        }
        
    }
    // Login Function 
    function login(e){
        e.preventDefault();
        let transaction = db.transaction(['user_acc'], 'readwrite');
        
        // call an object store that's already been added to the database
        let objectStore = transaction.objectStore('user_acc');

        objectStore.openCursor().onsuccess = function(e) {
            // Get a reference to the cursor
            let cursor = e.target.result;

            // If there is still another data item to iterate through, keep running this code
            if(cursor) {
                if( (loginEmail.value == cursor.value.email||loginEmail.value == cursor.value.user_name) && loginPwd.value == cursor.value.password){
                    var currentUserName = cursor.value.user_name;
                    var currentEmail = cursor.value.email;
                    var currentPoints = cursor.value.points;
                    Swal.fire({    
                        icon: 'success',
                        title: 'Login Success!',
                        text:"Wecome "+currentUserName+" !",
                        confirmButtonColor: 'green'
                        }).then(function() {
                            window.location.href = "index.html";
                        })
                    // Session
                    localStorage.setItem('user_name', currentUserName);
                    localStorage.setItem('user_points', currentPoints);
                    localStorage.setItem('user_email', currentEmail);
                    
                    return
                } 
                
                cursor.continue();
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Invalid Password/Username/Email !',
                    confirmButtonColor: 'tomato'
                    })
                // alert('Invalid Password/Username/Email details !');
            }
        }
    };
    
    // Checking
    // to console.log data that's been added into the database see what is inside the database
    // creating Admin account
    function displayData() {
        createAdmin_Once();

        let objectStore = db.transaction(['user_acc'],'readwrite').objectStore('user_acc');

        objectStore.openCursor().onsuccess = function(e) {
            // Get a reference to the cursor
            let cursor = e.target.result;

            // If there is still another data item to iterate through, keep running this code
            if(cursor) {
                cursor.continue();
            } 
        };
        //objectStore.clear();

    }
}
