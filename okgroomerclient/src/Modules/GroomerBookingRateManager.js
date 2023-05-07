import { getToken } from "./authManager";

const apiUrl = "/api/GroomerBookingRates";

export const getAllBookingRates = () => {
    return getToken().then((token) => {
        return fetch(apiUrl, {
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

export const getServiceBookingRate = (serviceId, groomerId) => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/myrate?serviceId=${serviceId}&groomerId=${groomerId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.statusText == "No Content") {
                console.log("this groomer has not setup any rates for this job")
                return true
            } else {
                return res.json()
                // throw new Error(
                //     "this rate does not exist"
                // );
            }
        });
    });
};

export const getBookingRatesByGroomerId = (groomerId) => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/GroomerBookingRates/${groomerId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.statusText == "No Content") {
                console.log("this groomer has not setup any rates for this job")
                return true
            } else {
                return res.json()
                // throw new Error(
                //     "this rate does not exist"
                // );
            }
        });
    });
};

export const setOrUpdateRate = (serviceId, groomerId, bookingRate) => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/myrate?serviceId=${serviceId}&groomerId=${groomerId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.statusText == "No Content") {
                addServiceRate(bookingRate)
                return true
            } else {
                editBookingRate(bookingRate)
                // throw new Error(
                //     "this rate does not exist"
                // );
            }
        });
    });
};
export const GetCommentById = (id) => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/${id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(
                    "An unknown error occured while trying to get this posts comments."
                );
            }
        });
    });
}

export const addServiceRate = (bookingRate) => {
    return getToken().then((token) => {
        return fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingRate),
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error(
                    "An unknown error occurred while trying to save a booking rate.",
                );
            }
        });
    });
}


export const editBookingRate = (bookingRate) => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/${bookingRate.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingRate),
        }).then((resp) => {
            if (resp.ok) {
                return resp;
            } else {
                throw new Error(
                    "An unknown error occurred while trying to update your rate.",
                );
            }
        });
    });
}

export const deleteComment = (id) => {
    return fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(id),
    });
};