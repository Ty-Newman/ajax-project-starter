window.addEventListener('DOMContentLoaded', () => {
    fetch('/kitten/image').then(function(res){
        return res.json();
    }).then(function(objRes){
        console.log(objRes);
        const imgTag = document.getElementsByClassName('cat-pic');
        imgTag[0].setAttribute('src', objRes.src);
    }).catch((err) => {
        // console.error(err, 'please try again')
        throw err;

    })
    document.getElementById('new-pic').addEventListener('click', (event) => {
        document.getElementsByClassName('loader')[0].innerHTML = 'Loading...';
        fetch('/kitten/image').then((response) => {
            document.getElementsByClassName('loader')[0].innerHTML = '';
            throw 'please try again'
            return response.json();
        }).then((objRes) => {
            const imgTag = document.getElementsByClassName('cat-pic');
            imgTag[0].setAttribute('src', objRes.src);
        }).catch((error) => {
            // console.error(err, 'please try again')
            // debugger;
            console.log(error);
        });
    });

    document.getElementById('upvote').addEventListener('click', () => {
        fetch("/kitten/upvote", { method:'PATCH' }).then(function(res){
            return res.json();
        }).then(function(objRes) {
            const currentScore = document.getElementsByClassName('score')[0];
            currentScore.innerHTML = objRes.score;

        })

    })
    document.getElementById('downvote').addEventListener('click', () => {
        fetch("/kitten/downvote", { method: 'PATCH' }).then(function (res) {
            return res.json();
        }).then(function (objRes) {
            const currentScore = document.getElementsByClassName('score')[0];
            currentScore.innerHTML = objRes.score;

        })
    })
    const form = document.getElementById('form');

    // document.getElementById('submit-btn')
    form.addEventListener('submit', async (e) => {
        // console.log('this works')
        e.preventDefault();
        
            // asynchronous - line 5
            const formData = new FormData(form);
            const data = formData.get('user-comment');
            console.log(data, formData, formData.keys)

        const res = await fetch('http://localhost:3000/kitten/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ comment: data })
        });
        const result = await res.json();

       let cSection = document.getElementsByClassName('comments')[0]

        cSection.innerHTML+=result.comments[0];


        console.log(result)

        // fetch("/kitten/comments", {
        //     method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({data})})
        // .then(function(res){
        //     let result = res.json();
        //     return result;
        // }).then(function(resObj){
        //     console.log(resObj)
        // })
    })

})
