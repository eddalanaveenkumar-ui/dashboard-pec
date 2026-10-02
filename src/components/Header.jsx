const pageDescriptions = {
  Dashboard: 'A clear view of your student records.',
  Students: 'Search, sort, and update student records.',
  'Add Student': 'Enter student details and save the record.'
}

const Header = ({ activePage }) => {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">STUDENT MANAGEMENT</p>
        <h1>{activePage}</h1>
        <p className="page-description">{pageDescriptions[activePage]}</p>
      </div>
      <div className="admin-label">
        <span className="admin-avatar">A</span>
        <span>Administrator</span>
      </div>
    </header>
  )
}

export default Header

