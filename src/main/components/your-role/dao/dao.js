export async function accessGet(endpoint){

    let res = await fetch(`https://${process.env.REACT_APP_API_HOST}${endpoint}`,
        {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }
    );

    if (res.status !== 200) {
        console.log(res.statusText);
        return
    }

    console.log(res)

    return await res.json()
}