import data from '../data/data.js'
const {
    maleNames,
    femaleNames,
    maleFaces,
    femaleFaces,
    lastNames
} = data;

const getRandomNumber = (start = 0, end = 99) => {
    return Math.floor(Math.random() * (end - start + 1)) + start;
}

const getRandomFromArray = (array) => {
    if (!Array.isArray(array) || array.length === 0) {
        return null;
    }

    return array[getRandomNumber(0, array.length - 1)];
};

const createRandomUser = () => {
    const isFemale = Math.random() < 0.5;
    const gender = isFemale ? 'female' : 'male';
    const arrayFirstName = isFemale ? femaleNames : maleNames;
    const avatar = getRandomFromArray(isFemale ? femaleFaces : maleFaces);
    const firstName = getRandomFromArray(arrayFirstName);
    const lastName = getRandomFromArray(lastNames);
    const userName = `${firstName.at(0)}${lastName}`.toLowerCase();
    const email = `${firstName}.${lastName}@${Math.random() < 0.5 ? 'gmail' : 'outlook'}.com`;
    const age = getRandomNumber(19,45);
    return { firstName, lastName, userName, avatar, email, age, gender };
}

export default createRandomUser;
