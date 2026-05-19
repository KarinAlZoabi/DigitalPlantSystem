//API file used to allow React to communicate with backend

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";;

function getToken() {
  return localStorage.getItem("token");
}

// Standard JSON requests
async function request(path, options = {}) {
  const token = getToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  const contentType = res.headers.get("content-type");
  const data = contentType?.includes("application/json")
    ? await res.json()
    : { error: await res.text() };

  if (!res.ok) {
    // Only auto-logout for protected routes, NOT login/register/google auth
    if (res.status === 401 && !path.startsWith("/auth/")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
      return;
    }

    throw new Error(data.error || `Request failed with status ${res.status}`);
  }

  return data;
}

// File upload requests — browser sets Content-Type with the multipart boundary automatically
async function uploadFormData(path, method, formData) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  if (res.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
    return;
  }
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export const api = {
  // Auth
  login: (body) => request("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  googleAuth: (credential) =>
  request("/auth/google", {
    method: "POST",
    body: JSON.stringify({ credential }),
  }),
  register: (body) => request("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  getProfile: () => request("/auth/profile"),
  updateProfile: (body) => request("/auth/profile", { method: "PUT", body: JSON.stringify(body) }),
  changePassword: (body) => request("/auth/change-password", { method: "PUT", body: JSON.stringify(body) }),
  forgotPassword: (body) => request("/auth/forgot-password", { method: "POST", body: JSON.stringify(body) }),
  resetPassword: (body) => request("/auth/reset-password", { method: "POST", body: JSON.stringify(body) }),
  uploadProfilePicture: (file) => {
    const fd = new FormData();
    fd.append("picture", file);
    return uploadFormData("/auth/profile-picture", "POST", fd);
  },
  deleteAccount: () => request("/auth/account", { method: "DELETE" }),

  // Plant Types
  // payload = plain object with all fields, imageFile = File object or null
  getPlantTypes: (search = "") => request(`/plantTypes?search=${search}`),
  getPlantTypeById: (id) => request(`/plantTypes/${id}`),
  createPlantType: (payload, imageFile) => {
    const fd = new FormData();
    fd.append("data", JSON.stringify(payload));
    if (imageFile) fd.append("image", imageFile);
    return uploadFormData("/plantTypes", "POST", fd);
  },
  updatePlantType: (id, payload, imageFile) => {
    const fd = new FormData();
    fd.append("data", JSON.stringify(payload));
    if (imageFile) fd.append("image", imageFile);
    return uploadFormData(`/plantTypes/${id}`, "PUT", fd);
  },
  deletePlantType: (id) => request(`/plantTypes/${id}`, { method: "DELETE" }),

  // User Plants
  getUserPlants: () => request("/userPlants"),
  getUserPlantById: (id) => request(`/userPlants/${id}`),
  addUserPlant: (body) => request("/userPlants", { method: "POST", body: JSON.stringify(body) }),
  markWatered: (id) => request(`/userPlants/${id}/water`, { method: "POST" }),
  markFertilized: (id) => request(`/userPlants/${id}/fertilize`, { method: "POST" }),
  updateUserPlantNickname: (id, body) =>
  request(`/userPlants/${id}/nickname`, {
    method: "PUT",
    body: JSON.stringify(body),
  }),
  removeUserPlant: (id) => request(`/userPlants/${id}`, { method: "DELETE" }),

  // Care Tasks
  getCareTasks: () => request("/careTasks"),
  completeTask: (id) => request(`/careTasks/${id}/complete`, { method: "POST" }),

  // Care Timeline
  getTimeline: (userPlantId) => request(`/careTimeline?userPlantId=${userPlantId}`),
  addNote: (body) => request("/careTimeline/note", { method: "POST", body: JSON.stringify(body) }),

  // Admin
  getAdminStats: () => request("/admin/stats"),
  getAllUsers: () => request("/admin/users"),
};