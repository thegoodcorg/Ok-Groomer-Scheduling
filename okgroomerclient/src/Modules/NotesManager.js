import { getToken } from "./authManager";

const _apiUrl = "https://localhost:5001/Note";


export const getNotesByDogId = (dogId) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/dogId/${dogId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get the booking rates.",
                );
            }
        });
    });
};

export const postNote = (noteObj) => {
    return getToken().then((token) =>
        fetch(_apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(noteObj)
        }).then(resp => resp.json()));
};
