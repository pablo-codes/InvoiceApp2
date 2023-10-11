import http from "../http";

const create = (id, data) => {
    return http.post(`/create-invoice/${id}`, data)
}

const InvoiceServices = { create }

export default InvoiceServices