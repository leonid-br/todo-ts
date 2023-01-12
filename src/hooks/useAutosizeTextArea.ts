import React, { useEffect } from 'react';

interface ITextArea {
    textAreaRef: React.RefObject<HTMLTextAreaElement> | null;
    description: string;
}

export const useAutosizeTextArea = ({
    textAreaRef,
    description,
}: ITextArea) => {
    useEffect(() => {
        if (textAreaRef && textAreaRef.current) {
            textAreaRef.current.style.height = '0px';
            const scrollHeight = textAreaRef.current.scrollHeight;
            textAreaRef.current.style.height = scrollHeight + 'px';
        }
    }, [textAreaRef, description]);
};
