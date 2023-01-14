const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];


function getAllActors() {
    fetch('http://127.0.0.1:8800/admin/actors', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
        .then(data => {
            document.getElementById("actLst").innerHTML="";
            const lst = document.getElementById("actLst");

            if(data.msg) {
                alert(data.msg);
            } else {
                data.forEach(el => {
                    lst.innerHTML += `<li>ID: ${data.id}, Ime: ${data.first_name},
                     Prezime: ${data.last_name}, Pol: ${data.gender}</li>`;
                });
            }
    });

}

function deleteActor() {
    const id = document.getElementById('actID').value;

    fetch('http://127.0.0.1:8800/admin/actors/' + id, {
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
                    Prezime: ${data.last_name}, Pol: ${data.gender}</li>`;
                }  
        });

}


function getActorById() {
    const id = document.getElementById('actID').value;

    fetch('http://127.0.0.1:8800/admin/actors/' + id, {
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
                     Prezime: ${data.last_name},   Pol: ${data.gender}</li>`;
        }  
});


}

function initPostActor() {

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            first_name: document.getElementById('first_name').value,
            last_name: document.getElementById('last_name').value,
            gender: document.getElementById('gender').value,
            
        };

        document.getElementById('actLst').innerHTML = "";
        document.getElementById('first_name').value = "";
        document.getElementById('last_name').value = "";
        document.getElementById('gender').value = "";
        

        fetch('http://127.0.0.1:8800/admin/actors', {
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
                    document.getElementById('actLst').innerHTML +=  `<li>ID: ${el.id}, Ime: ${el.first_name}, 
                    Prezime: ${el.last_name},   Pol: ${el.gender}</li>`;
                }
            });
    });

}


function initUpdateActor() {
    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const id = document.getElementById('actID').value;

        const data = {
            first_name: document.getElementById('first_name').value,
            last_name: document.getElementById('last_name').value,
            gender: document.getElementById('president').value,
        };

        
        document.getElementById('actLst').innerHTML = "";

        document.getElementById('actID').value = "";

        document.getElementById('first_name').value = "";
        document.getElementById('last_name').value = "";
        document.getElementById('gender').value = "";

        fetch('http://127.0.0.1:8800/admin/actors/' + id, {
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
                    document.getElementById('actLst').innerHTML += `<li>ID: ${el.id}, Ime: ${el.first_name}, 
                    Prezime: ${el.last_name},   Pol: ${el.gender}</li>`;
                }
            });
    });   
    
}