import axios from 'axios';
import { formatPrice } from 'src/utils/format-number';
import { Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material';
import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';


export default function AppView() {
  const [statistics, setStatistics] = useState({
    totalRevenue: 0,
    totalItemsSold: 0,
    totalUsers: 0,
  });
  const [topSell, setTopSell] = useState([]);
  
  const getStatistics = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/v1/statistic/');
      return response.data;
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw error;
    }
  };

  const getTopSell = async () => {
      try {
          const response = await axios.get('http://localhost:5000/api/v1/product/?order[]=totalSales&order[]=DESC&limit=10');
          return response.data;
      } catch (error) {
          console.error('Error fetching weekly sales data', error);
          throw error;
      }
  };


  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const data = await getStatistics();
        if (data.code === 0) {
          setStatistics(data.data);
        } else {
          console.error('Error fetching statistics:', data.message);
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
    const fetchTopSell= async () => {
      try {
        const data = await getTopSell();
        console.log(data);
        setTopSell(data.data.rows);
      } catch (error) {
        console.error('Error fetching top selling:', error);
        setTopSell([])
      }
    };

    fetchTopSell();
  }, []);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Revenue"
            total={formatPrice(statistics.totalRevenue)}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Users"
            total={statistics.totalUsers}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Items Sold"
            total={statistics.totalItemsSold}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Bug Reports"
            total={234} // Đây là dữ liệu tĩnh vì không liên quan đến API
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>
        <Grid xs={12} sm={6} lg={12}>
        <Box sx={{ width: '100%', bgcolor: 'background.paper', p: 2 }}>
            <Typography variant="h6" gutterBottom>
                Top Sản Phẩm Bán Chạy Trong Tuần
            </Typography>
            <List>
                {topSell.map((product) => (
                    <div key={product.id}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar alt={product.name} src={product.image} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={product.name}
                                secondary={`Total Sold: ${product.totalSales}, Price: ${formatPrice(product.price)}`}
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </div>
                ))}
            </List>
        </Box>
        </Grid>
        <Grid xs={12} md={6} lg={8}>
          <AppWebsiteVisits
            title="Website Visits"
            subheader="(+43%) than last year"
            chart={{
              labels: [
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ],
              series: [
                {
                  name: 'Team A',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                },
                {
                  name: 'Team B',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                },
                {
                  name: 'Team C',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Current Visits"
            chart={{
              series: [
                { label: 'America', value: 4344 },
                { label: 'Asia', value: 5435 },
                { label: 'Europe', value: 1443 },
                { label: 'Africa', value: 4443 },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
