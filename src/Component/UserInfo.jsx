import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/paper';
export default function UserInfo(props) {
    const [uservalue, setuserValue] = useState({})
    const name = props.username;
    const times = JSON.stringify(props.time);
    useEffect(() => {
        fetch("https://hacker-news.firebaseio.com/v0/user/" + name + ".json?print=pretty").then(response => response.json().then(json => {
            setuserValue(json);
        }))
    }, [])
    return (
        <>
            <div className="box-22">
                <section>
                    <h2 style={{ margin: "10px 0px 10px 10px", padding: "0", borderBottom: "3px solid black" }}>User Profile...</h2> </section>
                <Paper elevation={3} style={{ paddingLeft: "40px", minHeight: "40vh" }}>
                    <section style={{ margin: "30px 0px 20px 0px" }}>User:  {uservalue.id}</section>
                    <section style={{ marginBottom: "20px" }}>Created:  {times}</section>
                    <section style={{ marginBottom: "20px" }}>Karma:  {uservalue.karma}</section>
                    <section style={{ marginBottom: "20px" }}>About:  {uservalue.about}</section>
                </Paper>
            </div>
        </>
    )
}
