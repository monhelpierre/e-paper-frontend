const CURR_ENV = "dev";

const getHostEnv = () => {
  switch (CURR_ENV) {
    case "dev":
      return process.env.NEXT_PUBLIC_API_URL_DEV;
    case "fnct":
      return process.env.NEXT_PUBLIC_API_URL_STAG;
    case "prod":
      return process.env.NEXT_PUBLIC_API_URL_PROD;
    default:
      return process.env.NEXT_PUBLIC_API_URL_DEV;
  }
};

export const getFilePath = async (doc) => {
  return `${getHostEnv(CURR_ENV)}/files/${doc.name}`;
};

export const getUserData = async (user) => {
  return fetch(`${getHostEnv(CURR_ENV)}/api/user/${user.uid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const addUserData = async (user) => {
  return fetch(`${getHostEnv(CURR_ENV)}/api/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reqData: user,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateUser = async (newUser) => {
  return fetch(`${getHostEnv(CURR_ENV)}/api/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reqData: newUser,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getDocuments = async (JWT) => {
  return fetch(`${getHostEnv(CURR_ENV)}/api/document`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const saveDocument = async (formData) => {
  return fetch(`${getHostEnv(CURR_ENV)}/api/document`, {
    method: "POST",
    headers: {},
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err.message));
};

export const updateDocument = async (doc) => {
  return fetch(`${getHostEnv(CURR_ENV)}/api/document`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reqData: doc,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const removeDocument = async (doc) => {
  return fetch(`${getHostEnv(CURR_ENV)}/api/document/${doc.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
