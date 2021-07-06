import axios from 'axios'
import Button from '@material-ui/core/Button'
import React,{ useState,useEffect } from 'react';
import { InputBase } from '@material-ui/core';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Link from 'next/link'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {useTheme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
    mixin:{...theme.mixins.toolbar,marginBottom:"2em"},
    root:{
      width:"100%",
    minWidth:"20em",
    minHeight:"5em"
    },
    cards:{
      backgroundColor:"#3EDBF0",
      width:"80%",
      marginLeft:"2em",
      maxHeight:"10em",
      minHeight:"9em",
      [theme.breakpoints.down("sm")]:{
        marginLeft:"0",
        width:"100%",
        maxWidth:"100%"
      },
      [theme.breakpoints.down("lg")]:{
        marginLeft:"0",
        width:"100%",
        maxWidth:"100%"
      }
    },
    gridItems:{
      backgroundColor:"red",
      marginTop:"3em",
      maxWidth:"30em",
      [theme.breakpoints.down("md")]:{
        width:"1em"
      },
      [theme.breakpoints.down("sm")]:{
        width:"100%",
        maxWidth:"100%"
      }
    }}))

export default function Home({data}) {
    const jobs = data.jobs
    const classes = useStyles();
    const theme = useTheme();
    const matchesSM = useMediaQuery(theme.breakpoints.down('sm'))
    const matchesMD = useMediaQuery(theme.breakpoints.down('md'))
    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'))

  const [input,setInput] = useState("");
  const [search,setSearch] = useState("");
  const [jobData,setJobData] = useState([]);
  const [rev,setrev] = useState(false);
  const [loading,setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [CanchorEl, setCAnchorEl] = useState(null);

  async function getDataByCategory(url){
    const data = await axios.get(url)
    const jobData = await data.data;
    setLoading(false)
    setJobData(data.data.jobs)
    debugger
  }


  useEffect(()=>{
    async function data(){
      const searchData = await axios.get(`https://remotive.io/api/remote-jobs?search=${search}`);
      const data = await searchData.data.jobs
      setLoading(false);
      setJobData(data);
    }
      data();
    jobData.sort((a,b)=>(new Date(a.publication_date) - new Date(b.publication_date)))
  },[search])

  const handleReverse = () =>{
    if(!rev){
      setJobData(jobData.sort((a,b)=>(new Date(a.publication_date) - new Date(b.publication_date))));
      setrev(true);
    }else{
      setJobData(jobData.sort((a,b)=>(new Date(b.publication_date) - new Date(a.publication_date))));
      setrev(false);
    }
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    if(e.target.innerText === "Full Time"){
        setJobData(jobs.filter((job)=>job.job_type === "full_time"))
        }
    if(e.target.innerText === "Part Time"){
        setJobData(jobs.filter((job)=>job.job_type === "part_time"))
    }
    if(e.target.innerText === "Contract"){
      setJobData(jobs.filter((job)=>job.job_type === "contract"))
    }
    if(e.target.innerText === "Free Lancing"){
      setJobData(jobs.filter((job)=>job.job_type === "freelance"))
    }
    setAnchorEl(null);
  };

  const handleCategoryClick = (event) => {
    setCAnchorEl(event.currentTarget);
  };

  const categoryOptions = [
    {name:"Software Development",slug:"software-dev"},
    {name:"Customer Service",slug:"customer-support"},
    {name:"Design",slug:"design"},{name:"Marketing",slug:"marketing"},
    {name:"Sales",slug:"sales"},{name:"Product",slug:"product"},
    {name:"Business",slug:"business"},
    {name:"Data",slug:"data"},{name:"DevOps / Sysadmin",slug:"devops"},
    {name:"Finance / Legal",slug:"finance-legal"}, 
    {name:"Human Resources",slug:"Human Resources"},
    {name:"QA",slug:"qa"},{name:"Writing",slug:"writing"},
    {name:"Teaching",slug:"teaching"},
    {name:"Medical / Health",slug:"medical-health"},
    {name:"All others",slug:"all-others"}
  ]

  const handleCategoryClose = async (e,i) => {
    setCAnchorEl(null);
    const slugi = categoryOptions[i].slug;
    await getDataByCategory(`https://remotive.io/api/remote-jobs?category=${slugi}`)                                                                                                                                                              
  };



  return ( 
       <>
       <AppBar>
        <Toolbar>
        `<Button onClick={()=>{setLoading(true); setSearch(input); }}>
          Search
        `</Button>
        <InputBase placeholder="Search JOB" onChange={(e)=>setInput(e.target.value)} inputProps={{ 'aria-label': 'search' }}/>
        <Button style={{marginLeft:"auto"}} onClick={()=>{handleReverse()}}>
          Sort
        </Button>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          Select Job Type
        </Button>
        <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
          <MenuItem onClick={(e) => handleClose(e)}>Full Time</MenuItem>
          <MenuItem onClick={(e) => handleClose(e)}>Part Time</MenuItem>
          <MenuItem onClick={(e) => handleClose(e)}>Contract</MenuItem>
          <MenuItem onClick={(e) => handleClose(e)}>Free Lancing</MenuItem>
        </Menu>
        <Button aria-controls="category-menu" aria-haspopup="true" onClick={handleCategoryClick}>
          Select Category
        </Button>
        <Menu
              id="category-menu"
              anchorEl={CanchorEl}
              keepMounted
              open={Boolean(CanchorEl)}
              onClose={handleCategoryClose}
            >
          {
          categoryOptions.map((cate,i)=>(
            <MenuItem onClick={(e) => {handleCategoryClose(e,i); setLoading(true);}}>{cate.name}</MenuItem>
          ))
          }
        </Menu>
        </Toolbar>
        </AppBar>
        <div className={classes.mixin} />
        
        <Grid container justify="space-between" direction={matchesXS?"column":"row"} className={classes.root}>
        {
        loading &&
          <p>Loading ...</p>
        } 
        {
        jobData && !loading && jobData.length!==0 && jobData.map((job)=>
        <Grid item key = {job.id} md={4} sm={6} xs={12} className={classes.gridItems}>
        <Link href={`/${job.id}`}>
        <Card className={classes.cards}>
            <CardContent>
              <Typography>
                <b>JOB TITLE : </b>{job.title}
              </Typography>
              <Typography>
                <b>Company Name : </b>{job.company_name}
              </Typography>
              <Typography>
                <b>Category : </b>{job.category}
              </Typography>
              <Typography>
                <b>PubLication Date : </b>{job.publication_date}
              </Typography>
            </CardContent>
          </Card></Link>
        </Grid>
        )
        }
        {
        jobData && !loading && jobData.length===0 && jobs.map((job)=>(
        <Grid item key = {job.id} md={4} sm={6} xs={12} className={classes.gridItems}>
        <Link href={`/${job.id}`}>
        <Card className={classes.cards}>
            <CardContent>
              <Typography>
                <b>JOB TITLE : </b>{job.title}
              </Typography>
              <Typography>
                <b>Company Name : </b>{job.company_name}
              </Typography>
              <Typography>
                <b>Category : </b>{job.category}
              </Typography>
            </CardContent>
          </Card></Link>
        </Grid>
        ))
        }
        {
        search !== "" && !loading && jobData && jobData.length ===0 && 
          <p>Invalid Search</p>
        }
        </Grid>
      </>
  )
}


export async function getServerSideProps(){
  const json = await axios.get('https://remotive.io/api/remote-jobs')
  const data = json.data

  return {
    props:{data}
  }
}