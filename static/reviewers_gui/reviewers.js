const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function getAllReviewers() {
    fetch('http://127.0.0.1:8500/admin/reviewers', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
            .then( data => {
                document.getElementById("revLst").innerHTML = "";
                const lst = document.getElementById('revLst');
                
                if(data.msg){
                    alert(data.msg);
                } else {
                    data.forEach( el => {
                        lst.innerHTML += `<li>ID: ${el.id}, Ime: ${el.first_name}, Prezime: ${el.last_name},  
                           Username: ${el.username}`;
                    });
                }
        });
    

}

function getReviewerById() {
    const id = document.getElementById('revID').value;

    fetch('http://127.0.0.1:8500/admin/reviewers/' + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
            .then( data => {
                document.getElementById("revLst").innerHTML = "";
                document.getElementById('revLst').value = "";
                const lst = document.getElementById('revLst');

                if(data.msg){
                    alert(data.msg);
                } else {
                    lst.innerHTML += `<li>ID: ${data.id}, Ime: ${data.first_name}, Prezime: ${data.last_name},  
                    Username: ${data.username}`;
                }
        });

}

function deleteReviewer() {
    const id = document.getElementById('revID').value;

    fetch('http://127.0.0.1:8500/admin/reviewers/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
            .then( data => {
                document.getElementById("revID").innerHTML = "";
                document.getElementById('revID').value = "";
                const lst = document.getElementById('revLst');
                
                if(data.msg){
                    alert(data.msg);
                } else {
                    lst.innerHTML += `<li>ID: ${data.id}, Ime: ${data.first_name}, Prezime: ${data.last_name},  
                    Username: ${data.username}`;
                }
        });

}

function initPostReviewer() {
    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            first_name: document.getElementById('first_name').value,
            last_name: document.getElementById('last_name').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            admin: document.getElementById('admin').checked,
            
        };

        document.getElementById('revLst').innerHTML = "";

        document.getElementById('first_name').value = "";
        document.getElementById('last_name').value = "";
        document.getElementById('username').value = "";
        document.getElementById('password').value = "";
        document.getElementById('admin').checked = false;

        fetch('http://127.0.0.1:8500/admin/reviewers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    document.getElementById('usrLst').innerHTML += `<li>ID: ${el.id}, Ime: ${el.first_name}, Prezime: ${el.last_name},  
                    Username: ${el.username}`;
                }
            });
    });   

}


function initUpdateReviewer() {
    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const id = document.getElementById('user_id').value;

        const data = {
            first_name: document.getElementById('first_name').value,
            last_name: document.getElementById('last_name').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            admin: document.getElementById('admin').checked,
        };

        document.getElementById('revLst').innerHTML = "";

        document.getElementById('revID').value = "";
        document.getElementById('first_name').value = "";
        document.getElementById('last_name').value = "";
        document.getElementById('username').value = "";
        document.getElementById('password').value = "";
        document.getElementById('admin').checked = false;


        fetch('http://127.0.0.1:8500/admin/reviewers/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then( res => res.json() )
            .then( el => {
                if (el.msg) {
                    alert(el.msg);
                } else {
                    document.getElementById('usrLst').innerHTML += `<li>ID: ${el.id}, Ime: ${el.first_name}, Prezime: ${el.last_name},  
                    Username: ${el.username}`;
                }
            });
    });   
    
}