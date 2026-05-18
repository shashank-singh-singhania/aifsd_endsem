import React, { useEffect, useState } from 'react';
import API from './api';
import Auth from './components/Auth';
import EmployeeRegistrationForm from './components/EmployeeRegistrationForm';
import SearchAndFilterSection from './components/SearchAndFilterSection';
import EmployeeListPage from './components/EmployeeListPage';
import AIRecommendationDisplay from './components/AIRecommendationDisplay';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || 'null'));
  const [employees, setEmployees] = useState([]);
  const [filter, setFilter] = useState('');

  const load = async () => {
    try {
      const { data } = await API.get('/employees');
      setEmployees(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { 
    if(user) load(); 
  }, [user]);

  if (!user) return <Auth setUser={setUser} />;

  const search = async () => {
    try {
      const url = filter ? `/employees/search?department=${filter}` : '/employees';
      const { data } = await API.get(url);
      setEmployees(data);
    } catch (err) {
      console.error(err);
    }
  };

  const reset = () => {
    setFilter('');
    load();
  };

  const del = async id => { 
    try {
      await API.delete(`/employees/${id}`); 
      load(); 
    } catch (err) {
      console.error(err);
    }
  };

  const updateScore = async (id, score) => { 
    try {
      await API.patch(`/employees/${id}`, { performanceScore: Number(score) }); 
      load(); 
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main>
      <header>
        <h1>AI Employee Performance Analytics</h1>
        <button onClick={() => { localStorage.clear(); setUser(null); }}>Logout</button>
      </header>
      
      <section className="stats">
        <div className="card">Employees <b>{employees.length}</b></div>
        <div className="card">
          Avg Score <b>{employees.length ? Math.round(employees.reduce((a,e)=>a+e.performanceScore,0)/employees.length) : 0}</b>
        </div>
        <div className="card">Top Performer <b>{employees[0]?.name || '-'}</b></div>
      </section>

      <EmployeeRegistrationForm onAdded={load} />
      
      <SearchAndFilterSection 
        filter={filter} 
        setFilter={setFilter} 
        search={search} 
        reset={reset} 
      />
      
      <EmployeeListPage 
        employees={employees} 
        updateScore={updateScore} 
        del={del} 
      />
      
      <AIRecommendationDisplay employees={employees} />
      
    </main>
  );
}

export default App;
