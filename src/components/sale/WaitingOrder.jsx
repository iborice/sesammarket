import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';


 function BasicCard() {
    return (
      <Card sx={{ minWidth: 55, m:1,backgroundColor:'#efefef'}}>
        <CardContent>
          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
            Word of the Day
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    );
}

export default function PinnedSubheaderList() {
  return (
    <Paper sx={{ height: '100%'}}>
      <List
        sx={{
          width: '100%',
          //height: '100%',
          maxHeight: '89vh',
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          '& ul': { padding: 0 },
          '&::-webkit-scrollbar': {
          width: '0.4em'
          },
          '&::-webkit-scrollbar-track': {
          background: "#f1f1f1",
          },
          '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#50c1e9', borderRadius:'1em'
          },
          '&::-webkit-scrollbar-thumb:hover': {
          background: '#555'
          }
        }}
        subheader={<li />}
      >
        {[0, 1].map((sectionId) => (
          <li key={`section-${sectionId}`}>
            <ul>
              <ListSubheader>{`I'm sticky ${sectionId}`}</ListSubheader>
              {[0, 1, 2,3].map((item) => (
                <BasicCard key={`item-${sectionId}-${item}`}/>
              ))}
            </ul>
          </li>
        ))}
      </List>
    </Paper>
  );
}