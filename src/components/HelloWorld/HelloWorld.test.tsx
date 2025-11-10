import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { HelloWorld } from "./HelloWorld";

describe("HelloWorld practice test", () => {
    test("renders hello text", () => {
        render(<HelloWorld />);
        const element = screen.getByText(/hello, world/i);
        expect(element).toBeInTheDocument();
    });
});