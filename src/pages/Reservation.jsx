import React, { useEffect, useState } from "react";
import UserForm from "../components/UserForm";
import "antd/dist/antd.css";
import {Table, Modal} from 'antd';
import {EditOutlined, DeleteOutlined} from '@ant-design/icons';

function Reservation() {
    const [form, setForm] = useState(false);
    const [passengerData, setPassengerData] = useState({ 
        firstName : "",
        lastName : "",
        email : "",
        seatNo : "",
        date : "" 
    });
    const [rows, setRows] = useState([]);
    const [passengerList, setPassengerlist] = useState([]);
    const columns = [
        {
            key: '1',
            title: 'First Name',
            dataIndex: 'firstName'
        },
        {
            key: '2',
            title: 'Last Name',
            dataIndex: 'lastName'
        },
        {
            key: '3',
            title: 'Email',
            dataIndex: 'email'
        },
        {
            key: '4',
            title: 'Seat No',
            dataIndex: 'seatNo'
        },
        {
            key: '5',
            title: 'Date',
            dataIndex: 'date'
        },
        {
            key: '6',
            title: 'Actions',
            render: (record) => {
                return (
                    <>
                     <EditOutlined
                     onClick={() => {editPassengerList(record)}}
                     />
                     <DeleteOutlined
                     onClick={() => {onDeleteBooking(record)}} 
                     style={{ color : 'red', marginLeft : 12 }}/>
                    </>
                )
            }
        },
    ];
    useEffect(() => {
        const passengerList = JSON.parse(localStorage.getItem('passengerList'));
        if(passengerList){
            setPassengerlist(passengerList);
            setRows(passengerList);
        }
    },[]);

    const editPassengerList = (data) => {
        setPassengerData({
         firstName : data.firstName,
         lastName : data.lastName,
         email : data.email,
         seatNo : data.seatNo,
         date : data.date   
        });
        setForm(true);
    }

    const onDeleteBooking = (data) => {
        Modal.confirm({
            title: "Are you sure you want to Delete this record!",
            okText: "Yes",
            okType: "danger",
            onOk: () => {
            var newPL = passengerList.filter(booking => booking.seatNo !== data.seatNo);
            setPassengerlist(newPL);
            setRows(prev => {return prev.filter(booking => booking.seatNo !== data.seatNo)});
            localStorage.setItem('passengerList', JSON.stringify(newPL));
            }
        })
    }

    const onBook = (newPassengerData) => {
        var newPL = passengerList.filter(booking => booking.seatNo !== newPassengerData.seatNo);
        newPL = [...newPL, newPassengerData];
        setPassengerlist(newPL);
        setRows(prev => {return prev.filter(booking => booking.seatNo !== newPassengerData.seatNo)});        
        setRows((prev) => [...prev,newPassengerData]);
        localStorage.setItem('passengerList', JSON.stringify(newPL));
        setForm(false);
    }

    const close = () => {
        setForm(false);
    }

    return(
        <div style={{ marginLeft : "250px"}}>
            <UserForm
                open={form}
                onClose={close}
                bookingData={passengerData}
                passengerList={passengerList}
                bookSeat={(data) => onBook({
                    firstName : data.firstName, 
                    lastName : data.lastName, 
                    email : data.email,
                    seatNo : data.seatNo,
                    date : data.date
                })}
            />
            <Table
            columns={columns}
            dataSource={rows}
            ></Table>
        </div>
    )
}

export default Reservation;