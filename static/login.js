function init() {

   /*  document.getElementById('registerBtn').addEventListener('click', e=> {
        window.location.href = 'register.html';
    }) */
    document.getElementById('btn').addEventListener('click', e=> {
        e.preventDefault();

        const data = {
            name: document.getElementById('username').value,
            password: document.getElementById('password').value
        }
        
        fetch('http://localhost:9400/auth_login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(el => {
            if(el.msg) {
                alert(el.msg);
            } else {
                document.cookie = `token=${el.token};SameSite=Lax`;
                window.location.href = 'home.html';

            }
        });
    });

   
}