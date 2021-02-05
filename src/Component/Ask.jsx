import React, { useState, useEffect } from 'react'
import moment from 'moment';
import UserInfo from '../Component/UserInfo.jsx'
import { Route, Switch, Link } from 'react-router-dom';
import './Common.css'
import img from '../Component/Image/grayarrow.gif';

export default function Ask(prop) {

    const [posts, setPosts] = useState([]);
    var value = prop.SearchVal;
    const [dig, setdig] = useState(false);
    const [dat, setdat] = useState({});
    const [val, setVal] = useState("");
    const handleUser = (e) => {
        setVal(e.by);
        setdig(true);
        let unix_timestamp = e.time;
        var date = new moment(unix_timestamp * 1000);
        setdat(date.fromNow());
    }
    useEffect(() => {
        async function getTopStories() {
            const url = "https://hacker-news.firebaseio.com/v0/askstories.json?print=pretty";
            try {
                const response = await fetch(url);
                if (response.ok === false) {
                    throw new Error("Response Error:" + response.text);
                }
                const json = await response.json();
                const promises = json
                    .slice(0, 30)
                    .map(id =>
                        fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
                            response => response.json()
                        )
                    );
                const result = await Promise.all(promises);
                for (let j = 0;j < result.length;j++) {
                    let unix_timestamp = result[j].time;
                    var date = new moment(unix_timestamp * 1000);
                    setdat(date.fromNow());
                }
                setPosts(result);
                let array = [];
                if (value.length !== 0) {
                    for (let i = 0;i < result.length;i++) {
                        let re = result[i].title.toLowerCase()
                        let val = value.toLowerCase()
                        if (re.includes(val)) {
                            let ar = result[i];
                            array.push(ar);

                        }
                    }
                }
                if (array.length !== 0) {
                    setPosts(array)
                }
            } catch (err) {
                console.error(err);
            }
        }
        getTopStories();
    }, []);
    return (
        <>

            {dig === false && <div>
                <table>
                    <tbody>
                        <tr className="athing">
                            {
                                posts.map((post, index) => (
                                    <tr>

                                        <tr>
                                            <td className="title text-center">{index + 1}.&nbsp;</td>
                                            <td className="title ">
                                                <img className="mb-1" src={img} ></img>&nbsp;
                                            {post.title}</td>
                                        </tr>

                                        <tr className="subtext">
                                            <td></td>
                                            <tr>
                                                <td>{post.score} by</td>

                                                <td> <Link onClick={() => handleUser(post)} className="nav-link" style={{ padding: '.2rem .2rem' }}>{post.by}</Link></td>
                                                <td>
                                                    |&nbsp;<span>{dat}</span>&nbsp;|
                                                </td>
                                            </tr>
                                        </tr>
                                    </tr>
                                ))}
                        </tr>
                    </tbody>
                </table >
            </div>}
            <div>
                <Switch>
                    <Route>
                        {dig === true && <UserInfo username={val} time={dat}>
                        </UserInfo>}
                    </Route>
                </Switch>
            </div>
        </>
    )
}
