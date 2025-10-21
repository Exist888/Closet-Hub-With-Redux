import "./Spinner.scss";

export function Spinner({ children }) {
    return (
        <section className="spinner-container">
            <article className="spinner"></article>
            <span className="spinner-text">{children}</span>
        </section>
    );
}