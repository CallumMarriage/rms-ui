export async function accessApiGet(endpoint) {
    return await get(endpoint, process.env.REACT_APP_API_HOST)
}

export async function accessApiPost(endpoint, body) {
    return await post(endpoint, body, process.env.REACT_APP_API_HOST)
}

export async function accessImageGet(endpoint) {
    return await get(endpoint, process.env.REACT_APP_IMAGE_SERVICE_HOST);
}

export async function accessImagePost(endpoint, body) {
    return await post(endpoint, body, process.env.REACT_APP_IMAGE_SERVICE_HOST);
}

async function get(endpoint, host) {
    console.log(endpoint)
    let res = await fetch(`https://${host}${endpoint}`,
        {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }
    );
    if (res.status !== 200) {
        if (res.status === 404) {
            return {
                responseBody: {}
            }
        } else {
            throw new Error('Internal Server Error');
        }
    }

    return await res.json()
}

async function post(endpoint, body, host) {
    let res = await fetch(`https://${host}${endpoint}`,
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }
    );

    if (res.status !== 201 && res.status !== 202) {
        console.log(res)
        throw new Error('Internal Server Error');
    }
}