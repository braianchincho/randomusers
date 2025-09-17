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
const randomGender = () => Math.random() < 0.5 ? 'female' : 'male';

const createRandomUser = (gender, minAge = 17, maxAge = 55) => {
    const isFemale = gender === "female";
    const firstName = getRandomFromArray(isFemale ? femaleNames : maleNames);
    const lastName = getRandomFromArray(lastNames);

    return {
        firstName,
        lastName,
        userName: `${firstName[0]}${lastName}`.toLowerCase(),
        avatar: getRandomFromArray(isFemale ? femaleFaces : maleFaces),
        email: `${firstName}.${lastName}@${getRandomFromArray(["gmail", "outlook"])}.com`,
        age: getRandomNumber(minAge, maxAge),
        gender,
    };
};

const getUsers = ({ limit = 100, gender, minAge = 17, maxAge = 55 } = {}) => {
    const safeLimit = Math.min(limit, 100);
    const safeGender = ["female", "male"].includes(gender) ? gender : null;

    return Array.from({ length: safeLimit }, () =>
        createRandomUser(safeGender ?? randomGender(), minAge, maxAge)
    );
};

export default {createRandomUser, getUsers };
