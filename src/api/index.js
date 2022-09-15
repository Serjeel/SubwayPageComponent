import axios from 'axios';

export async function getItemsInfo () {
    let data = {};
    await axios.get(`http://localhost:8000/food/getAllFood`)
        .then(res => {data = res.data[0];
        console.log(res.data[0]);});

    return data;
}