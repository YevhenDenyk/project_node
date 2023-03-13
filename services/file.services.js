const fs = require("fs/promises");
const path = require("path");

const pathFile = path.join(process.cwd(), 'data', 'users.json')

module.exports = {
    readFile: async () => {
        const buffer = await fs.readFile(pathFile);
        return JSON.parse(buffer.toString())
    },
    writeFile: async (users) => {
        await fs.writeFile(pathFile, JSON.stringify(users))
    }
}