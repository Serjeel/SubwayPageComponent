import axios from 'axios';
import Cookies from 'js-cookie';

export async function getItemsInfo() {
    let data = {};
    await axios.get(`http://localhost:8000/food/getAllFood`)
        .then(res => { data = res.data[0] });

    return data;
}

export async function getAuthorization() {
    let data = {};
    try {
        await axios.get(`http://localhost:8000/user/protected`, {
            headers: {
                Authorization: Cookies.get("token")
            }
        })
            .then(res => { data = res.data });
    } catch {
        data = {
            success: false,
            user: {
                id: "",
                username: ""
            }
        }
    }

    return data;
}