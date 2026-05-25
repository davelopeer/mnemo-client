const iconPaths = {
  home: 'M3 10.5L12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9.5z',
  user: 'M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-4 0-8 2-8 6v1h16v-1c0-4-4-6-8-6z',
  friends:
    'M8 11a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm8 0a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm-8 2c-3 0-6 1.5-6 4.5V20h8v-2.5A5.4 5.4 0 0 1 10 14.1 11 11 0 0 0 8 13zm8 0a8.7 8.7 0 0 0-2 .2 5.2 5.2 0 0 1 2 3.8V20h6v-2.5c0-3-3-4.5-6-4.5z',
  plus: 'M12 5v14M5 12h14',
  search: 'M21 21l-4.3-4.3m1.3-5.2a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z',
  logout: 'M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l-5-5 5-5M5 12h12',
  filter: 'M4 5h16M7 12h10M10 19h4',
  book: 'M4 4h10a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H4z',
  film: 'M3 4h18v16H3zM7 4v16M17 4v16M3 8h4M17 8h4M3 16h4M17 16h4',
  tv: 'M3 6h18v12H3zM8 22h8M12 18v4',
  gamepad: 'M6 12h4M8 10v4M15 11h.01M17 13h.01M4 8h16a2 2 0 0 1 2 2v4a4 4 0 0 1-7.2 2.4l-1.3-1.7h-3l-1.3 1.7A4 4 0 0 1 2 14v-4a2 2 0 0 1 2-2z',
  sparkle: 'M12 2l2 5 5 2-5 2-2 5-2-5-5-2 5-2z',
  mail: 'M3 6h18v12H3zM3 6l9 7 9-7'
};

function Icon({ name, size = 18, strokeWidth = 1.8, filled = false, className }) {
  const path = iconPaths[name];
  if (!path) return null;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

export default Icon;
