export default function CategoryLoading() {
  return <main className="page-main"><div className="container-width"><div className="skeleton skeleton-banner" /><div className="skeleton-heading" /><div className="product-grid">{Array.from({ length: 6 }, (_, index) => <div className="skeleton-card" key={index}><div className="skeleton skeleton-emoji" /><div className="skeleton skeleton-line" /><div className="skeleton skeleton-line short" /><div className="skeleton skeleton-price" /></div>)}</div></div></main>;
}
