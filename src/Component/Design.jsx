import React, { useState } from 'react'
import Job from '../Component/Job.jsx'
import Top from '../Component/Top.js'
import Show from '../Component/Show.js'
import Ask from '../Component/Ask.jsx'
import {
    FormControlLabel,
    FormControl,
    FormLabel,
    Radio,
    RadioGroup,
    List
} from "@material-ui/core";
import './Common.css'

export default function Design() {

    const [fromData, setfromData] = useState({
        platform: 'top'
    })


    const handleChange = e => {
        const { name, value } = e.target;
        setfromData({
            [name]: value
        });

    };
    const [searchVal, setsearchVal] = useState("");
    const handleInputChange = (event) => {
        var f = event.target.value;
        setsearchVal(f)

    }

    const Favs = () => {
        if (fromData.platform === "Jobs") {
            return (<Job SearchVal={searchVal}></Job>);
        }
        if (fromData.platform === "Show") {
            return (<Show SearchVal={searchVal}></Show>);
        }
        if (fromData.platform === "Ask") {
            return (<Ask SearchVal={searchVal}></Ask>);
        }
        else {

            return (
                <Top SearchVal={searchVal} />
            )
        }
    };
    return (

        <>


            <div className="box-1" >HackerNews LIVE</div>
            <div className="box-2">
                <div style={{ display: "flex" }}>
                    <section
                        style={{
                            position: "relative",
                            left: "2%",
                            top: "6%",
                            width: "50%",
                            height: "8%",
                        }}>
                        <input
                            style={{
                                width: '100%',
                                fontSize: '16px',
                                border: '2px solid #ccc',
                                padding: '5px 5px'
                            }}
                            className="mt-3"
                            type="text"
                            placeholder="Search By Title,User....."
                            onChange={handleInputChange}
                            value={searchVal}
                        ></input>
                    </section>
                    <section style={{ position: "relative", left: "6%", top: "5%" }}>
                        <FormControl>
                            <FormLabel>
                                <RadioGroup
                                    row
                                    aria-label="position"
                                    name="position"
                                    defaultValue="Top"
                                    className="mt-3"
                                >
                                    <FormControlLabel
                                        name="platform"
                                        onChange={handleChange}
                                        value="Top"
                                        control={<Radio color="primary" />}
                                        label="Top"
                                        labelPlacement="End"
                                    ></FormControlLabel>
                                    <FormControlLabel
                                        name="platform"
                                        onChange={handleChange}
                                        value="Ask"
                                        control={<Radio color="primary" />}
                                        label="Ask"
                                        labelPlacement="End"
                                    ></FormControlLabel>
                                    <FormControlLabel
                                        name="platform"
                                        onChange={handleChange}
                                        value="Show"
                                        control={<Radio color="primary" />}
                                        label="Show"
                                        labelPlacement="End"
                                    ></FormControlLabel>
                                    <FormControlLabel
                                        name="platform"
                                        onChange={handleChange}
                                        value="Jobs"
                                        control={<Radio color="primary" />}
                                        label="Jobs"
                                        labelPlacement="End"
                                    ></FormControlLabel>
                                </RadioGroup>
                            </FormLabel>
                        </FormControl>
                    </section>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 mt-3 ml-1">
                            <Favs></Favs>
                        </div>
                    </div>
                </div>
                <List />
            </div>
        </>
    )
}
