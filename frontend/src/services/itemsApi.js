import api from './api';

const itemsApi = {
    getAll: (params) => api.get('/items', { params }),
    getOne: (id) => api.get(`/items/${id}`),
    create: (data, config) => api.post('/items', data, config),
    update: (id, data) => api.put(`/items/${id}`, data),
    delete: (id) => api.delete(`/items/${id}`),
    getMyItems: () => api.get('/my/items'),
    // Admin
    getAllAdmin: (params) => api.get('/admin/items', { params }),
    updateStatus: (id, status) => api.patch(`/admin/items/${id}/status`, { status }),
    deleteAdmin: (id) => api.delete(`/admin/items/${id}`),
};

export default itemsApi;
