import React from "react";
import { twMerge } from "tailwind-merge";
interface Props {
    children: React.ReactNode;
    className?: string;
}

const Container = ({ children, className }: Props) => {
    const newClassName = twMerge(
        "max-w-[1300px] mx-auto py-10 px-[50px] ",
        className
    );
    return <div className={newClassName}>{children}</div>;
};

export default Container;
