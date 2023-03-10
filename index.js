const fs = require('fs/promises');
const path = require('path');

const sorter = async (checkDirectory, gender, moveTo) => {
    try {
        const folderPath = path.join(__dirname, 'people', checkDirectory);

        let files = await fs.readdir(folderPath);

        for (const file of files) {

            const pathFile = path.join(folderPath, file)

            const stat = await fs.stat(pathFile)

            if (stat.isFile()) {

                const data = await fs.readFile(pathFile);
                const user = JSON.parse(data);

                if (user.gender === gender) {
                    await fs.rename(pathFile, path.join(__dirname, 'people', moveTo, file))
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
}
    //перевіряю папки
sorter('man', 'woman', 'woman')
sorter('woman', 'man', 'man')