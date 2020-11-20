var LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./task");

function getLocal() {
    const data = localStorage.getItem("task");

    if (data) {
        return JSON.parse(data);
    } else {
        return [];
    }
}

module.exports.get_all = function(user) {
    return new Promise(function(resolve, reject) {
        var tasks = [...getLocal()];

        if (tasks.length > 0) {
            resolve(tasks);
        } else {
            reject("User Not Found");
        }
    });
};

module.exports.task_model = function(task) {
    return new Promise(function(resolve, reject) {
        let newtask = {...task };
        newtask.id = Math.random();

        var tasks = [...getLocal()];

        tasks.push(newtask);
        localStorage.setItem("task", JSON.stringify(tasks));
        resolve(newtask);
    });
};