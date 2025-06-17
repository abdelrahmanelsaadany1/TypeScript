"use strict";
// app.ts - Main HR System Implementation
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.HR = exports.Department = exports.Manager = exports.Employee = exports.User = exports.HRSystem = void 0;
// Enum for Roles
var Role;
(function (Role) {
    Role["EMPLOYEE"] = "Employee";
    Role["MANAGER"] = "Manager";
})(Role || (exports.Role = Role = {}));
// Abstract User Class
class User {
    constructor(name, email, password) {
        this.id = HR.generateUserId();
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = new Date();
    }
    authenticate(email, password) {
        return this.email === email && this.password === password;
    }
}
exports.User = User;
// Department Class
class Department {
    constructor(name) {
        this.employees = [];
        this.name = name;
    }
    addEmployee(emp) {
        this.employees.push(emp);
    }
    getDepartmentSize() {
        return this.employees.length;
    }
}
exports.Department = Department;
// Employee Class
class Employee extends User {
    constructor(name, email, password, salary, department) {
        super(name, email, password);
        this._salary = salary >= 3000 ? salary : 3000;
        this.department = department;
    }
    get salary() {
        return this._salary;
    }
    set salary(value) {
        this._salary = value >= 3000 ? value : 3000;
    }
    getNetSalary() {
        return this._salary - HR.calculateTax(this._salary);
    }
    promote(percentage) {
        this._salary += this._salary * (percentage / 100);
    }
    getRole() {
        return Role.EMPLOYEE;
    }
}
exports.Employee = Employee;
// Manager Class
class Manager extends Employee {
    constructor(name, email, password, salary, department) {
        super(name, email, password, salary, department);
        this.team = [];
    }
    addEmployeeToTeam(emp) {
        this.team.push(emp);
    }
    removeEmployeeFromTeam(empId) {
        this.team = this.team.filter(emp => emp.id !== empId);
    }
    getTeamReport() {
        return this.team.map(emp => `${emp.name} (ID: ${emp.id}) - Salary: $${emp.salary}`);
    }
    getRole() {
        return Role.MANAGER;
    }
}
exports.Manager = Manager;
// HR Utility Class
class HR {
    static generateUserId() {
        return this.userIdCounter++;
    }
    static isEmailValid(email) {
        return email.includes('@') && email.includes('.');
    }
    static calculateTax(salary) {
        return salary * 0.1;
    }
    static generateReport(users) {
        return users.map(user => `${user.name} - ${user.getRole()} (ID: ${user.id})`);
    }
}
exports.HR = HR;
HR.userIdCounter = 1;
// Main Application Logic
class HRSystem {
    constructor() {
        this.departments = [];
        this.users = [];
    }
    createDepartment(name) {
        const dept = new Department(name);
        this.departments.push(dept);
        return dept;
    }
    createEmployee(name, email, password, salary, department) {
        const emp = new Employee(name, email, password, salary, department);
        this.users.push(emp);
        department.addEmployee(emp);
        return emp;
    }
    createManager(name, email, password, salary, department) {
        const mgr = new Manager(name, email, password, salary, department);
        this.users.push(mgr);
        department.addEmployee(mgr);
        return mgr;
    }
    login(email, password) {
        const user = this.users.find(u => u.email === email);
        return user && user.authenticate(email, password) ? user : null;
    }
    generateSystemReport() {
        return HR.generateReport(this.users);
    }
    getDepartments() {
        return this.departments;
    }
    getUsers() {
        return this.users;
    }
}
exports.HRSystem = HRSystem;
// Demo Usage
function runHRDemo() {
    console.log("=== Starting HR System Demo ===");
    const hrSystem = new HRSystem();
    // Create departments
    const itDept = hrSystem.createDepartment("IT");
    const salesDept = hrSystem.createDepartment("Sales");
    // Create users
    const emp1 = hrSystem.createEmployee("John Doe", "john@company.com", "pass123", 5000, itDept);
    const emp2 = hrSystem.createEmployee("Jane Smith", "jane@company.com", "pass456", 4500, itDept);
    const manager1 = hrSystem.createManager("Bob Wilson", "bob@company.com", "pass789", 8000, itDept);
    // Manager operations
    manager1.addEmployeeToTeam(emp1);
    manager1.addEmployeeToTeam(emp2);
    // Display results
    console.log("\n--- System Report ---");
    console.log(hrSystem.generateSystemReport());
    console.log("\n--- Manager Team Report ---");
    console.log(manager1.getTeamReport());
    console.log("\n--- Department Info ---");
    console.log(`IT Department Size: ${itDept.getDepartmentSize()}`);
    console.log("\n--- Salary Operations ---");
    console.log(`Employee ${emp1.name} Net Salary: $${emp1.getNetSalary()}`);
    emp1.promote(10);
    console.log(`After 10% promotion: $${emp1.salary}`);
    console.log("\n--- Authentication Test ---");
    const loginResult = hrSystem.login("john@company.com", "pass123");
    console.log(`Login successful: ${loginResult ? loginResult.name : "Failed"}`);
    console.log("\n=== Demo Complete ===");
}
runHRDemo();
