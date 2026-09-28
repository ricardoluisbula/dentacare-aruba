import type { SVGProps } from "react";

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} {...props}>
      <path d="M15.5 8.5h-2a1.5 1.5 0 0 0-1.5 1.5v2h3.5l-.5 3H12v7h-3v-7H7v-3h2v-2.3C9 6.9 10.4 5.5 13 5.5h2.5v3Z" />
    </svg>
  );
}

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="8" cy="8.5" r="0.9" fill="currentColor" stroke="none" />
      <path d="M8 11.5v6" strokeLinecap="round" />
      <path d="M12 17.5v-3.7c0-1.3.8-2 1.9-2s1.9.7 1.9 2v3.7" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 11.5v6" strokeLinecap="round" />
    </svg>
  );
}

export function GoogleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.82Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.88-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.95H1.27v3.1A11.997 11.997 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58v-3.1H1.27a12 12 0 0 0 0 10.78l4-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.35.61 4.6 1.8l3.45-3.44C17.95 1.19 15.24 0 12 0A11.997 11.997 0 0 0 1.27 6.61l4 3.1c.95-2.84 3.6-4.94 6.73-4.94Z"
      />
    </svg>
  );
}

export function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" {...props}>
      <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.36.687 4.56 1.87 6.41L4 29l7.79-1.84A11.93 11.93 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.6a9.55 9.55 0 0 1-4.87-1.34l-.35-.21-4.62 1.09 1.11-4.5-.23-.37A9.56 9.56 0 1 1 25.56 15a9.57 9.57 0 0 1-9.556 9.6Zm5.24-7.17c-.29-.14-1.7-.84-1.96-.93-.26-.1-.46-.14-.65.14-.19.29-.75.93-.92 1.12-.17.19-.34.21-.63.07-.29-.14-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.14-.65-1.57-.89-2.15-.24-.57-.48-.5-.65-.5-.17-.01-.36-.01-.55-.01-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.39 0 1.41 1.02 2.77 1.17 2.96.14.19 2.01 3.07 4.87 4.3.68.29 1.21.47 1.63.6.68.22 1.3.19 1.79.11.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.33Z" />
    </svg>
  );
}
