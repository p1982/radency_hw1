class API {
    constructor() {
        this.baseUrl = "./notes.json"
    }
    async getData(url) {
        const res = await fetch(`${this.url}/${url}`)
        if (res.ok) {
            const data = await res.json()
            return data
        }
    }
    async createData(url, note) {
        const res = await fetch(`${this.url}/${url}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(note),
        })
        if (res.ok) {
            const data = await res.json()
            return data
        }
    }
    async updateData(id, note) {
        const res = await fetch(`${this.url}/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(note),
        })
        if (res.ok) {
            const data = await res.json()
            return data
        }
    }
    async deleteData(id) {
        const res = await fetch(`${this.url}/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
              },
        })
        if (res.ok) {
            const data = await res.json()
            return data
        }
    }
}