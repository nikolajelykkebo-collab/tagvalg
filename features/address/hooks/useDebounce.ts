"use client";

import { useEffect, useState } from "react";

export function useDebounce<T>(
  værdi: T,
  forsinkelse = 300
) {
  const [debouncedVærdi, sætDebouncedVærdi] = useState(værdi);

  useEffect(() => {
    const timeout = setTimeout(() => {
      sætDebouncedVærdi(værdi);
    }, forsinkelse);

    return () => clearTimeout(timeout);
  }, [værdi, forsinkelse]);

  return debouncedVærdi;
}