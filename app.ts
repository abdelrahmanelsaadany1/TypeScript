// app.ts - Main HR System Implementation

// Enum for Roles
enum Role {
  EMPLOYEE = "Employee",
  MANAGER = "Manager"
}

// Interface for Loginable
interface Loginable {
  authenticate(email: string, password: string): boolean;
}

// Abstract User Class
abstract class User implements Loginable {
  readonly id: number;
  name: string;
  email: string;
  private password: string;
  createdAt: Date;

  constructor(name: string, email: string, password: string) {
    this.id = HR.generateUserId();
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = new Date();
  }

  abstract getRole(): string;

  authenticate(email: string, password: string): boolean {
    return this.email === email && this.password === password;
  }
}

// Department Class
class Department {
  name: string;
  employees: Employee[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addEmployee(emp: Employee): void {
    this.employees.push(emp);
  }

  getDepartmentSize(): number {
    return this.employees.length;
  }
}

// Employee Class
class Employee extends User {
  private _salary: number;
  protected department: Department;

  constructor(name: string, email: string, password: string, salary: number, department: Department) {
    super(name, email, password);
    this._salary = salary >= 3000 ? salary : 3000;
    this.department = department;
  }

  get salary(): number {
    return this._salary;
  }

  set salary(value: number) {
    this._salary = value >= 3000 ? value : 3000;
  }

  getNetSalary(): number {
    return this._salary - HR.calculateTax(this._salary);
  }

  promote(percentage: number): void {
    this._salary += this._salary * (percentage / 100);
  }

  getRole(): string {
    return Role.EMPLOYEE;
  }
}

// Manager Class
class Manager extends Employee {
  team: Employee[] = [];

  constructor(name: string, email: string, password: string, salary: number, department: Department) {
    super(name, email, password, salary, department);
  }

  addEmployeeToTeam(emp: Employee): void {
    this.team.push(emp);
  }

  removeEmployeeFromTeam(empId: number): void {
    this.team = this.team.filter(emp => emp.id !== empId);
  }

  getTeamReport(): string[] {
    return this.team.map(emp => `${emp.name} (ID: ${emp.id}) - Salary: $${emp.salary}`);
  }

  getRole(): string {
    return Role.MANAGER;
  }
}

// HR Utility Class
class HR {
  private static userIdCounter = 1;

  static generateUserId(): number {
    return this.userIdCounter++;
  }

  static isEmailValid(email: string): boolean {
    return email.includes('@') && email.includes('.');
  }

  static calculateTax(salary: number): number {
    return salary * 0.1;
  }

  static generateReport(users: User[]): string[] {
    return users.map(user => `${user.name} - ${user.getRole()} (ID: ${user.id})`);
  }
}

// Main Application Logic
class HRSystem {
  private departments: Department[] = [];
  private users: User[] = [];

  createDepartment(name: string): Department {
    const dept = new Department(name);
    this.departments.push(dept);
    return dept;
  }

  createEmployee(name: string, email: string, password: string, salary: number, department: Department): Employee {
    const emp = new Employee(name, email, password, salary, department);
    this.users.push(emp);
    department.addEmployee(emp);
    return emp;
  }

  createManager(name: string, email: string, password: string, salary: number, department: Department): Manager {
    const mgr = new Manager(name, email, password, salary, department);
    this.users.push(mgr);
    department.addEmployee(mgr);
    return mgr;
  }

  login(email: string, password: string): User | null {
    const user = this.users.find(u => u.email === email);
    return user && user.authenticate(email, password) ? user : null;
  }

  generateSystemReport(): string[] {
    return HR.generateReport(this.users);
  }

  getDepartments(): Department[] {
    return this.departments;
  }

  getUsers(): User[] {
    return this.users;
  }
}

// Demo Usage
function runHRDemo(): void {
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


export { HRSystem, User, Employee, Manager, Department, HR, Role, Loginable };