import React from "react";

export interface HeaderProps {
  title: string;
}

export default function Header(props: HeaderProps) {
  return <h3 className="ui block center aligned header">{props.title}</h3>;
}
