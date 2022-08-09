import server from "pages/api/server"
const stopServer = async () => {
    global.httpServer = await server.stop()
}