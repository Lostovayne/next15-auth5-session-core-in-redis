"use client";

import { getCsrfToken } from "next-auth/react";
import { JSX, useEffect, useState } from "react";

/**
 * Componente que genera un input oculto con el token CSRF
 * @returns {JSX.Element} Input oculto con el token CSRF como valor por defecto
 * @description Este componente obtiene automáticamente el token CSRF al montarse
 * y lo establece como valor de un campo oculto del formulario para protección contra ataques CSRF
 * @example
 * <form>
 *   <CSRFInput />
 *   // otros campos del formulario
 * </form>
 */
export function CSRFInput(): JSX.Element {
  const [csrfToken, setCsrfToken] = useState<string | undefined>();

  useEffect(() => {
    getCsrfToken().then((res) => setCsrfToken(res));
  }, []);

  return <input type="hidden" name="csrfToken" defaultValue={csrfToken} />;
}
