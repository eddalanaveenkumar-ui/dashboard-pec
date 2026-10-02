import { useState } from 'react'

const departments = ['IT', 'CSE', 'ECE', 'MECH']
const years = ['I Year', 'II Year', 'III Year', 'IV Year']
const semesters = ['I Semester', 'II Semester', 'III Semester', 'IV Semester', 'V Semester', 'VI Semester', 'VII Semester', 'VIII Semester']

const Students = ({ students, onEdit, onDelete }) => {
    const [searchText, setSearchText] = useState('')
    const [departmentFilter, setDepartmentFilter] = useState('')
    const [yearFilter, setYearFilter] = useState('')
    const [semesterFilter, setSemesterFilter] = useState('')
    const [sortBy, setSortBy] = useState('name')
    const [ascending, setAscending] = useState(true)

    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchText.toLowerCase()) ||
            student.registerNo.toLowerCase().includes(searchText.toLowerCase())
        const matchesDepartment = departmentFilter === '' || student.department === departmentFilter
        const matchesYear = yearFilter === '' || student.year === yearFilter
        const matchesSemester = semesterFilter === '' || student.semester === semesterFilter

        return matchesSearch && matchesDepartment && matchesYear && matchesSemester
    })

    const sortedStudents = filteredStudents.slice().sort((firstStudent, secondStudent) => {
        const firstValue = firstStudent[sortBy].toLowerCase()
        const secondValue = secondStudent[sortBy].toLowerCase()
        const comparison = firstValue.localeCompare(secondValue, undefined, { numeric: true })

        return ascending ? comparison : -comparison
    })

    function clearFilters() {
        setSearchText('')
        setDepartmentFilter('')
        setYearFilter('')
        setSemesterFilter('')
    }

    return (
        <section className="students-page">
            <div className="section-heading students-heading">
                <div>
                    <p className="eyebrow">RECORDS</p>
                    <h2>All students</h2>
                    <p>{students.length} student {students.length === 1 ? 'record' : 'records'}</p>
                </div>
            </div>

            <section className="filters-panel" aria-label="Search and filter students">
                <label className="search-field">
                    Search
                    <input
                        type="search"
                        placeholder="Name or register number"
                        value={searchText}
                        onChange={event => setSearchText(event.target.value)}
                    />
                </label>
                <label>
                    Department
                    <select value={departmentFilter} onChange={event => setDepartmentFilter(event.target.value)}>
                        <option value="">All departments</option>
                        {departments.map(department => <option key={department}>{department}</option>)}
                    </select>
                </label>
                <label>
                    Year
                    <select value={yearFilter} onChange={event => setYearFilter(event.target.value)}>
                        <option value="">All years</option>
                        {years.map(year => <option key={year}>{year}</option>)}
                    </select>
                </label>
                <label>
                    Semester
                    <select value={semesterFilter} onChange={event => setSemesterFilter(event.target.value)}>
                        <option value="">All semesters</option>
                        {semesters.map(semester => <option key={semester}>{semester}</option>)}
                    </select>
                </label>
                <label>
                    Sort by
                    <select value={sortBy} onChange={event => setSortBy(event.target.value)}>
                        <option value="name">Name</option>
                        <option value="registerNo">Register number</option>
                        <option value="department">Department</option>
                        <option value="year">Year</option>
                    </select>
                </label>
                <button className="button button-secondary clear-button" onClick={clearFilters} type="button">Clear filters</button>
            </section>

            <section className="table-panel">
                <div className="table-heading">
                    <h3>Student directory</h3>
                    <button className="sort-button" onClick={() => setAscending(!ascending)} type="button">
                        {ascending ? 'Ascending' : 'Descending'}
                    </button>
                </div>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr>
                                <th>Register number</th>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Year</th>
                                <th>Semester</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedStudents.map(student => (
                                <tr key={student.registerNo}>
                                    <td className="register-cell">{student.registerNo}</td>
                                    <td className="name-cell">{student.name}</td>
                                    <td><span className="table-tag">{student.department}</span></td>
                                    <td>{student.year}</td>
                                    <td>{student.semester}</td>
                                    <td>{student.email}</td>
                                    <td>{student.phone}</td>
                                    <td>
                                        <div className="row-actions">
                                            <button className="text-button" onClick={() => onEdit(student)} type="button">Edit</button>
                                            <button className="text-button delete-button" onClick={() => onDelete(student.registerNo)} type="button">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {sortedStudents.length === 0 && (
                                <tr>
                                    <td className="empty-state" colSpan="8">No students match these filters.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <p className="results-count">Showing {sortedStudents.length} of {students.length} records</p>
            </section>
        </section>
    )
}

export default Students
