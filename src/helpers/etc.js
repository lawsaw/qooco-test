export function getMin(array_of_obj, field) {
    return array_of_obj.reduce((min, p) => p[field] < min ? p[field] : min, array_of_obj[0][field]);
}

export function getMax(array_of_obj, field) {
    return array_of_obj.reduce((max, p) => p[field] > max ? p[field] : max, array_of_obj[0][field]);
}

export function getMinDate(array_of_obj, field) {
    return array_of_obj.reduce((min, p) => {
        const [current_date, min_date] = [new Date(p[field]), new Date(min)];
        return current_date < min_date ? current_date : min_date
    }, array_of_obj[0][field]);
}

export function getMaxDate(array_of_obj, field) {
    return array_of_obj.reduce((max, p) => {
        const [current_date, max_date] = [new Date(p[field]), new Date(max)];
        return current_date > max_date ? current_date : max_date
    }, array_of_obj[0][field]);
}

export function timeout(time) {
    return new Promise(resolve => setTimeout(resolve, time));
};