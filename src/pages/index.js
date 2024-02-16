import React,{ useState,useEffect } from 'react'
// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'

const Dashboard = () => {
  const [data, setData] = useState(0); // State variable to store fetched data
  const [distinctIdCount, setDistinctIdCount] = useState(0);
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('https://magnetic-coyote-unified.ngrok-free.app/get_data');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonData = await response.json();
      setData( Object.entries(jsonData.data)); // Update state with fetched data
      const uniqueIds = [...new Set(jsonData.data.map(item => item.id))];
      // Calculating the count of distinct IDs
      const count = uniqueIds.length;
      // Setting the count to state
      setDistinctIdCount(count);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData(); // Call the async function to fetch data when component mounts
}, []);
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy distinctIdCount={distinctIdCount}/>
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
        </Grid>
        <Grid item xs={12}>
          <Table  data={data}/>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <WeeklyOverview />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <TotalEarning />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='12300'
                icon={<Poll />}
                color='success'
                trendNumber='+2%'
                title='Kelganlar'
                subtitle='Oxirgi haftalik '
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='120'
                title='Kelmagan'
                trend='negative'
                color='secondary'
                trendNumber='-2%'
                subtitle='Oxirgi haftalik'
                icon={<CurrencyUsd />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='50'
                trend='negative'
                trendNumber='-3%'
                title='Kech qolgan'
                subtitle='Oxirgi haftalik'
                icon={<BriefcaseVariantOutline />}
              />
            </Grid>
            <Grid item xs={6}>
              <CardStatisticsVerticalComponent
                stats='100'
                color='warning'
                trend='negative'
                trendNumber='-5%'
                subtitle='Oxirgi haftalik'
                title='Qochib ketgan'
                icon={<HelpCircleOutline />}
              />
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12} md={6} lg={4}>
          <SalesByCountries />
        </Grid>
        <Grid item xs={12} md={12} lg={8}>
          <DepositWithdraw />
        </Grid> */}
       
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard
