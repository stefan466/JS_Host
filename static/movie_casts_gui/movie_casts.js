const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];


function getAllMovieCasts() {
    fetch('http://127.0.0.1:8800/admin/movie_casts', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
        .then(data => {
            document.getElementById("mcLst").innerHTML="";
            const lst = document.getElementById("mcLst");

            if(data.msg) {
                alert(data.msg);
            } else {
                data.forEach(el => {
                    lst.innerHTML += `<li>Uloga ID: ${el.id}, Movie ID: ${el.movieID}, Glumac ID: ${el.actorID},
                    Uloga: ${el.role}`;
                });
            }
    });

}

function deleteMovieCast() {

}


function getMovieCastsById() {
    const id = document.getElementById('movID').value;

    fetch('http://127.0.0.1:8800/admin/movie_casts/' + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
            .then( data => {
                document.getElementById("mcLst").innerHTML = "";
                document.getElementById('mcLst').value = "";
                const lst = document.getElementById('mcLst');
        
                if(data.msg){
                    alert(data.msg);
                } else {
                     lst.innerHTML += `<li>Uloga ID: ${data.id}, Movie ID: ${data.movieID}, Glumac ID: ${data.actorID},
                     Uloga: ${data.role}`;
        }  
});

}

function initPostMovieCast() {
    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            role: document.getElementById('role').value,
            movieID: document.getElementById('movID').value,
            actorID: document.getElementById('actID').value
            
        };

        document.getElementById('mcLst').innerHTML = "";
        document.getElementById('role').value = "";
        document.getElementById('movID').value = "";

        document.getElementById('actID').value = "";

      
        

        fetch('http://127.0.0.1:8800/admin/movie_casts', {
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
                    document.getElementById('mcLst').innerHTML +=  `<li>Uloga ID: ${el.id} Movie ID: ${el.movieID}, Glumac ID: ${el.actorID},
                    Uloga: ${el.role}`;
                }
            });
    });

}


function  initUpdateMovieCast() {

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const id = document.getElementById('mcID').value;

        const data = {
            movieID: document.getElementById('movID').value,
            actorID: document.getElementById('actID').value,
            role: document.getElementById('role').value,
        };

        
        document.getElementById('mcLst').innerHTML = "";

        document.getElementById('mcID').value = "";

        document.getElementById('movID').value = "";
        document.getElementById('actID').value = "";
        document.getElementById('role').value = "";

        fetch('http://127.0.0.1:8800/admin/movie_casts/' + id, {
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
                    document.getElementById('mcLst').innerHTML += `<li>Uloga ID: ${el.id}, Movie ID: ${el.movieID}, Glumac ID: ${el.actorID},
                    Uloga: ${el.role}`;
                }
            });
    });   
    
}