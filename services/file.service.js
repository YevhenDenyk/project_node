const fs = require('fs/promises');
const path = require('path');

const pathToFile = path.join(process.cwd(), 'data', 'users.json');

module.exports = {
    readerFile: async () => {
        const buffer = await fs.readFile(pathToFile);
        return JSON.parse(buffer.toString());
    },
    writerFile: async (users) => {
        await fs.writeFile(pathToFile, JSON.stringify(users));
    }
};
