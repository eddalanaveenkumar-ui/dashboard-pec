import { useState } from 'react'

import './App.css'
import Addstudents from './pages/Addstudents.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Students from './pages/Students.jsx'
import Header from './components/Header.jsx'
import Sidebar from './components/Sidebar.jsx'

function App() {
    const [students, setStudents] = useState([
        {
            registerNo: '111424148021',
            name: 'Naveen',
            department: 'CSE',
            year: 'III Year',
            semester: 'V Semester',
            email: 'naveen@example.com',
            phone: '1234567890'
        }
    ])
    const [activePage, setActivePage] = useState('Dashboard')
    const [editingStudent, setEditingStudent] = useState(null)

    function openPage(page) {
        setEditingStudent(null)
        setActivePage(page)
    }

    function saveStudent(student) {
        if (editingStudent) {
            setStudents(previousStudents => previousStudents.map(previousStudent =>
                previousStudent.registerNo === editingStudent.registerNo ? student : previousStudent
            ))
        } else {
            setStudents(previousStudents => [...previousStudents, student])
        }

        setEditingStudent(null)
        setActivePage('Students')
    }

    function editStudent(student) {
        setEditingStudent(student)
        setActivePage('Add Student')
    }

    function deleteStudent(registerNo) {
        const shouldDelete = window.confirm('Are you sure you want to delete this student?')

        if (shouldDelete) {
            setStudents(previousStudents => previousStudents.filter(student => student.registerNo !== registerNo))
        }
    }

    return (
        <div className="app-shell">
            <Sidebar activePage={activePage} onNavigate={openPage} />
            <div className="app-main">
                <Header activePage={activePage} />
                <main className="page-content">
                    {activePage === 'Dashboard' && <Dashboard students={students} />}
                    {activePage === 'Students' && (
                        <Students students={students} onEdit={editStudent} onDelete={deleteStudent} />
                    )}
                    {activePage === 'Add Student' && (
                        <Addstudents
                            key={editingStudent ? editingStudent.registerNo : 'new-student'}
                            students={students}
                            initialStudent={editingStudent}
                            onSave={saveStudent}
                            onCancel={() => openPage('Students')}
                        />
                    )}
                </main>
            </div>
        </div>
    )
}

export default App