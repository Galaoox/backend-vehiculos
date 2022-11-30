export function dateToHourAndMinutes(date: Date): string {
    return date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });
}

export function datetoAAAMMDD(date: Date): string {
    return (
        date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    );
}
