"use client";

import { getCsrfToken } from "next-auth/react";
import { useEffect, useState } from "react";

export function CSRFInput() {
  const [csrfToken, setCsrfToken] = useState<string>();
  useEffect(() => {
    getCsrfToken().then((res) => setCsrfToken(res));
  }, []);
  return <input type="hidden" name="csrfToken" defaultValue={csrfToken} />;
}
