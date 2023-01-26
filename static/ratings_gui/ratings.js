const cookies = document.cookie.split('=');
const token = cookies[cookies.length - 1];

function getAllRatings() {
    fetch('http://127.0.0.1:8800/admin/ratings', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => res.json())
        .then(data => {
            document.getElementById("ratLst").innerHTML="";
            const lst = document.getElementById("ratLst");

            if(data.msg) {
                alert(data.msg);
            } else {
                data.forEach(el => {
                    lst.innerHTML += `<li>ID: ${el.id}, Stars: ${el.rev_stars},
                     Broj ocena: ${el.num_of_ratings}`;
                });
            }
    });


}

function getRatingById() {
    const id = document.getElementById('ratID').value;

    fetch('http://127.0.0.1:8800/admin/ratings/' + id, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
            .then( data => {
                document.getElementById("ratLst").innerHTML = "";
                document.getElementById('ratLst').value = "";
                const lst = document.getElementById('ratLst');
        
                if(data.msg){
                    alert(data.msg);
                } else {
                     lst.innerHTML += `<li>ID: ${data.id}, Stars: ${data.rev_stars},
                     Broj ocena: ${data.num_of_ratings}`;
        }  
});

}

function deleteRating() {
    const id = document.getElementById('ratID').value;

    fetch('http://127.0.0.1:8800/admin/ratings/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
            .then( data => {
                document.getElementById("ratLst").innerHTML = "";
                document.getElementById('ratLst').value = "";
                const lst = document.getElementById('ratLst');
                
                if(data.msg){
                    alert(data.msg);
                } else {
                    lst.innerHTML += `<li>ID: ${data.id}, Stars: ${data.rev_stars},
                    Broj ocena: ${data.num_of_ratings}`;
                }  
        });

}

function initPostRating() {
    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const data = {
            rev_stars: document.getElementById('rev_stars').value,
            num_of_ratings: document.getElementById('num_of_ratings').value,
            
        };

        document.getElementById('ratLst').innerHTML = "";

        document.getElementById('rev_stars').value = "";
        document.getElementById('num_of_ratings').value = "";
       
        

        fetch('http://127.0.0.1:8800/admin/ratings', {
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
                    document.getElementById('ratLst').innerHTML +=  `<li>ID: ${el.id}, Stars: ${el.rev_stars},
                    Broj ocena: ${el.num_of_ratings}`;
                }
            });
    });


}


function initUpdateRating() {
    document.getElementById('btn').addEventListener('click', e => {
        e.preventDefault();

        const id = document.getElementById('ratID').value;

        const data = {
            rev_stars: document.getElementById('rev_stars').value,
            num_of_ratings: document.getElementById('num_of_ratings').value,
        };

        
        document.getElementById('ratLst').innerHTML = "";

        document.getElementById('ratID').value = "";


         document.getElementById('rev_stars').value = "";
        document.getElementById('num_of_ratings').value = "";
       

        fetch('http://127.0.0.1:8800/admin/ratings/' + id, {
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
                    document.getElementById('ratLst').innerHTML += `<li>ID: ${el.id}, Stars: ${el.rev_stars},
                    Broj ocena: ${el.num_of_ratings}`;
                }
            });
    });   
    
}