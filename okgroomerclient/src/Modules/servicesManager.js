import { getToken } from "./authManager";

const apiUrl = "http://localhost:5001/Service";

export const getAllServices = () => {
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
                    "An unknown error occurred while trying to get the services",
                );
            }
        });
    });
};

export const getService = (serviceId) => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/${serviceId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error(
                    "An unknown error occured while trying to get this service."
                );
            }
        });
    });
};


export const addService = (service) => {
    return getToken().then((token) => {
        return fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(service),
        }).then((resp) => {
            if (resp.ok) {
                return resp.json();
            } else if (resp.status === 401) {
                throw new Error("Unauthorized");
            } else {
                throw new Error(
                    "An unknown error occurred while trying to save a new comment.",
                );
            }
        });
    });
} 

export const editComment = (comment) => {
    return getToken().then((token) => {
        return fetch(`${apiUrl}/${comment.id}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        }).then((resp) => {
            if (resp.ok) {
                return resp;
            } else {
                throw new Error(
                    "An unknown error occurred while trying to update a comment.",
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