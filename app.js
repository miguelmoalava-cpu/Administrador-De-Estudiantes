const form = document.getElementById('student-form');
const studentList = document.getElementById('student-list');

let students = JSON.parse(localStorage.getItem('students')) || [];
let editIndex = null;

function saveToLocalStorage() {
    localStorage.setItem('students', JSON.stringify(students));
}

function calculateAverage(a, b, c) {
    return ((a + b + c) / 3).toFixed(2);
}
function sortStudentsByName() {
    students.sort((a, b) =>
        a.name.trim().toLowerCase()
        .localeCompare(b.name.trim().toLowerCase())
    );
}

function renderStudents() {
    sortStudentsByName
    
    studentList.innerHTML = '';
    
    students.forEach((student, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.grade1}</td>
            <td>${student.grade2}</td>
            <td>${student.grade3}</td>
            <td>${student.average}</td>
            <td>
                <button class="btn-edit" onclick="editStudent(${index})">Editar</button>
                <button class="btn-delete" onclick="deleteStudent(${index})">Eliminar</button>
            </td>
        `;

        studentList.appendChild(row);
    });

    saveToLocalStorage();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

   const name = document
    .getElementById('name')
    .value
    .trim()
    .toLowerCase();
    const grade1 = Number(document.getElementById('grade1').value);
    const grade2 = Number(document.getElementById('grade2').value);
    const grade3 = Number(document.getElementById('grade3').value);

    const average = calculateAverage(grade1, grade2, grade3);

    if (editIndex === null) {
        students.push({ name, grade1, grade2, grade3, average });
    } else {
        students[editIndex] = { name, grade1, grade2, grade3, average };
        editIndex = null;
    }

    form.reset();
    renderStudents();
});

function editStudent(index) {
    const student = students[index];

    document.getElementById('name').value = student.name;
    document.getElementById('grade1').value = student.grade1;
    document.getElementById('grade2').value = student.grade2;
    document.getElementById('grade3').value = student.grade3;

    editIndex = index;
}

function deleteStudent(index) {
    if (confirm('¿Seguro que deseas eliminar este estudiante?')) {
        students.splice(index, 1);
        renderStudents();
    }
}

renderStudents();
