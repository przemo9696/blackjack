export const  wait = async (time = 500) => {
    await new Promise(resolve => setTimeout(resolve, time));
}