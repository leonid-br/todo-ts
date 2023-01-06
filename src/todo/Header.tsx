import React from 'react';

interface IProps {
    title: string;
}

export const Header = ({ title }: IProps) => {
    return (
        <div>
            <h1>{title}</h1>
        </div>
    );
};
