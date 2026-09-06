export default function ErrorState({ message = "Something went wrong.", onRetry }) {
  return (
    <div className="error-state">
      <p style={{ margin: 0 }}>⚠️ {message}</p>
      {onRetry && <button onClick={onRetry}>Retry</button>}
    </div>
  );
}
