const API_KEY = process.env.API_KEY;

export const getFood = async (query: string) => {
    try {
        const response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${query}`,{
        method: 'GET',
        headers: { 'X-Api-Key': API_KEY as string }
        });
        if(!response.ok) {
            const { error } = await response.json();
            throw error;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw Error('Error getting nutritions');
    }
}