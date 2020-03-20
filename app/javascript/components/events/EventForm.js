import React from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const EventForm = (props) => {
    
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [nameError, setNameError] = React.useState();
    
 
    const handleDateChange = date => {
        console.log(date)
        console.log(new Date(date))
        setSelectedDate(date);
    };

    const submitForm = (event) => {
        event.preventDefault()
        const name = document.getElementById("name").value
        if(!name){
            setNameError(true)
            return 
        } else {
            setNameError(false)
        }
        fetch('/api/events/', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: props.token.token_type + " " + props.token.access_token          
            },
            body: JSON.stringify({
                name: name, 
                date: selectedDate
            })
        }).then(response => {
            return response.json()
        }).then(event => (props.close(event)))
        
        
    }

    return (
        <div>
            <form id="event-form" style={{height: "100%"}} >
                <div className="row">
                    <TextField required id="name" name="name" label="Name" variant="outlined" error={nameError} fullWidth autoFocus />
                </div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <div className="row" style={{marginTop:10}}>
                        <KeyboardDatePicker
                            fullWidth
                            margin="normal"
                            id="date-picker-dialog"
                            label="Date picker dialog"
                            format="MM/dd/yyyy"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                            
                    </div>
                    <div className="row">
                        <KeyboardTimePicker
                            fullWidth
                            margin="normal"
                            id="time-picker"
                            label="Time picker"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                            ampm={false}
                        />
                    </div>
                </MuiPickersUtilsProvider>
                <div className="row" style={{position: "absolute", bottom: 0, left: "10%", right: "10%"}}>
                    <Button type="submit" onClick={(event) => submitForm(event)} variant="contained" fullWidth color="primary">Skapa event</Button>
                </div>
            </form>
        </div>
    );
  }

  export default EventForm;