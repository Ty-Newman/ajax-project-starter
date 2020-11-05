window.addEventListener('DOMContentLoaded', () => {
    fetch('/kitten/image').then(function(res){
        return res.json();
    }).then(function(objRes){
        console.log(objRes);
        const imgTag = document.getElementsByClassName('cat-pic');
        imgTag[0].setAttribute('src', objRes.src);
    })
    document.getElementById('new-pic').addEventListener('click', (event) => {
        document.getElementsByClassName('loader')[0].innerHTML = 'Loading...';
        fetch('/kitten/image').then((response) => {
            document.getElementsByClassName('loader')[0].innerHTML = '';
            return response.json();
        }).then((objRes) => {
            const imgTag = document.getElementsByClassName('cat-pic');
            imgTag[0].setAttribute('src', objRes.src);
        })
    });
})
