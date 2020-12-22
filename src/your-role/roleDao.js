import axios from 'axios';

export async function retrieveRoleInfo() {
    try {
        console.log('Making request to Role API')
        let res = await fetch(`https://localhost:5000/role/id/9999999999/`,
            {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }
        );

        if (res.status !== 200) {
            console.log(res.statusText);
            return
        }

        let json = await res.json()
        console.log(json)

        return json;
    } catch (e) {
        console.log(e);
    }
}