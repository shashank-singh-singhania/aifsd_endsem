import React from 'react';

function EmployeeListPage({ employees, updateScore, del }) {
  return (
    <section className="card">
      <h2>Employee List & Rankings</h2>
      <div className="table">
        {employees.map((e, i) => (
          <div className="tr" key={e._id}>
            <span>#{i + 1}</span>
            <b>{e.name}</b>
            <span>{e.department}</span>
            <span>{e.skills.join(', ')}</span>
            <input 
              type="number" 
              defaultValue={e.performanceScore} 
              onBlur={ev => updateScore(e._id, ev.target.value)} 
            />
            <span>{e.experience} yrs</span>
            <button onClick={() => del(e._id)}>Delete</button>
          </div>
        ))}
        {employees.length === 0 && <p style={{padding: '10px'}}>No employees found.</p>}
      </div>
    </section>
  );
}

export default EmployeeListPage;
