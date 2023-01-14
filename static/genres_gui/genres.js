const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];


function getAllGenres() {
    fetch('http://127.0.0.1:8800/admin/genres', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
        .then(data => {
            document.getElementById("actLst").innerHTML="";
            const lst = document.getElementById("genLst");

            if(data.msg) {
                alert(data.msg);
            } else {
                data.forEach(el => {
                    lst.innerHTML += `<li>ID: ${data.id}, Zanr: ${data.genre_title}`;
                });
            }
    });

}

function deleteGenre() {
    const id = document.getElementById('genID').value;

    fetch('http://127.0.0.1:8800/admin/genres/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
            .then( data => {
                document.getElementById("genLst").innerHTML = "";
                document.getElementById('genLst').value = "";
                const lst = document.getElementById('genLst');
                
                if(data.msg){
                    alert(data.msg);
                } else {
                    lst.innerHTML += `<li>ID: ${data.id}, Zanr: ${data.genre_title}`;
                }  
        });

}


function getGenreById() {

    const id = document.getElementById('genID').value;

    fetch('http://127.0.0.1:8800/admin/genres/' + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
            .then( data => {
                document.getElementById("genLst").innerHTML = "";
                document.getElementById('genLst').value = "";
                const lst = document.getElementById('genLst');
        
                if(data.msg){
                    alert(data.msg);
                } else {
                     lst.innerHTML += `<li>ID: ${data.id}, Zanr: ${data.genre_title}`;
        }  
});

}

function initPostGenre() {
    
    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            genre: document.getElementById('genre_title').value,
           
            
        };

        document.getElementById('actLst').innerHTML = "";
        document.getElementById('genre_title').value = "";
        
        

        fetch('http://127.0.0.1:8800/admin/genres', {
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
                    document.getElementById('actLst').innerHTML += `<li>ID: ${el.id}, Zanr: ${el.genre_title}` ;
                }
            });
    });

}


function initUpdateGenre() {

    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const id = document.getElementById('genID').value;

        const data = {
            genre_title: document.getElementById('genre_title').value,
        };

        document.getElementById('genLst').innerHTML = "";

        document.getElementById('genID').value = "";

        document.getElementById('genLst').value = "";
        document.getElementById('genre_title').value = "";
        

        fetch('http://127.0.0.1:8800/admin/genres/' + id, {
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
                    document.getElementById('orgLst').innerHTML +=`<li>ID: ${el.id}, Zanr: ${el.genre_title}`;
                }
            });
    });   
    
}