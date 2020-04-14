// import React from 'react';
// import BeerPackageCard from "./BeerPackageCard";
// import Swal from 'sweetalert2'
// import CircularProgress from '@material-ui/core/CircularProgress';
// import Swiper from '../common/Swiper'

// class MyDrinks extends React.Component {
//   state = {
//     value: 0,
//     drinks: {sent_beers: null, recv_beers: null},
//     loaded: false
//   }

//   componentDidMount = () =>{
//     fetch('/api/events/' + this.props.event +  '/beers/receive/',{
//       method: "GET",
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': this.props.tokenType + " " + this.props.token
//       }
//     }).then(response => {
//       if(response.status === 401){
//         this.props.logout()
//         return false
//       }
//       return response.json()
//     }).then(response => {
//       if(response){
//         this.setState({drinks: response, loaded: true})
//       }
//     });

//     console.log("here", this.state)
//   };

//   handleChange = (event, newValue) => {
//     this.setState({value: newValue});
//     console.log(this.state.drinks.sent_beers.seen.length > 0 && this.state.drinks.sent_beers.unseen.length > 0)
//   };

//   handleAcceptBeer = (id, index) => {
//     fetch('/api/beers/receive/',{
//       method: "PUT",
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': this.props.tokenType + " " + this.props.token
//       },
//       body: JSON.stringify({"id": id, "seen": true, "sender": this.state.drinks.recv_beers.unseen[index].sender.id, "receiver": this.state.drinks.recv_beers.unseen[index].receiver.id})
//     }).then(response => {
//       if(response.status === 202){
//         const drinks = {...this.state.drinks}
//         drinks.recv_beers.unseen[index].seen = true;
//         Swal.fire({
//           title: 'Drycken togs emot!',
//           text: 'Din kompis fick en pushnotis om detta, så se till att inte vara tomhänt nästa gång ni ses!',
//           type: 'success',
//           showConfirmButton: false,
//           timer: 3000,
//         })
//         this.setState({drinks: drinks})
//       }
//     })
//   }

//   render(){
//     let cards_seen_r = null;
//     let cards_unseen_r = null;
//     let cards_seen_s = null;
//     let cards_unseen_s = null;
//     let len = 0
//     if(this.state.loaded){
//       cards_unseen_r = this.state.drinks.recv_beers.unseen.map((beer, index) => {
//         const name = beer.sender.first_name+" "+beer.sender.last_name;
//         return (
//             <BeerPackageCard key={index} name={name} receiver={true} confirmed={beer.seen} time={beer.created_at} handleAccept={this.handleAcceptBeer} id={beer.id} index={index}/>
//         )
//       });
//       len += this.state.drinks.recv_beers.unseen.length
//       cards_seen_r = this.state.drinks.recv_beers.seen.map((beer, index) => {
//         const name = beer.sender.first_name+" "+beer.sender.last_name;
//         return (
//             <BeerPackageCard key={len + index} name={name} receiver={true} confirmed={beer.seen} time={beer.created_at} handleAccept={this.handleAcceptBeer} id={beer.id} index={index}/>
//         )
//       });
//       len += this.state.drinks.recv_beers.seen.length
//       cards_unseen_s = this.state.drinks.sent_beers.unseen.map((beer, index) => {
//         const name = beer.receiver.first_name+" "+beer.receiver.last_name;
//         return (
//             <BeerPackageCard key={len + index} name={name} receiver={false} confirmed={beer.seen} time={beer.created_at}  />
//         )
//       });
//       len += this.state.drinks.sent_beers.unseen.length
//       cards_seen_s = this.state.drinks.sent_beers.seen.map((beer, index) => {
//         const name = beer.receiver.first_name+" "+beer.receiver.last_name;
//         return (
//             <BeerPackageCard key={len + index} name={name} receiver={false} confirmed={beer.seen} time={beer.created_at} handleAccept={this.handleAcceptBeer} id={beer.id} index={index}/>
//         )
//       });
//     }
//     return (
//       <Swiper>
//         <div key={0} label="Received">
//           {this.state.drinks.recv_beers.seen.length > 0 || this.state.drinks.recv_beers.unseen.length > 0 ?
//             <div>
//               <div>{cards_unseen_r}</div>
//               <div>{cards_seen_r}</div>
//             </div> : <h5 style={{margin: 30}}>Du har inte fått några drycker ännu...</h5> }
//         </div>
//         <div key={1} label="Sent">
//           {this.state.drinks.sent_beers.seen.length > 0 || this.state.drinks.sent_beers.unseen.length > 0 ?
//             <div>
//               <div>{cards_unseen_s}</div>
//               <div>{cards_seen_s}</div>
//             </div> : <h5 style={{margin: 30}}>Du har inte skickat några drycker ännu...</h5> }
//         </div>
//       </Swiper>
//       // :
//       // <div style={{width: "fit-content", margin: "auto"}}>
//       //   <CircularProgress />
//       // </div>

//     );
//   }
// }

// export default MyDrinks;