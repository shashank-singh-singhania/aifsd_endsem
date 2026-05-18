import React, { useState } from 'react';
import API from '../api';

function AIRecommendationDisplay({ employees }) {
  const [ai, setAi] = useState(null);
  const [loading, setLoading] = useState(false);

  const recommend = async () => {
    try {
      setLoading(true);
      const { data } = await API.post('/ai/recommend', { employees });
      setAi(data);
    } catch (err) {
      console.error(err);
      alert('Error fetching AI recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card">
      <h2>AI Recommendation Display Page</h2>
      <button onClick={recommend} disabled={loading || employees.length === 0}>
        {loading ? 'Generating...' : 'Generate AI Recommendations'}
      </button>
      {ai && (
        <div className="ai-results" style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {ai.summary && (
            <div style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #ddd' }}>
              <h3 style={{ marginTop: 0 }}>📊 Summary</h3>
              <p><strong>Total Employees:</strong> {ai.summary.totalEmployees}</p>
              <p><strong>Average Score:</strong> {ai.summary.averagePerformanceScore}</p>
            </div>
          )}

          {ai.rankings && ai.rankings.length > 0 && (
            <div style={{ padding: '15px', background: '#e3f2fd', borderRadius: '8px', border: '1px solid #bbdefb' }}>
              <h3 style={{ marginTop: 0 }}>🏆 Top Rankings</h3>
              <ol style={{ margin: 0, paddingLeft: '20px' }}>
                {ai.rankings.map((r, idx) => (
                  <li key={idx}><strong>{r.name}</strong> - Score: {r.performanceScore}</li>
                ))}
              </ol>
            </div>
          )}

          {ai.promotionRecommendations && ai.promotionRecommendations.length > 0 && (
            <div style={{ padding: '15px', background: '#e8f5e9', borderRadius: '8px', border: '1px solid #c8e6c9' }}>
              <h3 style={{ marginTop: 0 }}>⭐ Promotion Recommendations</h3>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {ai.promotionRecommendations.map((p, idx) => (
                  <li key={idx}><strong>{p.name}:</strong> {p.reason || p.promotion}</li>
                ))}
              </ul>
            </div>
          )}

          {ai.trainingSuggestions && ai.trainingSuggestions.length > 0 && (
            <div style={{ padding: '15px', background: '#fff3e0', borderRadius: '8px', border: '1px solid #ffe0b2' }}>
              <h3 style={{ marginTop: 0 }}>📚 Training Suggestions</h3>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {ai.trainingSuggestions.map((t, idx) => (
                  <li key={idx}>
                    <strong>{t.name}:</strong> {t.suggestion || (t.suggestedTraining && t.suggestedTraining.join(', '))}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {ai.feedback && ai.feedback.length > 0 && (
            <div style={{ padding: '15px', background: '#f3e5f5', borderRadius: '8px', border: '1px solid #e1bee7' }}>
              <h3 style={{ marginTop: 0 }}>💬 Individual Feedback</h3>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                {ai.feedback.map((f, idx) => (
                  <li key={idx}><strong>{f.name}:</strong> {f.comments || f.feedback}</li>
                ))}
              </ul>
            </div>
          )}

        </div>
      )}
    </section>
  );
}

export default AIRecommendationDisplay;
