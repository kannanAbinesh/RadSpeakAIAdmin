(async () => {
    let responsse = await fetch('https://api.restful-api.dev/objects', {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    });

    let resp = await responsse.json();
    console.log(resp, 'respresprespresprespresp')
})();