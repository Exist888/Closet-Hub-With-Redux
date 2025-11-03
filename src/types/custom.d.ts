declare module "*.svg?react" {
    import type { FC, SVGProps } from "react";
    const ReactComponent: FC<SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}

declare module "*.png" {
    const value: string;
    export default value;
}