// import React from "react"
// import CircularProgress from '@material-ui/core/CircularProgress';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
// import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
// import AddDialog from "../dialogComponents/AddDialog"
// import { Button } from "@material-ui/core";
// import  { Link } from 'react-router-dom'
// // import {subscribeUser} from "../../subscription"
// import Swal from 'sweetalert2'



// class Leaderboard extends React.Component {

//     state = {
//         users: [],
//         loaded: false,
//         openDialog: false,
//         thText: "Namn",
//         navAccess: null,
//         activePerson: null
//     }

//     componentDidMount = () => {
//         // const token = {accessToken: this.props.token, tokenType: this.props.tokenType}
//         // subscribeUser(token, this.props.group);
//         fetch("/v1/users?event_id=" + this.props.state.event.id,
//         {
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json',
//                 ...this.props.state.auth
//             }
//         }).then(response => {
//           if(response.status === 401){
//             this.props.logout()
//             return false
//         }
//           return response.json()
//         }).then(response => {
//           if(response){
//             this.setState({users: response.participants, activeUser: this.props.state.user, loaded: true});
//             console.log("AFTERAFTER")
//             setTimeout(() => (this.setDummyData()), 500)
//           }
//         })
//         .catch(error => {
//           console.log("CATCH");
//           setTimeout(() => (this.setDummyData()), 500)
//         });

//     }

//     dialogCloseHandler = (index) => {
//       if(index !== undefined){
//         fetch("/api/events/" + this.props.event + "/beers/send/" + this.state.users[index].id + "/?format=json", 
//         {
//           method: "POST",
//           headers : { 
//             'Content-Type': 'application/json',
//             'Accept': 'application/json',
//             'Authorization': this.props.tokenType + " " + this.props.token
//           }
//         }
//       ).then(response => {
//         if(response.status === 403){
//           return false;
//         } 
//         return response.json();
//       })
//       .then(response => {
//         if(response){
//           Swal.fire({
//             title: 'Din dryck skickades!',
//             text: 'Se till att den jäveln tar den också...',
//             type: 'success',
//             showConfirmButton: false,
//             timer: 3000,
//           })
//           const users = [...this.state.users]
//           users[index].beers_received.push(response)
//           let u = this.state.activeUser
//           u.credits--;
//           this.setState({users: users, openDialog: false, activeUser: u})
//         } else {
//           Swal.fire({
//             title: 'Du behöver fler credits!',
//             text: 'Svara på frågor för att få mer credits!',
//             type: 'info',
//             showConfirmButton: false,
//             timer: 3000,
//           })
//           this.setState({openDialog: false})
//         }
//       })
//       .catch(error => {
//         console.log(error);
//       })
//       this.props.updateUser(this.props.event, this.props.admin)
//     } else {
//       this.setState({openDialog: false})
//     }
//   }

  

//     setDialogOpen = (person, index) => {
//       this.setState({openDialog: true, activePerson: {person: person, index: index}})
//     }

//     setDummyData = () => {
//       console.log("Dummy data set");
//       this.setState({users: dummyData, thText: "(Dummy Data)", loaded: true}) 
//     }

//     render(){
//         const img = <img src={this.props.state.user.image} style={{width:50, height: 50}} className="rounded-circle" alt="profile_img" />
//         const scores = this.state.users ? this.state.users.map((person, index) => {
//             let seen = 0; 
//             let unseen = 0;
//             if(person.beers_received){
//               for(let i = 0; i < person.beers_received.length; i++){
//                 (person.beers_received[i].seen ? seen++ : unseen++)
//               }
//             }
//             return(
//               <TableRow key={index} onClick={() => this.setDialogOpen(person, index)} className="do-transition erland-table-row">
//                 <TableCell component="th" scope="row" colSpan={this.props.state.user.id !== person.id ? 2 : 1}>
//                   {this.props.state.user.id === person.id ? img: person.name}
//                 </TableCell>
//                   {this.props.state.user.id === person.id ?
//                   <TableCell style={{fontWeight: 'bold'}} component="th" scope="row">
//                     {this.state.activeUser.credits}<AttachMoneyIcon />  
//                   </TableCell> : null }
//                 <TableCell align="right">{unseen}</TableCell>
//                 <TableCell align="right">{seen}</TableCell>

//               </TableRow>
//             );
//           }) : null;

//         return(
//           <div>
//             <Paper  style={{maxWidth: 500, margin: "0 auto 0 auto"}}>
//               <Link style={{color:"white"}} to="/my-drinks" >
//                 <Button className="no-outline" fullWidth disableElevation size="medium" variant="contained" color="primary" >
//                   Mina drycker
//                 </Button>
//               </Link>
//                 <Table aria-label="simple table">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell><strong>{this.state.thText}</strong></TableCell>
//                       <TableCell></TableCell>
//                       <TableCell align="right"><img src="static/got_beer.png" style={{height:40}} alt="recv_beer" /></TableCell>
//                       <TableCell align="right"><img src="static/drank_beer.png" style={{height:40}} alt="drank_beer" /></TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {scores}
//                   </TableBody>
//                 </Table>
//             </Paper>
//             <AddDialog onClose={this.dialogCloseHandler} user={this.state.activePerson} open={this.state.openDialog}/>
//           </div>
//         );
//     }
// }

// const dummyData = [
//   {
//     id:0,
//     beers: 0,
//     user: {
//       name: "Henrik Hildebrand"
//     }
//   },
//   {
//       id:1,
//     beers: 0,
//     user: {
//       name: "Magnus Brattlöf"
//     }
//   }
// ]



// import { connect } from "react-redux";
// import { update } from "../actions/stateActions"

// const mapStateToProps = (state) => {
//     return { ...state }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         updateUser: (currentUser) => { dispatch(update.user(currentUser)) },
//         updateState: (state) => {
//             console.log("[App.js] dispatch")
//             dispatch(update.state(state))
//         }
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);