export const updateObject = (old, properties) => {
    return {
        ...old,
        ...properties
    }
}

export default updateObject;