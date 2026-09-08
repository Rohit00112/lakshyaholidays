const paths = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  diagonal: <path d="M6 18 18 6M6 6h12v12" />,
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  mountain: (
    <>
      <path d="m2 20 7-13 4 7 3-5 6 11H2Z" />
      <path d="m6.5 11.5 2.5 2 2.5-2" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m16 8-2.5 5.5L8 16l2.5-5.5L16 8Z" />
    </>
  ),
  phone: (
    <path d="m7 3 3 5-3 2c1.5 3 4 5.5 7 7l2-3 5 3c0 3-2 5-5 4C8 19 3 14 2 7c0-3 2-5 5-4Z" />
  ),
  chat: (
    <>
      <path d="M21 11.5a9 9 0 0 1-13 8L3 21l1.5-5A9 9 0 1 1 21 11.5Z" />
      <path d="M8 12h8M8 8h5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 5 5" />
    </>
  ),
  plane: <path d="m22 2-7 20-4-9-9-4L22 2ZM11 13l6-6" />,
  bed: (
    <>
      <path d="M3 18v3m18-3v3M3 10V4m0 14h18v-7a2 2 0 0 0-2-2h-8v9M3 14h8" />
      <circle cx="7" cy="10" r="2" />
    </>
  ),
  document: <path d="M14 2H5v20h14V7l-5-5Zm0 0v6h5M8 12h8m-8 4h6" />,
  people: (
    <>
      <circle cx="9" cy="7" r="3" />
      <path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 5v2" />
    </>
  ),
};

export default function Icon({ name, className = "" }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
