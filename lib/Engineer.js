// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name);
        super(id);
        super(email);
        this._github = github;
    }
    get github() {
        return this._github;
    }
    
    get role() {
        return 'Engineer';
    }
}

export {
    Engineer
};