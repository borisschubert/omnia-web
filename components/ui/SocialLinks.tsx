const FACEBOOK_URL = "https://www.facebook.com/omniaslovakia";
const INSTAGRAM_URL = "https://www.instagram.com/omniaslovakia/";
const YOUTUBE_URL = "https://www.youtube.com/@OmniaSlovakia/videos";

const linkClass =
  "p-2 rounded-full text-foreground/70 hover:text-accent hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60";

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-2">
      <a
        href={FACEBOOK_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook"
        className={linkClass}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.095 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.512c-1.49 0-1.953.93-1.953 1.887v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.095 24 18.1 24 12.073z" />
        </svg>
      </a>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className={linkClass}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0z" />
          <path d="M12 0c3.3 0 3.7 0 5 .1 1.3.1 2.2.3 3 .6.9.3 1.6.7 2.3 1.4.7.7 1.1 1.4 1.4 2.3.3.8.5 1.7.6 3 .1 1.3.1 1.7.1 5s0 3.7-.1 5c-.1 1.3-.3 2.2-.6 3-.3.9-.7 1.6-1.4 2.3-.7.7-1.4 1.1-2.3 1.4-.8.3-1.7.5-3 .6-1.3.1-1.7.1-5 .1s-3.7 0-5-.1c-1.3-.1-2.2-.3-3-.6-.9-.3-1.6-.7-2.3-1.4-.7-.7-1.1-1.4-1.4-2.3-.3-.8-.5-1.7-.6-3C0 15.7 0 15.3 0 12s0-3.7.1-5c.1-1.3.3-2.2.6-3C1 3.1 1.4 2.4 2.1 1.7 2.8 1 3.5.6 4.4.3c.8-.3 1.7-.5 3-.6C8.7 0 9.1 0 12 0zm0 2.2c-3.2 0-3.6 0-4.9.1-1.2.1-1.8.3-2.2.4-.6.2-1 .5-1.5 1-.5.5-.8.9-1 1.5-.2.4-.4 1-.4 2.2C2.2 9.7 2.2 10.1 2.2 12s0 2.3.1 4.9c.1 1.2.3 1.8.4 2.2.2.6.5 1 .9 1.5.5.5.9.8 1.5 1 .4.2 1 .4 2.2.4 1.3.1 1.7.1 4.9.1s3.6 0 4.9-.1c1.2-.1 1.8-.3 2.2-.4.6-.2 1-.5 1.5-1 .5-.5.8-.9 1-1.5.2-.4.4-1 .4-2.2.1-1.3.1-1.7.1-4.9s0-3.6-.1-4.9c-.1-1.2-.3-1.8-.4-2.2-.2-.6-.5-1-.9-1.5-.5-.5-.9-.8-1.5-1-.4-.2-1-.4-2.2-.4-1.3-.1-1.7-.1-4.9-.1z" />
        </svg>
      </a>
      <a
        href={YOUTUBE_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="YouTube"
        className={linkClass}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      </a>
    </div>
  );
}
