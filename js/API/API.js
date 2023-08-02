class API {
    constructor() {
        this.baseUrl = "./notes.json"
    }
    async getData(url) {
        const res = await fetch(`${this.baseUrl}`)
        if (res.ok) {
            const data = await res.json()
            return data.notes
        }
    }
    async createData(url, note) {
        // const res = await fetch(`${this.url}/${url}`, {
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(note),
        // })
        // if (res.ok) {
        //     const data = await res.json()
        //     return data
        // }
        return note
    }
    async updateData(id, note) {
        // const res = await fetch(`${this.url}/${id}`, {
        //     method: 'PUT',
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(note),
        // })
       // if (res.ok) {
            //const data = await res.json()
            return note
       // }
    }
    async deleteData(id) {
        // const res = await fetch(`${this.url}/${id}`, {
        //     method: 'DELETE',
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        // })
        // if (res.ok) {
        //     const data = await res.json()
        //     return data
        // }
        return true
    }
}

export default new API()