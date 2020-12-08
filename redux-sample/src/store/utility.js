export const updateObject = (old, updatedValues) => {
    return {
        ...old,
        ...updatedValues
    }
}

export default updateObject;