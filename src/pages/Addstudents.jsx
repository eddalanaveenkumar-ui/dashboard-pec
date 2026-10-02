import { useState } from 'react'

const emptyStudent = {
  registerNo: '',
  name: '',
  department: '',
  year: '',
  semester: '',
  email: '',
  phone: ''
}

const departments = ['IT', 'CSE', 'ECE', 'MECH']
const years = ['I Year', 'II Year', 'III Year', 'IV Year']
const semesters = ['I Semester', 'II Semester', 'III Semester', 'IV Semester', 'V Semester', 'VI Semester', 'VII Semester', 'VIII Semester']

const Addstudents = ({ students, initialStudent, onSave, onCancel }) => {
  const [student, setStudent] = useState(initialStudent || emptyStudent)
  const [error, setError] = useState('')
  const isEditing = Boolean(initialStudent)

  function handleChange(event) {
    const fieldName = event.target.name
    const fieldValue = event.target.value
    setStudent({ ...student, [fieldName]: fieldValue })
  }

  function handleSubmit(event) {
    event.preventDefault()

    const duplicateRegisterNo = students.some(existingStudent =>
      existingStudent.registerNo === student.registerNo.trim() &&
      existingStudent.registerNo !== initialStudent?.registerNo
    )

    if (duplicateRegisterNo) {
      setError('That register number is already in use.')
      return
    }

    setError('')
    onSave({ ...student, registerNo: student.registerNo.trim() })
  }

  return (
    <section className="form-page">
      <div className="section-heading">
        <div>
          <p className="eyebrow">STUDENT RECORD</p>
          <h2>{isEditing ? 'Edit student' : 'Add a student'}</h2>
          <p>Complete each field to {isEditing ? 'update' : 'create'} a record.</p>
        </div>
      </div>

      <form className="student-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            Register number
            <input name="registerNo" value={student.registerNo} onChange={handleChange} required />
          </label>
          <label>
            Student name
            <input name="name" value={student.name} onChange={handleChange} required />
          </label>
          <label>
            Department
            <select name="department" value={student.department} onChange={handleChange} required>
              <option value="">Select department</option>
              {departments.map(department => <option key={department}>{department}</option>)}
            </select>
          </label>
          <label>
            Year
            <select name="year" value={student.year} onChange={handleChange} required>
              <option value="">Select year</option>
              {years.map(year => <option key={year}>{year}</option>)}
            </select>
          </label>
          <label>
            Semester
            <select name="semester" value={student.semester} onChange={handleChange} required>
              <option value="">Select semester</option>
              {semesters.map(semester => <option key={semester}>{semester}</option>)}
            </select>
          </label>
          <label>
            Email address
            <input name="email" type="email" value={student.email} onChange={handleChange} required />
          </label>
          <label>
            Phone number
            <input name="phone" type="tel" pattern="[0-9+() -]{7,20}" value={student.phone} onChange={handleChange} required />
          </label>
        </div>

        {error && <p className="form-error" role="alert">{error}</p>}

        <div className="form-actions">
          <button className="button button-secondary" onClick={onCancel} type="button">Cancel</button>
          <button className="button button-primary" type="submit">{isEditing ? 'Save changes' : 'Add student'}</button>
        </div>
      </form>
    </section>
  )
}

export default Addstudents
