/**
 * Set a cookie with the given name, value, and expiry days
 */
export function setCookie(name: string, value: string, days: number) {
  if (typeof document === "undefined") return;

  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
}

/**
 * Get a cookie by name
 */
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const nameWithEquals = `${name}=`;
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(nameWithEquals) === 0) {
      return cookie.substring(nameWithEquals.length);
    }
  }

  return null;
}

/**
 * Delete a cookie by name
 */
export function deleteCookie(name: string) {
  if (typeof document === "undefined") return;

  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`;
}

/**
 * Remove all cookies from the browser
 */
export function removeAllCookies() {
  if (typeof document === "undefined") return;

  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    const [name] = cookie.split("=");
    deleteCookie(name);
  }
}

/**
 * Remove all items from localStorage
 */
export function removeAllLocalStorage() {
  if (typeof window === "undefined") return;

  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}
