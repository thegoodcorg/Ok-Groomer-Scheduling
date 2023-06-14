import firebase from "firebase/app";
import "firebase/auth";

const _apiUrl = "https://localhost:5001/Dog"

export const getMyDogs = (userId) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/ownerId/${userId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get the users dogs.",
                );
            }
        });
    });
};

export const registerDog = (dogObj) => {
    return getToken().then((token) =>
    fetch(_apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(dogObj)
    }).then(resp => resp.json()));
  };

  export const getToken = () => {
    const currentUser = firebase.auth().currentUser;
    // if (!currentUser) {
    //   throw new Error("Cannot get current user. Did you forget to login?");
    // }
    return currentUser.getIdToken();
  };