export const formatNumber = num => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export const uppercaseFirst = str => str.charAt(0).toUpperCase() + str.slice(1)
