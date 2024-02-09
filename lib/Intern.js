// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this._school = school;
    }
    get school() {
        return this._school;
    }

    get role() {
        return 'Intern';
    }
}

export {
    Intern
};