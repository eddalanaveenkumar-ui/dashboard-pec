const departments = ['IT', 'CSE', 'ECE', 'MECH']
const years = ['I Year', 'II Year', 'III Year', 'IV Year']

const Dashboard = ({ students }) => {
    const departmentCounts = { IT: 0, CSE: 0, ECE: 0, MECH: 0 }
    const yearCounts = { 'I Year': 0, 'II Year': 0, 'III Year': 0, 'IV Year': 0 }

    students.forEach(student => {
        departmentCounts[student.department] += 1
        yearCounts[student.year] += 1
    })

    return (
        <section className="dashboard-page">
            <div className="section-heading">
                <div>
                    <p className="eyebrow">OVERVIEW</p>
                    <h2>Student snapshot</h2>
                    <p>Enrollment totals update when student records change.</p>
                </div>
            </div>

            <div className="total-panel">
                <div>
                    <p className="panel-label">TOTAL STUDENTS</p>
                    <p className="total-value">{students.length}</p>
                </div>
                <span className="panel-mark">ST</span>
            </div>

            <div className="summary-grid">
                <section className="summary-panel">
                    <div className="panel-heading">
                        <div>
                            <p className="eyebrow">BY DEPARTMENT</p>
                            <h3>Department totals</h3>
                        </div>
                        <span className="panel-count">{departments.length}</span>
                    </div>
                    {departments.map(department => (
                        <div className="count-row" key={department}>
                            <span>{department}</span>
                            <strong>{departmentCounts[department]}</strong>
                        </div>
                    ))}
                </section>

                <section className="summary-panel">
                    <div className="panel-heading">
                        <div>
                            <p className="eyebrow">BY YEAR</p>
                            <h3>Year totals</h3>
                        </div>
                        <span className="panel-count">{years.length}</span>
                    </div>
                    {years.map(year => (
                        <div className="count-row" key={year}>
                            <span>{year}</span>
                            <strong>{yearCounts[year]}</strong>
                        </div>
                    ))}
                </section>
            </div>
        </section>
    )
}

export default Dashboard
