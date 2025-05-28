import type { ComponentProps } from "react";

export const H1 = (props: ComponentProps<"h1">) => (
  <h1 {...props} className="text-h1">
    {props.children}
  </h1>
);
export const H2 = (props: ComponentProps<"h2">) => (
  <h2 {...props} className="text-h2">
    {props.children}
  </h2>
);
export const H3 = (props: ComponentProps<"h3">) => (
  <h3 {...props} className="text-h3">
    {props.children}
  </h3>
);
export const H4 = (props: ComponentProps<"h4">) => (
  <h4 {...props} className="text-h4">
    {props.children}
  </h4>
);
export const H5 = (props: ComponentProps<"h5">) => (
  <h5 {...props} className="text-h5">
    {props.children}
  </h5>
);
export const TextCardItem = (props: ComponentProps<"h1">) => (
  <h5 {...props} className="text-card-item">
    {props.children}
  </h5>
);
export const TextLead = (props: ComponentProps<"p">) => (
  <p {...props} className="text-lead">
    {props.children}
  </p>
);
export const TextBody = (props: ComponentProps<"p">) => (
  <p {...props} className="text-body">
    {props.children}
  </p>
);
export const TextButton = (props: ComponentProps<"h1">) => (
  <h1 {...props} className="text-button text-primary">
    {props.children}
  </h1>
);
export const TextGrey = (props: ComponentProps<"p">) => (
  <p {...props} className="text-grey text-grey-color">
    {props.children}
  </p>
);
export const TextSubtle = (props: ComponentProps<"p">) => (
  <p {...props} className="text-subtle text-subtle-color">
    {props.children}
  </p>
);
export const Caption = (props: ComponentProps<"p">) => (
  <p {...props} className="text-caption text-caption-color">
    {props.children}
  </p>
);
