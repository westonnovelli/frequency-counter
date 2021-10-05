import React from 'react';

const encode = (d: any) => btoa(JSON.stringify(d));
const decode = (s: string) => JSON.parse(atob(s));

interface Result<T> {
    save: (data: any) => void;
    load: (defaultValue: T) => T;
    switchNamespace: (name: string, defaultValue: T) => T;
}

const usePersistence = <T>(inputNamespace = 'foo'): Result<T> => {
    const [namespace, setNamespace] = React.useState(inputNamespace);
    const save = (data: any) => {
        localStorage.setItem(`fc-${namespace}-64`, encode(data));
    };

    const load = (defaultValue: T): T => {
        const blob = localStorage.getItem(`fc-${namespace}-64`);
        if (blob) {
            return decode(blob);
        }
        return defaultValue;
    }

    const switchNamespace = (newNamespace: string, defaultValue: T) => {
        setNamespace(newNamespace);
        return load(defaultValue);
    }

    const lastSave = localStorage.getItem('fc-lastSave');
    if (lastSave) {
        setNamespace(lastSave);
    }

    return {
        save,
        load,
        switchNamespace
    };
};

export default usePersistence;
