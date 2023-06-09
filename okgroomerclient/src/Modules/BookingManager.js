import firebase from "firebase/app";
import "firebase/auth";

const _apiUrl = "http://localhost:5001/Booking"

export const getMyBookings = (userId) => {
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
                    "An unknown error occurred while trying to get the booking rates.",
                );
            }
        });
    });
};

export const bookingsByGroomer = (groomerId) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/groomerId/${groomerId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error(
                    "An unknown error occurred while trying to get this groomers bookings.",
                );
            }
        });
    });
}

export const getBookingById = (id) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/${id}`, {
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

export const bookingsByDog = (dogId) => {
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
                    "An unknown error occurred while trying to get this dogs bookings.",
                );
            }
        });
    });
}

export const updateBooking = (booking) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/${booking.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(booking),
        }).then((resp) => {
            if (resp.ok) {
                return resp;
            } else {
                throw new Error(
                    "An unknown error occurred while trying to update a post.",
                );
            }
        });
    });
}

export const postBooking = (bookingObj) => {
    return getToken().then((token) =>
        fetch(_apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookingObj)
        }).then(resp => resp.json()));
};

export const deleteBooking = (id) => {
    return getToken().then((token) => {
        return fetch(`${_apiUrl}/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }).then((resp) => {
            if (resp.ok) {
                return resp;
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error(
                    "An unknown error occurred while trying to save a new post.",
                );
            }
        });
    });
};

export const getToken = () => {
    const currentUser = firebase.auth().currentUser;
    // if (!currentUser) {
    //   throw new Error("Cannot get current user. Did you forget to login?");
    // }
    return currentUser.getIdToken();
};