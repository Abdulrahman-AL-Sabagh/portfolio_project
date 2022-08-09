import server from "pages/api/server"

const startServer = 
async () => {
    global.httpServer = await server.start()
    
}
export default startServer;