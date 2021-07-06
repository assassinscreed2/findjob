import axios from 'axios'

export async function getJobs(url){
    const userData = await axios.get(url);
    return userData}