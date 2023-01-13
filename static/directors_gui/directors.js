const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];


function getAllDirectors() {
    fetch('http://127.0.0.1:8500/admin/directors', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
            .then( data => {
                document.getElementById("dirLst").innerHTML = "";
                const lst = document.getElementById('dirLst');
                
                if(data.msg){
                    alert(data.msg);
                } else {
                    data.forEach( el => {
                        lst.innerHTML += `<li>ID: ${data.id}, Ime: ${data.first_name},
                        Prezime: ${data.last_name}`;
                    });
                }
        });

}

function deleteDirector() {
    const id = document.getElementById('orgId').value;

    fetch('http://127.0.0.1:8500/admin/directors/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
            .then( data => {
                document.getElementById("actLst").innerHTML = "";
                document.getElementById('actLst').value = "";
                const lst = document.getElementById('actLst');
                
                if(data.msg){
                    alert(data.msg);
                } else {
                    lst.innerHTML += `<li>ID: ${data.id}, Ime: ${data.first_name},
                    Prezime: ${data.last_name}`;
                }  
        });

}


function getDirectorById() {
    const id = document.getElementById('dirID').value;

    fetch('http://127.0.0.1:8500/admin/organisers/' + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
            .then( data => {
                document.getElementById("dirLst").innerHTML = "";
                document.getElementById('dirID').value = "";
                const lst = document.getElementById('orgLst');
                
                if(data.msg){
                    alert(data.msg);
                } else {
                    lst.innerHTML += `<li>ID: ${data.id}, Ime: ${data.first_name},
                    Prezime: ${data.last_name}`;
                }  
        });

}

function initPostDirector() {
    
    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            first_name: document.getElementById('first_name').value,
            last_name: document.getElementById('last_name').value,
            
        };

        document.getElementById('dirLst').innerHTML = "";
        document.getElementById('first_name').value = "";
        document.getElementById('last_name').value = "";
       
        

        fetch('http://127.0.0.1:8500/admin/', {
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
                    document.getElementById('actLst').innerHTML +=`<li>ID: ${data.id}, Ime: ${data.first_name},
                    Prezime: ${data.last_name}`;
                }
            });
    });

}


function initUpdateDirector() {
    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const id = document.getElementById('dirID').value;

        const data = {
            first_name: document.getElementById('first_name').value,
            last_name: document.getElementById('last_name').value,
            
        };

        
        document.getElementById('dirLst').innerHTML = "";

        document.getElementById('first_name').value = "";
        document.getElementById('last_name').value = "";
        
        fetch('http://127.0.0.1:8500/admin/directors/' + id, {
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
                    document.getElementById('actLst').innerHTML += `<li>ID: ${data.id}, Ime: ${data.first_name},
                    Prezime: ${data.last_name}`;
                }
            });
    });   
    
}