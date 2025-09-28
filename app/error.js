"use client";
export default function GlobalError({ error, reset }) {
  return (
    <div className="error-container" style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Something went wrong! {error?.message}</h2>
      <button
        onClick={() => reset()}
        style={{
          padding: '0.5rem 1rem',
          marginTop: '1rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Try again
      </button>
    </div>
  );
}
