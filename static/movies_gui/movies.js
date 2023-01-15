const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function getAllMovies() {
    fetch('http://127.0.0.1:8800/admin/movies', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
        .then(data => {
            document.getElementById("movLst").innerHTML="";
            const lst = document.getElementById("movLst");

            /* if(data.msg) {
                alert(data.msg);
            } else { */
                data.forEach(el => {
                    lst.innerHTML += `<li>ID: ${el.id}, Naziv filma: ${el.mov_title},
                     Jezik: ${el.mov_lang}, Godina: ${el.mov_year}</li>, Vreme trajanja: ${el.mov_time}, 
                     Drzava: ${el.mov_rel_country}`;
                });
           // }
    });

}

function getMovieById() {
    const id = document.getElementById('movID').value;

    fetch('http://127.0.0.1:8800/admin/movies/' + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
            .then( data => {
                document.getElementById("movLst").innerHTML = "";
                document.getElementById('movLst').value = "";
                const lst = document.getElementById('movLst');
        
                if(data.msg){
                    alert(data.msg);
                } else {
                     lst.innerHTML += `<li>ID: ${data.id}, Naziv filma: ${data.mov_title},
                     Jezik: ${data.mov_lang}, Godina: ${data.mov_year}</li>, Vreme trajanja: ${data.mov_time}, 
                     Drzava: ${data.mov_rel_country}`;
        }  
    });


    
}

function deleteMovie() {
    const id = document.getElementById('movID').value;

    fetch('http://127.0.0.1:8800/admin/movies/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
            .then( data => {
                document.getElementById("movLst").innerHTML = "";
                document.getElementById('movLst').value = "";
                const lst = document.getElementById('movLst');
                
                if(data.msg){
                    alert(data.msg);
                } else {
                    lst.innerHTML += `<li>ID: ${data.id}, Ime: ${data.first_name},
                    Prezime: ${data.last_name}, Pol: ${data.gender}</li>`;
                }  
        });


}

function initPostMovie() {
    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            mov_title: document.getElementById('mov_title').value,
            mov_lang: document.getElementById('mov_lang').value,
            mov_year: document.getElementById('mov_year').value,
            mov_time: document.getElementById('mov_time').value,
            mov_rel_country: document.getElementById('mov_rel_country').value,


            
        };

        document.getElementById('movLst').innerHTML = "";

        document.getElementById('mov_title').value = "";
        document.getElementById('mov_lang').value = "";
        document.getElementById('mov_year').value = "";
        document.getElementById('mov_time').value = "";
        document.getElementById('mov_rel_country').value = "";

        

        fetch('http://127.0.0.1:8800/admin/movies', {
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
                    document.getElementById('movLst').innerHTML += `<li>ID: ${el.id}, Naziv filma: ${el.mov_title},
                    Jezik: ${el.mov_lang}, Godina: ${el.mov_year}</li>, Vreme trajanja: ${el.mov_time}, 
                    Drzava: ${el.mov_rel_country}`;
                }
            });
    });


}


function initUpdateMovie() {
    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const id = document.getElementById('movID').value;

        const data = {
            mov_title: document.getElementById('mov_title').value,
            mov_lang: document.getElementById('mov_lang').value,
            mov_year: document.getElementById('mov_year').value,
            mov_time: document.getElementById('mov_time').value,
            mov_rel_country: document.getElementById('mov_rel_country').value,
        };

        
        document.getElementById('movLst').innerHTML = "";
        document.getElementById('movID').innerHTML = "";
        

        document.getElementById('mov_title').value = "";
        document.getElementById('mov_lang').value = "";
        document.getElementById('mov_year').value = "";
        document.getElementById('mov_time').value = "";
        document.getElementById('mov_rel_country').value = "";

        fetch('http://127.0.0.1:8800/admin/movies/' + id, {
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
                    document.getElementById('movLst').innerHTML += `<li>ID: ${el.id}, Naziv filma: ${el.mov_title},
                    Jezik: ${el.mov_lang}, Godina: ${el.mov_year}</li>, Vreme trajanja: ${el.mov_time}, 
                    Drzava: ${el.mov_rel_country}`;
                }
            });
    });   
    
}