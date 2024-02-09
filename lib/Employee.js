// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
        this._name = name;
        this._id = id;
        this._email = email;
    }
    getName() {
        return this._name;
    }

    getId() {
        return this._id;
    }

    getEmail() {
        return this._email;
    }

    getRole() {
        return 'Employee';
    }
}

module.exports = Employee;