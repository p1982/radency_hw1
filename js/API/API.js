//api class to fetch data from server
class API {
    constructor() {
        this.baseUrl = "./notes.json"
    }

    //get data
    async getData(url) {
        const res = await fetch(`${this.baseUrl}`)
        if (res.ok) {
            const data = await res.json()
            return data.notes
        }
    }

    //create dete
    async createData(note) {
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
        let id = 12
        note.id = id
        id++
        note.archiv = false
        return note
    }

    //delete all data
    async deleteAllData() {
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
        return { message: "successful delete" }
    }

    //update data by id
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
        note.id = id
        note.archiv = false
        return note
        // }
    }

    //delete data by id 
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