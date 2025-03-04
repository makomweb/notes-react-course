export const updateObject = (old, updated) => {
    return {
        ...old,
        ...updated
    }
}

export const isValid = (value, rules) => {
    if (!rules) {
        return true;
    }

    let isValid = true;
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
        const pattern = /^\S+@\S+\.\S+$/;
        isValid = pattern.test(value) && isValid;
    }

    return isValid;
}