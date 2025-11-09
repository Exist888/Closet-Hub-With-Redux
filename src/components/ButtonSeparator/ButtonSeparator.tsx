import { JSX } from "react";
import "./ButtonSeparator.scss";

export function ButtonSeparator(): JSX.Element {
    return (
        <div className="button-separator">
            <div className="line"></div>
            <span className="text">OR</span>
            <div className="line"></div>
        </div>
    );
}