var task_model = require('../model/taskModel');


module.exports.add_task = function (request, response) {

    
    task_model.task_model(request.body).then(
        function (result) {
            return response.send(
                JSON.stringify({
                    status: 1,
                    task: result,
                })
            );

        },
        function (err) {
            console.log(err);
            return response.send({
                status: 0,
                message: 'Error adding Task'
            });
        }
    );

};

module.exports.get_all = function (req, response) {

    
    task_model.get_all(req).then(
        function (result) {

                console.log(result);
                return response.send(
                    JSON.stringify({
                        status: 1,
                        task: result,
                    })
                );

        },
        function (err) {
            console.log(err);
            return response.send({
                status: 0,
                message: 'Not Found'
            });
        }
    );

};