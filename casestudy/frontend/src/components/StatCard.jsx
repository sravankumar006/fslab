/**
 * StatCard Component for Dashboard Key Performance Indicators
 */
export function StatCard({ label, value, subtext, icon, color = 'blue' }) {
  return (
    <div className={`stat-card stat-${color}`}>
      <div className="stat-card-header">
        <span className="stat-label">{label}</span>
        {icon && <div className="stat-icon-wrapper">{icon}</div>}
      </div>
      <div className="stat-value">{value}</div>
      {subtext && <div className="stat-subtext">{subtext}</div>}
    </div>
  );
}

export default StatCard;

