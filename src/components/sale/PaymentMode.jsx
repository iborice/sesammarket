import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import { NumericFormat } from 'react-number-format';
import {
  Grid,
  Avatar,
  MenuItem,
  InputLabel,
  InputAdornment,
  Input,
  TextField,
  FormControl,
  Button,
  Box,
  Typography,
  Paper,
  Tab
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import {  setAmount } from '../../slices/saleSlice';
import { IMaskInput } from 'react-imask';
import { image_path } from '../../constants';

const TextMaskCustom = React.forwardRef(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask="(237)000-00-00-00"
      definitions={{
        '#': /[1-9]/,
      }}
      inputRef={ref}
      onAccept={(value) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});
TextMaskCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pl: 3,pr:3,pt:2 }}>
            {children}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const NumericFormatCustom = React.forwardRef(
  function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
      <NumericFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator=","
        valueIsNumericString
        //suffix="XAF"
      />
    );
  },
);

NumericFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function MomoPayForm(Props){

  const onSubmit = (values1) => {
    console.log(values1)
  }

  const handleChange = (event) => {
    Props.handleChange1(event)
  };

  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
      <Grid item container spacing={1} justify="center">
          <Grid item xs={12} sm={6} md={6} lg={4.5}>
            <FormControl variant="standard">
              <InputLabel htmlFor="formatted-text-mask-input">Telephone</InputLabel>
              <Input
                value={Props.values}
                onChange={handleChange}
                name="textmask"
                id="formatted-text-mask-input"
                inputComponent={TextMaskCustom}
                size="small"
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <TextField
                label="Amount"
                value={Props.values}
                onChange={handleChange}
                name="momo_amount"
                id="formatted-numberformat-input-momo"
                InputProps={{
                  inputComponent: NumericFormatCustom,
                  endAdornment: <InputAdornment position="end">XAF</InputAdornment>,
                }}
                variant="standard"
                size="small"
              />
          </Grid>
          <Grid item xs={12} sm={6} md={12} lg={3.5}>
              <Button fullWidth variant="contained" sx={{bgcolor:"#50c1e9"}}>Appliquer</Button>
          </Grid>
      </Grid>       
    </Box>
  )
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [values, setValues] = React.useState({
    textmask: '(237) 000-0000',
    numberformat: '0',
  });
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };



  const handleChange1 = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    //dispatch(setAmount({value: event.target.value}))
    //console.log("h1", event.target.value)
  };

  const onSubmit1 = (event) => {
    event.preventDefault();
    //console.log(values.cash_amount)
    dispatch(setAmount({value: values.cash_amount, mode:"CASH"}))
  }
  const onSubmit = (event) => {
    event.preventDefault();
    //console.log("test")
    dispatch(setAmount({value: values.amount}))
  }


  return (
    <Box sx={{ width: '100%', backgroundColor:"#fff"}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons
        aria-label="visible arrows tabs example"
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            '&.Mui-disabled': { opacity: 0.3 },
          },
        }}
      >
        <Tab icon={<Avatar variant="square" sx={{ width: 60, height: 45 }} alt="CASH" src={image_path+'/CASH.png'} />} {...a11yProps(0)} />
        <Tab icon={<Avatar variant="square" sx={{ width: 60, height: 45 }} alt="OM" src={image_path+"/OM.png"} />} {...a11yProps(1)}/>
        <Tab icon={<Avatar variant="square" sx={{ width: 60, height: 45 }} alt="MOMO" src={image_path+"/MOMO.png"} />}  {...a11yProps(2)} />
        <Tab icon={<Avatar variant="square" sx={{ width: 60, height: 45 }} alt="VM" src={image_path+"/VM.png"} />}  {...a11yProps(3)} />
      </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box component="form" onSubmit={onSubmit1} noValidate>
          <Grid item container spacing={1} justify="center">
              <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                label="Amount"
                value={values.numberformat}
                onChange={handleChange1}
                name="cash_amount"
                id="formatted-numberformat-input-cash"
                InputProps={{
                  inputComponent: NumericFormatCustom,
                  endAdornment: <InputAdornment position="end">XAF</InputAdornment>,
                }}
                variant="standard"
                size="small"
              />
              </Grid>
              <Grid item xs={12} sm={6} md={12} lg={6}>
                  <Button type="submit" fullWidth variant="contained" sx={{bgcolor:"#50c1e9"}}>Appliquer</Button>
              </Grid>
          </Grid>       
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <MomoPayForm handleChange1={handleChange1} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <MomoPayForm handleChange1={handleChange1}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Box component="form" onSubmit={onSubmit} noValidate>
          <Grid item container spacing={1} justify="center">
              <Grid item xs={12} sm={6} md={6} lg={6}>
                  <TextField
                      label="Amount"
                      variant="standard"
                      fullWidth
                      name="amount"
                      size='small'
                      id="formatted-numberformat-input-visa"
                      InputProps={{
                        inputComponent: NumericFormatCustom,
                        endAdornment: <InputAdornment position="end">XAF</InputAdornment>,
                      }}
                  />
              </Grid>
              <Grid item xs={12} sm={6} md={12} lg={6}>
                  <Button fullWidth variant="contained" sx={{bgcolor:"#50c1e9"}}>Appliquer</Button>
              </Grid>
          </Grid>       
        </Box>
      </CustomTabPanel>
    </Box>
  );
}