module.exports = {
    name: (name) => {
        return name.substring(0, 1).toUpperCase() + name.substring(1).toLowerCase().trim();
    }
};
