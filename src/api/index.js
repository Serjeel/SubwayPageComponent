export async function getItemsInfo () {
    const data = await fetch("./src/data.json")
        .then(response => response.json());

    return data;
} // async и await тут возможно не нужны