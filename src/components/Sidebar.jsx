
import pecLogo from "../assets/pec-logo.jpg"
import "./Sidebar.css"

const pages = ['Dashboard', 'Students', 'Add Student']


const Sidebar = ({ activePage, onNavigate }) => {
  return (
    <aside className="sidebar">
      <a className="brand" href="#dashboard" onClick={event => {
        event.preventDefault()
        onNavigate('Dashboard')
      }}>
        <img className="pec-logo" src={pecLogo} alt="Prathyusha Engineering College logo" />
        <span className="heading-name">PEC ERP</span>
      </a>
      <p className="nav-heading">WORKSPACE</p>
      <nav className="side-nav" aria-label="Main navigation">
        {pages.map((page, index) => (
          <button
            className={activePage === page ? 'nav-button active' : 'nav-button'}
            key={page}
            onClick={() => onNavigate(page)}
            type="button"
          >
            <span className="nav-index">0{index + 1}</span>
            <span>{page}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-note">
        <span className="status-dot"></span>
        <span>Student records</span>
      </div>
    </aside>
  )
}

export default Sidebar
