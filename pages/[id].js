import axios from 'axios'
import {useRouter} from 'next/router'
import {useState,useEffect} from 'react';

import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles(theme => ({
    card:{
        paddingTop:"5em",
        backgroundColor:"#F5E6CA"
    }
}))

const jobByid = () => {
    const classes = useStyles()
    const router = useRouter();
    const [jobData,setJobData] = useState();
    const [loading,setLoading] = useState(true);
    const [da,setda] = useState();
    //router.query && console.log(router.query)

    useEffect(()=>{
        async function getDataById(){
            const data = await axios.get('https://remotive.io/api/remote-jobs')
            setLoading(false);
            setJobData(data.data.jobs)
        }
        getDataById()

        
       // router.query.id && jobData && setJobData(jobData.filter(a => a.id === router.query.id))
    },[])
    
    jobData && !da && setda(jobData.filter(a => a.id == router.query.id));
    // da && console.log(da[0].title)
    
    
    return <>
    {loading && <h1>Loading .... Wait a moment</h1>}
    {da && <Card classes={{root:classes.card}}>
        <CardContent>
            <Typography>URL : {da[0].url}</Typography>
            <Typography>Title : {da[0].title}</Typography>
            <Typography>Company Name : {da[0].company_name}</Typography>
            <Typography>Category : {da[0].category}</Typography>
            <Typography>Type of Job : {da[0].job_type}</Typography>
            <Typography>PubLication Date : {da[0].publication_date}</Typography>
            <Typography>Loacation : {da[0].candidate_required_location}</Typography>
            <Typography>Salary : {da[0].salary}</Typography>
            <Typography>Description : <p>{da[0].description}</p></Typography>
        </CardContent>
    </Card>}
    </>
}

// export async function getServerSideProps({query}){
//     const json = await axios.get('https://remotive.io/api/remote-jobs')
//     const data = json.data
//     const jobs = data.jobs;
//     const job = jobs.filter(a => a.id===query.id)
  
//     return {
//       props:{job}
//     }
//   }

 export default jobByid 