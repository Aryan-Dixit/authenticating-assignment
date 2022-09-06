    import React, { useEffect, useState } from "react";
    import UserForm from "../components/UserForm";
    import './Dashboard.css';

    const LOWERDECK = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20'];
    const UPPERDECK = ['21','22','23','24','25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40'];
    
    function Dashboard() {
        const [passengerList, setPassengerlist] = useState([]);
        const [seatlist, setSeatlist] = useState([]);
        
        const [form, setForm] = useState(false);
        const [bookingData, setbookingData] = useState({ 
            firstName : "",
            lastName : "",
            email : "",
            seatNo : "",
            date : "" 
        });
        
        useEffect(() => {
            const passengerList = JSON.parse(localStorage.getItem('passengerList'));
            if(passengerList){
                let seatlist = passengerList.map(a => {return a.seatNo})
                setPassengerlist(passengerList);
                setSeatlist(seatlist);
            }
        },[]);

        const reserveSeat = (item) => {

            var todayDate = new Date();
            var dd = String(todayDate.getDate()).padStart(2, '0');
            var mm;
            switch(todayDate.getMonth()) {
                case 0 : mm = "Jan";
                         break;
                case 1 : mm = "Feb";
                         break;
                case 2 : mm = "Mar";
                         break;
                case 3 : mm = "Apr";
                         break;
                case 4 : mm = "May";
                         break;
                case 5 : mm = "Jun";
                         break;
                case 6 : mm = "Jul";
                         break;
                case 7 : mm = "Aug";
                         break;
                case 8 : mm = "Sept";
                         break;
                case 9 : mm = "Oct";
                         break;
                case 10 : mm = "Nov";
                         break;
                case 11 : mm = "Dec";
                         break;
                default :break;
            }
            var yyyy = todayDate.getFullYear();
            todayDate = dd + '/' + mm + '/' + yyyy;
            
            setbookingData({firstName : "", lastName : "", email : "", seatNo : item, date : todayDate});
            setForm(true);
        }

        const onBook = (newBookingData) => {
                var newPassengerList = [...passengerList, newBookingData];
                setPassengerlist(newPassengerList);
                localStorage.setItem('passengerList', JSON.stringify(newPassengerList));
                setSeatlist((prev) => [...prev,bookingData.seatNo]);
                setForm(false);
        }

        const close = () => {
            setForm(false);
        }

        return(
            <div className="dash-container">
                <UserForm
                    open={form}
                    onClose={close}
                    bookingData={bookingData}
                    passengerList={passengerList}
                    bookSeat={(data) => onBook({
                        firstName : data.firstName, 
                        lastName : data.lastName, 
                        email : data.email,
                        seatNo : data.seatNo,
                        date : data.date
                    })}
                />
                <ul className="legend">
                    <li>Reserved  <div className="reserved"/></li>
                    <li>Available <div className="unreserved"/></li>
                </ul>
                <div style={{ display: "flex" }}>
                    <div className="deck">
                        <div>LOWER DECK</div>
                        <div style={{ display : "flex", flexWrap: "wrap" }}>
                        {
                            LOWERDECK.map((item, index) => {
                                    let rowData = [];
                                    if(item % 5 === 0) {
                                        rowData.push(<>
                                        <div className={seatlist.includes(item) ? "reserved" : "unreserved"}
                                        onClick={() => seatlist.includes(item) ? undefined : reserveSeat(item.toString())}
                                        key={item}
                                        >{item}</div>
                                        <div key={[item,item]} className="break"/>
                                        </>)
                                    } else {
                                        rowData.push(
                                        <div className={seatlist.includes(item) ? "reserved" : "unreserved"}
                                        onClick={() => seatlist.includes(item) ? undefined : reserveSeat(item.toString())}
                                        key={item}
                                        >{item}</div>
                                        )
                                    }
                                    if(item === 10) {
                                        rowData.push(<div key={[item,item]} className="break"/>)
                                    }
                                    return rowData;
                            })
                        }
                        </div>
                    </div>
                    <div className="deck">
                        <div>UPPER DECK</div>
                        <div style={{ display : "flex", flexWrap: "wrap" }}>
                        {
                            UPPERDECK.map((item, index) => {
                                    let rowData = [];
                                    if(item % 5 === 0) {
                                        rowData.push(<>
                                        <div 
                                        className={seatlist.includes(item) ? "reserved" : "unreserved"}
                                        onClick={() => seatlist.includes(item) ? undefined : reserveSeat(item.toString())}
                                        key={item}
                                        >{item}</div>
                                        <div key={[item,item]} className="break"/>
                                        </>)
                                    } else {
                                        rowData.push(
                                        <div className={seatlist.includes(item) ? "reserved" : "unreserved"}
                                        onClick={() => seatlist.includes(item) ? undefined : reserveSeat(item.toString())}
                                        key={item}
                                        >{item}</div>
                                        )
                                    }
                                    if(item === 10) {
                                        rowData.push(
                                        <>
                                            <div key={[item,item]} className="break"/>
                                            <hr size="10" width="100%" color="red"/> 
                                        </>
                                        )
                                    }
                                    return rowData;
                            })
                        }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    export default Dashboard;