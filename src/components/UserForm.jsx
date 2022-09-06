import * as React from "react";
import { Button, FormGroup, makeStyles, TextField } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(2),
        '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: '400px',
            }
    },
    submitButton: {
        color: "white",
        background: "#7498fc",
    },  
    cancelButton: {
        color: "white",
        background: "#fc7474",
    },
  }));

export default function UserForm({ open, onClose, passengerList ,bookingData, bookSeat }) {
  const classes = useStyles();
  const [userData, setUserData] = React.useState({
        firstName : bookingData.firstName, 
        lastName : bookingData.lastName, 
        email : bookingData.email,
        seatNo : bookingData.seatNo,
        date : bookingData.date
    });
  const [disable, setDisable] = React.useState(false);

  React.useEffect(() => {
    setUserData({
        firstName : bookingData.firstName, 
        lastName : bookingData.lastName, 
        email : bookingData.email,
        seatNo : bookingData.seatNo,
        date : bookingData.date
    });
  },[bookingData]);

  const setInput = (e) => {
    setDisable(false);
    setUserData(prev => ({...prev, [e.target.name]: e.target.value}));
  }

  const onCancel = () => {
    setUserData({
        firstName : "", 
        lastName : "", 
        email : "",
        seatNo : bookingData.seatNo,
        date : bookingData.date
    });
    onClose();
  }

  const onSubmit = () => {
        var edgeCheck = passengerList.reduce((total,passengerData) => total + (passengerData.email === userData.email), 0);
        if(edgeCheck) {
            alert("Email Already exists");
        } else {
            userData.firstName.length && userData.lastName.length && userData.email.length ? bookSeat({
                firstName : userData.firstName, 
                lastName : userData.lastName, 
                email : userData.email,
                seatNo : bookingData.seatNo,
                date : bookingData.date
            }) : setDisable(true);
            setUserData({
                firstName : "", 
                lastName : "", 
                email : "",
                seatNo : "",
                date : ""
            });
        }
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Please provide the Passenger Details"}</DialogTitle>
        <DialogContent>      
            <div className={classes.root}>
                <TextField name="firstName" value={userData.firstName} onChange={e => setInput(e)} label="First Name" variant="filled" required />
                <TextField name="lastName"  value={userData.lastName} onChange={e => setInput(e)} label="Last Name"  variant="filled" required />
                <TextField name="email"     value={userData.email} onChange={e => setInput(e)} label="Email" variant="filled" type="email" required />
                <TextField label="Seat Number" value={bookingData.seatNo} disabled/>
                <TextField value={bookingData.date} disabled />
            </div>
            {disable && <span style={{ color: "red" }}>Enter All the details Properly</span>}
        </DialogContent>
        <DialogActions>
        <FormGroup row>
           <Button onClick={onCancel}  variant="contained" className={classes.cancelButton}>
                Cancel
           </Button>
           <Button onClick={onSubmit} variant="contained" className={classes.submitButton}>
                Confirm Now !!!
           </Button>
        </FormGroup>
        </DialogActions>
      </Dialog>
    </div>
  );
}