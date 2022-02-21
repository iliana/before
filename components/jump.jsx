export default function Jump({ children, className, ...jump }) {
  const params = new URLSearchParams({
    redirect: jump.season && jump.season > 11 ? "/league" : "/",
    ...jump,
  });

  return (
    <a className={className} href={`/_before/jump?${params}`}>
      {children}
    </a>
  );
}
