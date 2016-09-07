describe('todoFactory', function() {

    beforeEach(function() {
        bard.appModule('app');
        bard.inject('todoFactory', 'apiUrl', '$httpBackend');
    });

    // test for getAll 
    describe('when getAll is called', function() {
        it('should return data on success', function() {
            var response = {
                data: [{}]
            };

            // telling the http to return the data property with one object inside of it
            $httpBackend.whenGET(apiUrl + '/todos').respond(response);

            // call the todo factory
            todoFactory.getAll().then(
                function(data) {
                    expect(data.length).toEqual(1);
                },
                function(error) {
                    expect(1).toEqual(2);
                }
            );

            it('should return an error on http fail', function() {
                $httpBackend.whenGET(apiUrl + '/todos').respond(500);

                todoFactory.getAll().then(
                    function(data) {
                        expect(1).toBe(2);
                    },
                    function(error) {
                        expect(error).toBeDefined();
                    }
                );
            });
        });
    });

    // test for add
    describe('when add is called', function() {
        it('should retun data on sucess with added todo', function() {

            var todo = {

            };
            var response = {
                data: todo
            };

            $httpBackend.whenPOST(apiUrl + '/todos').respond(response);

            // call the todo factory
            todoFactory.add(todo).then(
                function(data) {
                    expect(data).toBeDefined();
                    expect(data).toEqual(todo);
                }
            );
        });

        it('should return error message on fail', function() {
            $httpBackend.whenPOST(apiUrl + '/todos').respond(500);
            var todo = {};
            todoFactory.add().then(
                function(data) {
                    expect(1).toBe(2);
                },
                function(error) {
                    expect(error).toBeDefined();
                });
        });
    });

    // test for getById
    describe('when getById is called', function() {
        it('should retun data on success by id', function() {
            var id = 0;
            var fakeTodoObject = {
                id: id,
                name: 'Take out the trash',
                priority: 2
            };

            $httpBackend.whenGET(apiUrl + '/todos/' + id).respond(fakeTodoObject);

            todoFactory.getById(id).then(
                function(data) {
                    expect(data).toBeDefined();
                    expect(data.name).toEqual('Take out the trash');
                }
            );
        });
        it('should return error message on fail', function() {
            $httpBackend.whenGET(apiUrl + '/todos' + id).respond(500);

            var id = 0;
            todoFactory.getById(id).then(
                function(data) {
                    expect(1).toBe(2);
                },
                function(error) {
                    expect(error).toBeDefined();
                });
        });
    });

    // test for update
    describe('when update is called', function(){
        it('should return data on sucess and update an existing todo item', function(){
            var id= 0;
            var fakeTodo= {
                id: id,
                name: 'Mow Lawn',
                priority: 1
            };

            $httpBackend.whenPUT(apiUrl + '/todos/' + fakeTodo.todoId, fakeTodo);

            todoFactory.update(fakeTodo)
                .then(
                    function(data){
                        expect(data).toBeDefined();
                        expect(data.priority).toEqual(2);
                    });
        it('should return error message on fail', function() {
            $httpBackend.whenGET(apiUrl + '/todos/' + fakeTodo.todoId, fakeTodo)
            .respond(500);

            todoFactory.update(fakeTodo).then(
                function(data) {
                    expect(1).toBe(2);
                },
                function(error) {
                    expect(error).toBeDefined();
                });
            });
        });
    });



    // test for remove
    describe('when remove is called', function(){
        it('should delete the todo from the database', function(){
            var id= 0;
            var fakeTodo= {
                id: id,
                name: 'Mow Lawn',
                priority: 1
            };

            $httpBackend.whenDELETE(apiUrl + '/todos/' + fakeTodo.todoID);

            todoFactory.remove(fakeTodo)
                .then(
                    function(data){
                        expect(data).toBeDefined();
                        expect(data).toBeNull();
                    });
        });
    });


});
