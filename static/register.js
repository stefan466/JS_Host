function init() {
    document.getElementById('btn').addEventListener('click', e=> {
        e.preventDefault();

        const data = {
            first_name: document.getElementById('first_name').value,
            last_name: document.getElementById('last_name').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            admin: document.getElementById('admin').checked,
        }

        fetch('http://localhost:9400/auth_register', {
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

