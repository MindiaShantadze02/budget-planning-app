// async wrapper function for avoiding try-catch blocks
const asyncWrapper = (func) => {
    return async (req,res,next) => {
        try {
            await func(req,res,next);
        } catch(err) {
            throw new Error(err);
        }
    }
}

module.exports = asyncWrapper;