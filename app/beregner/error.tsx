"use client";

interface Props {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  return (
    <div className="p-8">
      <h1>Der opstod en fejl</h1>

      <p>{error.message}</p>

      <button onClick={reset}>
        Prøv igen
      </button>
    </div>
  );
}