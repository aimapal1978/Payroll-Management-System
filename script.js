// قائمة الموظفين الثابتة
let employeesData = JSON.parse(localStorage.getItem('swit_employees_v17')) || [
  // Chefs' section
  { id: 1, dept: 'Chefs section', name: 'John', basePay: 1300, singleDays: 15, fullDays: 0, advance: 0, deduction: 0 },
  { id: 2, dept: 'Chefs section', name: 'Vadim', basePay: 1300, singleDays: 15, fullDays: 0, advance: 0, deduction: 0 },
  { id: 3, dept: 'Chefs section', name: 'Peter', basePay: 1300, singleDays: 15, fullDays: 0, advance: 0, deduction: 0 },
  { id: 4, dept: 'Chefs section', name: 'Ricardo', basePay: 1300, singleDays: 15, fullDays: 0, advance: 0, deduction: 0 },
  
  // Kitchen Staff section
  { id: 5, dept: 'Kitchen Staff section', name: 'Maria', basePay: 1300, singleDays: 15, fullDays: 0, advance: 0, deduction: 0 },
  { id: 6, dept: 'Kitchen Staff section', name: 'Suzan', basePay: 1300, singleDays: 15, fullDays: 0, advance: 0, deduction: 0 },
  
  // Cashier section
  { id: 7, dept: 'Cashier section', name: 'Anna', basePay: 1200, singleDays: 15, fullDays: 0, advance: 0, deduction: 0 },
  { id: 8, dept: 'Cashier section', name: 'Abeer', basePay: 1200, singleDays: 15, fullDays: 0, advance: 0, deduction: 0 },
  { id: 9, dept: 'Cashier section', name: 'Cindy', basePay: 1200, singleDays: 15, fullDays: 0, advance: 0, deduction: 0 },
  
  // Cleaning Staff section
  { id: 10, dept: 'Cleaning Staff section', name: 'Olga', basePay: 1000, singleDays: 15, fullDays: 0, advance: 0, deduction: 0 },
  { id: 11, dept: 'Cleaning Staff section', name: 'Julia', basePay: 1000, singleDays: 15, fullDays: 0, advance: 0, deduction: 0 }
];

const departments = ['Chefs section','Kitchen Staff section','Cashier section','Cleaning Staff section'];

function saveData() {
  localStorage.setItem('swit_employees_v17', JSON.stringify(employeesData));
}

function renderTable() {
  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = '';

  departments.forEach(dept => {
    const deptEmps = employeesData.filter(e => e.dept === dept);

    const deptHeaderRow = document.createElement('tr');
    deptHeaderRow.innerHTML = `
      <td colspan="7" class="section-header">
        <span>${dept}</span>
      </td>
    `;
    tbody.appendChild(deptHeaderRow);

    if (deptEmps.length === 0) {
      const emptyRow = document.createElement('tr');
      emptyRow.innerHTML = `<td colspan="7" style="color: #8a8175; text-align: center;">There are currently no employees in this department.</td>`;
      tbody.appendChild(emptyRow);
      return;
    }

    deptEmps.forEach(emp => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td style="font-weight: bold; color: #d4835d;">${emp.name}</td>
        <td><input type="number" value="${emp.basePay}" style="width:70px; text-align:center;" onchange="updateVal(${emp.id}, 'basePay', this.value)"></td>
        <td><input type="number" value="${emp.singleDays}" style="width:60px; text-align:center;" onchange="updateVal(${emp.id}, 'singleDays', this.value)" placeholder="0"></td>
        <td><input type="number" value="${emp.fullDays}" style="width:60px; text-align:center;" onchange="updateVal(${emp.id}, 'fullDays', this.value)" placeholder="0"></td>
        <td><input type="number" value="${emp.advance}" style="width:60px;" onchange="updateVal(${emp.id}, 'advance', this.value)" placeholder="0"></td>
        <td><input type="number" value="${emp.deduction}" style="width:60px;" onchange="updateVal(${emp.id}, 'deduction', this.value)" placeholder="0"></td>
        <td>
          <div style="display: flex; gap: 5px; justify-content: center;">
            <button class="info" style="padding:4px 6px; font-size:0.75rem;" onclick="showSalaryDetails(${emp.id})">Salary</button>
            <button class="clear-data" style="padding:4px 6px; font-size:0.75rem;" onclick="clearEmployeeData(${emp.id})">Clear data</button>
            <button class="danger" style="padding:4px 6px; font-size:0.75rem;" onclick="deleteEmployee(${emp.id})">Delete</button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  });
}

function addNewEmployee(e) {
  e.preventDefault();
  const name = document.getElementById('newNameInput').value;
  const dept = document.getElementById('newDeptInput').value;
  const basePay = Number(document.getElementById('newBasePayInput').value);

  employeesData.push({
    id: Date.now(),
    dept: dept,
    name: name,
    basePay: basePay,
    singleDays: 15,
    fullDays: 0,
    advance: 0,
    deduction: 0
  });

  saveData();
  renderTable();
  document.getElementById('addEmpForm').reset();
  alert('The employee was successfully added to ' + dept);
}

function deleteEmployee(id) {
  const emp = employeesData.find(e => e.id === id);
  if (!emp) return;

  if (confirm(`Are you sure you want to delete the employee (${emp.name})?`)) {
    employeesData = employeesData.filter(e => e.id !== id);
    saveData();
    renderTable();
  }
}

function clearEmployeeData(id) {
  const emp = employeesData.find(e => e.id === id);
  if (!emp) return;

  if (confirm(`Are you sure you want to delete the employee's salary data?
 (${emp.name})؟`)) {
    emp.singleDays = 0;
    emp.fullDays = 0;
    emp.advance = 0;
    emp.deduction = 0;
    saveData();
    renderTable();
  }
}

function updateVal(id, field, val) {
  const emp = employeesData.find(e => e.id === id);
  if (emp) {
    emp[field] = Number(val) || 0;
    saveData();
    renderTable();
  }
}

function showSalaryDetails(id) {
  const emp = employeesData.find(e => e.id === id);
  if (!emp) return;

  let base = Number(emp.basePay) || 0;
  let single = Number(emp.singleDays) || 0;
  let full = Number(emp.fullDays) || 0;

  let singleTotal = single * base;
  let fullTotal = full * (base * 2);
  let totalEarned = singleTotal + fullTotal;
  
  let netTotal = totalEarned - (Number(emp.advance) || 0) - (Number(emp.deduction) || 0);

  document.getElementById('modalTitle').innerText = `Salary Details: ${emp.name}`;
  document.getElementById('modalBody').innerHTML = `
    Section: <span>${emp.dept}</span><br>
    Base Salary (Single Shift): <span>${base}</span><br>
    Number of Single-shift Workdays: <span>${single}</span> days (Total: ${singleTotal})<br>
    Number of Full-time Workdays: <span>${full}</span> days (Total: ${fullTotal})<br>
    Total Earnings Before Deductions: <span>${totalEarned}</span><br>
    Amount Withrawn (Advance): <span style="color:#b5432f;">${emp.advance || 0}</span><br>
    Deductes: <span style="color:#b5432f;">${emp.deduction || 0}</span><br>
    <hr style="border-color:#3c352c;">
    <strong>Final net due: <span style="font-size: 1.1rem; color:#4c7a4f;">${netTotal}</span></strong>
  `;
  document.getElementById('salaryModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('salaryModal').style.display = 'none';
}

// التشغيل الفوري عند تحميل الصفحة
renderTable();