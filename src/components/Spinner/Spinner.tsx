import type { JSX, ReactNode } from "react";
import "./Spinner.scss";

type SpinnerProps = {
    // Make children prop optional
    children?: ReactNode
}

export function Spinner({ children }: SpinnerProps): JSX.Element {
    return (
        <section className="spinner-container" data-testid="spinner">
            <article className="spinner"></article>
            {/* Only render span if children prop is present */}
            {children && <span className="spinner-text">{children}</span>}
        </section>
    );
}