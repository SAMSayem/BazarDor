export default function HomeLoading() {
  return <main className="home-page"><div className="container-width"><div className="skeleton skeleton-hero" /><div className="skeleton-heading" /><div className="product-grid">{Array.from({ length: 6 }, (_, index) => <div className="skeleton-card" key={index}><div className="skeleton skeleton-emoji" /><div className="skeleton skeleton-line" /><div className="skeleton skeleton-line short" /><div className="skeleton skeleton-price" /></div>)}</div></div></main>;
}
