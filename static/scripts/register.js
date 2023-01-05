function init() {
    document.getElementById('registerBtn').addEventListener('click', e=> {
        e.preventDefault();

        const data = {
            name: document.getElementById('name').value,
            password: document.getElementById('password').value,
            email: document.getElementById('email').value,
            admin: document.getElementById('admin').checked,
            mod: document.getElementById('mod').checked
        }

        fetch('http://localhost:9000/register', {
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
                //window.location.href = '/admin/';

            }
        });
    });
}

