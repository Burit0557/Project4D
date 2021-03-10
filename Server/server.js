const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const saltRounds = 10;
const admin = require('firebase-admin');


let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// config for your database
// var config = {
//     server: '10.66.4.23',
//     user: 'admin',
//     password: 'nut0640731296',
//     database: 'TestDB',
//     "options": {
//         "encrypt": true,
//         "enableArithAbort": true
//     }
// };

var config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_drowsiness',
}

// var config = {
//     host: '161.246.5.138',
//     user: 'root',
//     password: '',
//     database: 'db_drowsiness',
// }

let connection = mysql.createConnection(config);

// Initialize Firebase
var serviceAccount = require("./project4d-303015-firebase-adminsdk-zf772-20c1b2684e.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


app.get('/', function (req, res) {
    // query to the database and get the records
    connection.query('select * from profile ', function (err, recordset) {
        if (err) console.log(err)

        // send records as a response
        res.send(recordset);

    });

});

/* POST localhost:3000/login 

req body    {    
    username,
    password
}
---------------------------------------------- Login -------------------------------------*/
app.post('/login', function (req, res) {
    let { username, password } = req.body;
    console.log(`username ${username} password ${password}`)
    let sql = 'SELECT * from profile where Username = ?';
    connection.query(sql, username, function (err, data, field) {
        if (err) {
            console.log(err);
        }
        if (data.length == 0) {
            console.log('No user')
            res.status(403).end();
        }
        else {
            bcrypt.compare(password, data[0].Password, function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    if (result) {
                        res.send(data);
                    } else {
                        console.log('wrong password');
                        res.status(403).end();
                    }
                }
            });
        }
    });
})


/* POST localhost:3000/api/register 

req body {
    username,
    password,
    email,
}

---------------------------------------------- Register --------------------------------------*/
app.post('/register', function (req, res) {
    let { username, password, email } = req.body;
    console.log(`username ${username} email ${email} password ${password}`)
    let sql = 'INSERT INTO profile (Username, Password, Email)VALUES (?,?,?)';
    bcrypt.genSalt(saltRounds, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hash) {
            if (err) {
                console.log(err)
            } else {
                connection.query(sql, [username, hash, email], function (err, result) {
                    if (err) {
                        res.status(403);
                    } else {
                        res.status(200).end();
                    }
                })
            }
        });
    });
});


/* POST localhost:3000/update_info

req body {
    username,
    password,
    image,
    name,
}
---------------------------------------------- Add image --------------------------------------*/
app.post('/update_info', function (req, res) {
    let { username, password, image, name } = req.body;
    console.log(`username ${username} password ${password} image ${image} name ${name}`)
    let sql = 'SELECT * from profile where Username = ?';
    connection.query(sql, username, function (err, data, field) {
        if (err) {
            console.log(err);
        }
        if (data.length == 0) {
            console.log('No user')
            res.status(403).end();
        }
        else {
            bcrypt.compare(password, data[0].Password, function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    if (result) {
                        let sql = 'UPDATE profile SET image = ? , name = ? WHERE Username = ?';
                        connection.query(sql, [image, name, username], function (err, data, field) {
                            if (err) {
                                res.status(403);
                            } else {
                                res.status(200).end();
                            }
                        });
                    } else {
                        console.log('wrong password');
                        res.status(403).end();
                    }
                }
            });
        }
    });
});


/* POST localhost:3000/add_image

req body {
    username,
    image,
}
---------------------------------------------- Add image --------------------------------------*/
app.post('/add_image', function (req, res) {
    let { username, image } = req.body;
    console.log(`username ${username} image ${image}`)
    let sql = 'UPDATE profile SET image = ? WHERE Username = ?';
    connection.query(sql, [image, username], function (err, data, field) {
        if (err) {
            res.status(403);
        } else {
            res.status(200).end();
        }
    });
});

/* POST localhost:3000/get_image

req params {
    username
    }
---------------------------------------------- Get image --------------------------------------*/
app.get('/get_image', function (req, res) {
    let { username } = req.query;
    console.log(`username ${username}`)
    let sql = 'SELECT image from profile where Username = ?';
    connection.query(sql, username, function (err, data, field) {
        if (err) {
            console.log(err);
            res.status(403).end();
        }
        if (data.length == 0) {
            console.log('No user')
            res.status(403).end();
        }
        else {
            res.send(data);
        }
    });
});

/* POST localhost:3000/add_name

req body {
    username,
    name,
}
---------------------------------------------- Add image --------------------------------------*/
app.post('/add_name', function (req, res) {
    let { username, name } = req.body;
    console.log(`username ${username} name ${name}`)
    let sql = 'UPDATE profile SET name = ? WHERE Username = ?';
    connection.query(sql, [name, username], function (err, data, field) {
        if (err) {
            res.status(403);
        } else {
            res.status(200).end();
        }
    });
});

/* POST localhost:3000/get_name

req params {
    username
    }
---------------------------------------------- Get name --------------------------------------*/
app.get('/get_name', function (req, res) {
    let { username } = req.query;
    console.log(`username ${username}`)
    let sql = 'SELECT name from profile where Username = ?';
    connection.query(sql, username, function (err, data, field) {
        if (err) {
            console.log(err);
            res.status(403).end();
        }
        if (data.length == 0) {
            console.log('No user')
            res.status(403).end();
        }
        else {
            res.send(data);
        }
    });
});

/* POST localhost:3000/new_password 
req body    {    
    username,
    password,
    new_password
}
---------------------------------------------- new password -------------------------------------*/
app.post('/new_password', function (req, res) {
    let { username, password, new_password } = req.body;
    console.log(`username ${username} password ${password} new_password ${new_password}`)
    let sql = 'SELECT Password from profile where Username = ?';
    connection.query(sql, username, function (err, data, field) {
        if (err) {
            console.log(err);
        }
        if (data.length == 0) {
            console.log('No user')
            res.status(403).end();
        }
        else {
            bcrypt.compare(password, data[0].Password, function (err, result) {
                if (err) {
                    console.log(err);
                }
                else {
                    if (result) {
                        let sql = 'UPDATE profile SET Password = ? WHERE Username = ?';
                        bcrypt.genSalt(saltRounds, function (err, salt) {
                            bcrypt.hash(new_password, salt, function (err, hash) {
                                if (err) {
                                    console.log(err)
                                } else {
                                    connection.query(sql, [hash, username], function (err, result) {
                                        if (err) {
                                            res.status(403);
                                        } else {
                                            res.status(200).end();
                                        }
                                    })
                                }
                            });
                        });
                    } else {
                        console.log('wrong password');
                        res.status(403).end();
                    }
                }
            });
        }
    });
})

/* POST localhost:3000/add_location
req body    {    
    username,
    latitude,
    longitude,
}
---------------------------------------------- add location -------------------------------------*/
app.post('/add_location', function (req, res) {
    let { username, latitude, longitude } = req.body;
    console.log(`username ${username} latitude ${latitude} longitude ${longitude}`)
    let sql = 'INSERT INTO user_location (Username, latitude, longitude)VALUES (?,?,?)';
    let time = Date.now()
    console.log(time)
    connection.query(sql, [username, latitude, longitude], function (err, result) {
        if (err) {
            res.status(403);
        } else {
            res.status(200).end();
        }
    })
})

/* POST localhost:3000/add_friend
req body    {    
    username,
    friend_user,
}
---------------------------------------------- add friend -------------------------------------*/
app.post('/add_friend', function (req, res) {
    let { username, friend_user } = req.body;
    console.log(`username ${username} friend_user ${friend_user}`)
    let sql = 'INSERT INTO friend (Username, Friend_user, history_acces, position_acces, friend_alert)VALUES (?,?,1,1,1)';
    connection.query(sql, [username, friend_user], function (err, result) {
        if (err) {
            res.status(403);
        } else {
            res.status(200).end();
        }
    })
})

/* GET localhost:3000/friend
req params {
    username
    }
---------------------------------------------- get friend -------------------------------------*/
app.get('/friend', function (req, res) {
    let { username } = req.query;
    console.log(`username ${username}`)
    let sql = 'SELECT friend.Username, profile.Username,profile.name, friend.history_acces, friend.position_acces, friend.friend_alert from friend LEFT JOIN profile ON friend.Friend_user = profile.Username WHERE friend.Username = ?';
    connection.query(sql, username, function (err, data, field) {
        if (err) {
            console.log(err);
            res.status(403).end();
        }
        if (data.length == 0) {
            console.log('No user')
            res.status(403).end();
        }
        else {
            res.send(data);
        }
    })
})

/* GET localhost:3000/friend
req params {
    username
    }
---------------------------------------------- get friend location-------------------------------------*/
app.get('/friend_location', function (req, res) {
    let { username } = req.query;
    console.log(`friend_location username ${username}`)
    let sql = 'SELECT * FROM user_location WHERE time IN (SELECT max(time) FROM user_location) and Username=?';
    connection.query(sql, username, function (err, data, field) {
        if (err) {
            console.log(err);
            res.status(403).end();
        }
        if (data.length == 0) {
            console.log('No user')
            res.status(403).end();
        }
        else {
            res.send(data);
        }
    })
})

/* POST localhost:3000/post_noti
req body    {    
    username,
    friend_user,
}
---------------------------------------------- add friend -------------------------------------*/
app.post('/post_noti', function (req, res) {
    let { username, friend_user } = req.body;
    // console.log(`username ${username} friend_user ${friend_user}`)
    // let sql = 'INSERT INTO friend (Username, Friend_user, history_acces, position_acces, friend_alert)VALUES (?,?,1,1,1)';
    // connection.query(sql, [username, friend_user], function (err, result) {
    //     if (err) {
    //         res.status(403);
    //     } else {
    //         res.status(200).end();
    //     }
    // })

    //pleng genny 'chtiLbqpSAOeG_8AynR3UM:APA91bGw4p7-eDTWMkuk5rsZ0oUReMDwyPaH6PV0H4tZVpIacUzYZyFkfmLcxIMRIGzJLbum-JtOwsgDZ4_AFIPvWkNTJiGTdFBbo5knMO8vnBTCZ4MoWvRbId_M4sJYxE7F2181bWp0'
    //mee 'cGVlYMkmTsm9ED1A8AkzFi:APA91bFgIfx4ZYEcq-DiUR7bUP-FQ5BFqRpOvmxPizBFM0atxvAPFTYCXvh_WSgS_wKtpLsMB_bsmxnutWsH7raTPVJ5B7pRaJj_0TsqwRZNv-Nq-mCcm8IU1Q3Jq2HsDHIkvTX1AUQJ'
   //pleng mobile 'dW4d11qOQ0iLDnNDmV75Jw:APA91bFepvqoRWQgomIsKZLFO_qT2NNJjUsFRSrzbrottY6bN0mHTSUgCc_DfdcbJsbXikdwbljJlymU2Ovm1pKHhS4H73aNzwVoBC2_wFRNB21mnCNfyk0KuwvR4UU2bKXqBZ1Q6sd9'
    try {
        admin.messaging().sendMulticast({
            tokens: ['chtiLbqpSAOeG_8AynR3UM:APA91bGw4p7-eDTWMkuk5rsZ0oUReMDwyPaH6PV0H4tZVpIacUzYZyFkfmLcxIMRIGzJLbum-JtOwsgDZ4_AFIPvWkNTJiGTdFBbo5knMO8vnBTCZ4MoWvRbId_M4sJYxE7F2181bWp0'
        ,'cGVlYMkmTsm9ED1A8AkzFi:APA91bFgIfx4ZYEcq-DiUR7bUP-FQ5BFqRpOvmxPizBFM0atxvAPFTYCXvh_WSgS_wKtpLsMB_bsmxnutWsH7raTPVJ5B7pRaJj_0TsqwRZNv-Nq-mCcm8IU1Q3Jq2HsDHIkvTX1AUQJ'
    ,'dW4d11qOQ0iLDnNDmV75Jw:APA91bFepvqoRWQgomIsKZLFO_qT2NNJjUsFRSrzbrottY6bN0mHTSUgCc_DfdcbJsbXikdwbljJlymU2Ovm1pKHhS4H73aNzwVoBC2_wFRNB21mnCNfyk0KuwvR4UU2bKXqBZ1Q6sd9'],
            data: {
                notifee: JSON.stringify({
                    body: 'This message was sent via FCM!',
                    title: 'แจ้งเตื่อนการง่วง',
                    data: { Username: "suhaimee24" },
                    android: {
                        channelId: 'default',
                        actions: [
                            // {
                            //     title: 'Open',
                            //     icon: 'https://my-cdn.com/icons/open-chat.png',
                            //     pressAction: {
                            //         id: 'open-chat',
                            //         launchActivity: 'default',
                            //     },
                            // },
                        ],
                    },
                    collapseKey: "com.project4d",
                }),
            },
        })
            .then(() => {
                console.log("send finish..")
                res.status(200).end()
            })
    }
    catch {
        res.status(403);
    }
})



var server = app.listen(8080, function () {
    console.log('Server is running..');
});