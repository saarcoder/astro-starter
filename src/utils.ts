const formatDate= (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return new Date(date).toLocaleDateString(undefined, options);
}

const capitalize= (s: string): string=> {
    if(typeof s !== 'string' || s.length===0) return s;
    return s.charAt(0).toUpperCase()+ s.slice(1);
}

export { formatDate, capitalize };