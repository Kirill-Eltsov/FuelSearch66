export default function StateMessage({
  title,
  text,
  actionLabel,
  onAction,
  variant = 'info',
}) {
  return (
    <div className={`state-message state-message--${variant}`} role="status">
      {title ? <strong>{title}</strong> : null}
      {text ? <p>{text}</p> : null}
      {actionLabel && onAction ? (
        <button type="button" className="btn btn-primary" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
