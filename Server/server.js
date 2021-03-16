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


/* POST localhost:3000/register 

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
---------------------------------------------- update_info --------------------------------------*/
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

/* GET localhost:3000/get_image

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
---------------------------------------------- add_name --------------------------------------*/
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

/* GET localhost:3000/get_name

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
    let sql = 'SELECT * FROM friend WHERE Username = ? AND Friend_user = ?'
    connection.query(sql, [username, friend_user], function (err, data, field) {
        if (err) {
            console.log(err)
        }
        if (data.length === 0) {
            let sql = 'INSERT INTO friend (Username, Friend_user, history_acces, position_acces, alert_acces,friend_alert)VALUES (?,?,1,1,1,1)';
            connection.query(sql, [username, friend_user], function (err, result) {
                if (err) {
                    res.status(403);
                } else {
                    console.log("add_friend success")
                    // res.status(200).end();
                }
            })
        }
    })
    connection.query(sql, [friend_user, username], function (err, data, field) {
        if (err) {
            console.log(err)
        }
        if (data.length === 0) {
            let sql = 'INSERT INTO friend (Username, Friend_user, history_acces, position_acces, alert_acces, friend_alert)VALUES (?,?,1,1,1,1)';
            connection.query(sql, [friend_user, username], function (err, result) {
                if (err) {
                    res.status(403);
                } else {
                    console.log("add_friend success")
                    // res.status(200).end();
                }
            })
        }
    })
    sql = 'SELECT * FROM request_friend WHERE Username = ? AND Friend_user = ?'
    connection.query(sql, [username, friend_user], function (err, data, field) {
        if (err) {
            console.log(err)
        }
        if (data.length !== 0) {
            let sql = 'DELETE FROM `request_friend` WHERE Username = ? AND Friend_user = ?';
            connection.query(sql, [username, friend_user], function (err, result) {
                if (err) {
                    res.status(403);
                } else {
                    console.log("DELETE")
                    // res.status(200).end();
                }
            })
        }
    })
    connection.query(sql, [friend_user, username], function (err, data, field) {
        if (err) {
            console.log(err)
        }
        if (data.length !== 0) {
            let sql = 'DELETE FROM `request_friend` WHERE Username = ? AND Friend_user = ?';
            connection.query(sql, [friend_user, username], function (err, result) {
                if (err) {
                    res.status(403);
                } else {
                    console.log("DELETE")
                    // res.status(200).end();
                }
            })
        }
    })

    res.status(200).end();
})

/* GET localhost:3000/friend
req params {
    username
    }
---------------------------------------------- get friend -------------------------------------*/
app.get('/friend', function (req, res) {
    let { username } = req.query;
    console.log(`username ${username}`)
    let sql = 'SELECT friend.Username, profile.Username, profile.name, friend.history_acces, friend.position_acces, friend.alert_acces, friend.friend_alert from friend LEFT JOIN profile ON friend.Friend_user = profile.Username WHERE friend.Username = ?';
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

/* GET localhost:3000/friend_location
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
---------------------------------------------- post_noti -------------------------------------*/
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
    //pleng mobile 'fbfnfJKoR5Ku7Wk3jlNcNW:APA91bGDxQEMtVS6ANSayEgwZwSBMM_JwT5jsjZ8WsSY3TifTK2pCNJ5FbG-QfpJKRhIHLogkQ0IVnkju4ZZGlvUkxozaVfkXQBU4X6zDYjOLZCUut8rYX5_CeLCSc5csY1TrBh-KtNo'
    try {
        admin.messaging().sendMulticast({
            tokens: ['chtiLbqpSAOeG_8AynR3UM:APA91bGw4p7-eDTWMkuk5rsZ0oUReMDwyPaH6PV0H4tZVpIacUzYZyFkfmLcxIMRIGzJLbum-JtOwsgDZ4_AFIPvWkNTJiGTdFBbo5knMO8vnBTCZ4MoWvRbId_M4sJYxE7F2181bWp0'
                , 'cGVlYMkmTsm9ED1A8AkzFi:APA91bFgIfx4ZYEcq-DiUR7bUP-FQ5BFqRpOvmxPizBFM0atxvAPFTYCXvh_WSgS_wKtpLsMB_bsmxnutWsH7raTPVJ5B7pRaJj_0TsqwRZNv-Nq-mCcm8IU1Q3Jq2HsDHIkvTX1AUQJ'
                , 'fbfnfJKoR5Ku7Wk3jlNcNW:APA91bGDxQEMtVS6ANSayEgwZwSBMM_JwT5jsjZ8WsSY3TifTK2pCNJ5FbG-QfpJKRhIHLogkQ0IVnkju4ZZGlvUkxozaVfkXQBU4X6zDYjOLZCUut8rYX5_CeLCSc5csY1TrBh-KtNo'],
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
            // collapseKey: "com.project4d",    
            notification: {
                title: 'Basic Notification',
                body: 'This is a basic notification sent from the server!',
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

/* GET localhost:3000/get_user
req params {
    username
    }
---------------------------------------------- get user -------------------------------------*/
app.get('/get_user', function (req, res) {
    let { username } = req.query;
    console.log(`get_user username ${username}`)
    let sql = 'SELECT Username, image, name FROM profile WHERE Username = ?';
    connection.query(sql, username, function (err, data, field) {
        if (err) {
            console.log(err);
            res.status(403).end();
        }
        if (data.length == 0) {
            console.log('No user')
            res.status(404).end();
        }
        else {
            res.send(data);
        }
    })
})

/* POST localhost:3000/friend_req
req body    {    
    username,
    friend_user,
}
---------------------------------------------- add friend_req -------------------------------------*/
app.post('/friend_req', function (req, res) {
    let { username, friend_user } = req.body;
    console.log(`friend_reg username ${username} friend_user ${friend_user}`)
    let sql = 'SELECT * FROM friend WHERE Username = ? AND Friend_user = ?'
    connection.query(sql, [username, friend_user], function (err, data, result) {
        if (err) {
            console.log(err);
            res.status(403).end();
        }
        if (data.length == 0) {
            let sql = 'SELECT * FROM request_friend WHERE Username = ? AND Friend_user = ?'
            connection.query(sql, [username, friend_user], function (err, data, result) {
                if (err) {
                    console.log(err);
                    res.status(403).end();
                }
                if (data.length == 0) {
                    let sql = 'INSERT INTO request_friend (Username, Friend_user)VALUES (?,?)';
                    connection.query(sql, [username, friend_user], function (err, result) {
                        if (err) {
                            res.status(403);
                        } else {
                            console.log("friend_req success")
                            res.status(200).end();
                        }
                    })
                }
                else {
                    res.status(409).end();
                }
            })
        }
        else {
            res.status(459).end();
        }

    })

})

/* GET localhost:3000/get_friend_req
req params {
    username
    }
---------------------------------------------- get friend_req -------------------------------------*/
app.get('/get_friend_req', function (req, res) {
    let { username } = req.query;
    console.log(`get_friend_req username ${username}`)
    let sql = 'SELECT request_friend.Friend_user, profile.Username, profile.name, profile.image from request_friend LEFT JOIN profile ON request_friend.Username = profile.Username WHERE request_friend.Friend_user = ?';
    connection.query(sql, username, function (err, data, field) {
        if (err) {
            console.log(err);
            res.status(403).end();
        }
        if (data.length == 0) {
            console.log('No user')
            res.status(404).end();
        }
        else {
            res.send(data);
        }
    })
})

/* POST localhost:3000/delete_friend_req
req body    {    
    username,
    friend_user,
}
---------------------------------------------- delete_friend_req -------------------------------------*/
app.post('/delete_friend_req', function (req, res) {
    let { username, friend_user } = req.body;
    console.log(`delete_friend_req username ${username} friend_user ${friend_user}`)
    let sql = 'DELETE FROM `request_friend` WHERE Username = ? and Friend_user = ?';
    connection.query(sql, [username, friend_user], function (err, data, field) {
        if (err) {
            console.log(err);
            res.status(403).end();
        }
        else {
            // res.status(200).end();
        }
    })
    connection.query(sql, [friend_user, username], function (err, data, field) {
        if (err) {
            console.log(err);
            res.status(403).end();
        }
        else {
            // res.status(200).end();
        }
    })
    res.status(200).end();
})

/* POST localhost:3000/update_setting

    bluetooth_name, raspberrypi2
    EAR, 0.285
    distance, 160
    rest, 120
    time_update 30

req body {
    username,
}
---------------------------------------------- update_setting --------------------------------------*/
app.post('/update_setting', function (req, res) {
    let { username } = req.body;
    console.log(`username ${username}`)
    let sql = 'INSERT INTO setting (Username, bluetooth_name, EAR, distance, rest, time_update)VALUES (?,\'raspberrypi\',0.285,160,120,30)';
    connection.query(sql, username, function (err, data, field) {
        if (err) {
            console.log(err);
            res.status(403).end();
        }
        else {
            res.status(200).end();
        }
    });
});




/* POST localhost:3000/set_bluetooth_name
req body {
    username,
    bluetooth_name,
}
---------------------------------------------- set_bluetooth_name --------------------------------------*/
app.post('/set_bluetooth_name', function (req, res) {
    let { username, bluetooth_name } = req.body;
    console.log(`username ${username} bluetooth_name ${bluetooth_name}`)
    let sql = 'UPDATE setting SET bluetooth_name = ? WHERE Username = ?';
    connection.query(sql, [bluetooth_name, username], function (err, data, field) {
        if (err) {
            res.status(403);
        } else {
            res.status(200).end();
        }
    });
});

/* POST localhost:3000/set_EAR
req body {
    username,
    EAR,
}
---------------------------------------------- set_EAR --------------------------------------*/
app.post('/set_EAR', function (req, res) {
    let { username, EAR } = req.body;
    console.log(`username ${username} EAR ${EAR}`)
    let sql = 'UPDATE setting SET EAR = ? WHERE Username = ?';
    connection.query(sql, [EAR, username], function (err, data, field) {
        if (err) {
            res.status(403);
        } else {
            res.status(200).end();
        }
    });
});

/* POST localhost:3000/set_distance
req body {
    username,
    distance,
}
---------------------------------------------- set_distance --------------------------------------*/
app.post('/set_distance', function (req, res) {
    let { username, distance } = req.body;
    console.log(`username ${username} distance ${distance}`)
    let sql = 'UPDATE setting SET distance = ? WHERE Username = ?';
    connection.query(sql, [distance, username], function (err, data, field) {
        if (err) {
            res.status(403);
        } else {
            res.status(200).end();
        }
    });
});

/* POST localhost:3000/set_rest
req body {
    username,
    rest,
}
---------------------------------------------- set_rest --------------------------------------*/
app.post('/set_rest', function (req, res) {
    let { username, rest } = req.body;
    console.log(`username ${username} rest ${rest}`)
    let sql = 'UPDATE setting SET rest = ? WHERE Username = ?';
    connection.query(sql, [rest, username], function (err, data, field) {
        if (err) {
            res.status(403);
        } else {
            res.status(200).end();
        }
    });
});

/* POST localhost:3000/set_time_update
req body {
    username,
    time_update,
}
---------------------------------------------- set_time_update --------------------------------------*/
app.post('/set_time_update', function (req, res) {
    let { username, time_update } = req.body;
    console.log(`username ${username} time_update ${time_update}`)
    let sql = 'UPDATE setting SET time_update = ? WHERE Username = ?';
    connection.query(sql, [time_update, username], function (err, data, field) {
        if (err) {
            res.status(403);
        } else {
            res.status(200).end();
        }
    });
});

/* GET localhost:3000/get_setting
req params {
    username,
}
---------------------------------------------- get_setting --------------------------------------*/
app.get('/get_setting', function (req, res) {
    let { username } = req.query;
    console.log(`username ${username} get_setting'`)
    let sql = 'SELECT * FROM setting WHERE Username = ?';
    connection.query(sql, username, function (err, data, field) {
        if (err) {
            res.status(403);
        }
        if (data.length === 0) {
            console.log("NO User")
            res.status(404).end();
        }
        else {
            res.send(data)
        }
    });
});

/* POST localhost:3000/set_acces
req body {
    username,
    friend_user,
    position_acces,
    history_acces,
    alert_acces,
    friend_alert
}
---------------------------------------------- set_acces --------------------------------------*/
app.post('/set_acces', function (req, res) {
    let { username, friend_user, history_acces, position_acces, alert_acces, friend_alert } = req.body;
    console.log(`username ${username} friend_user ${friend_user} history_acces ${history_acces} position_acces ${position_acces} alert_acces ${alert_acces} friend_alert ${friend_alert}`)
    let sql = 'UPDATE friend SET position_acces = ?, history_acces = ?, alert_acces = ?, friend_alert = ? WHERE Username = ? AND Friend_user = ?';
    connection.query(sql, [position_acces, history_acces, alert_acces, friend_alert, username, friend_user], function (err, data, field) {
        if (err) {
            res.status(403);
        } else {
            res.status(200).end();
        }
    });
});

/* GET localhost:3000/get_acces
req params {
    username,
    friend_user,
}
---------------------------------------------- get_acces --------------------------------------*/
app.get('/get_acces', function (req, res) {
    let { username, friend_user } = req.query;
    console.log(`username ${username} friend_user ${friend_user} `)
    let sql = 'SELECT * FROM friend WHERE Username = ? AND Friend_user = ?';
    connection.query(sql, [username, friend_user], function (err, data, field) {
        if (err) {
            res.status(403);
        }
        if (data.length === 0) {
            console.log("No User")
            res.status(404).end();
        }
        else {
            res.send(data)
        }
    });
});

/* POST localhost:3000/add_history
req body {
    username,
    latitude,
    langtitude
}
---------------------------------------------- add_history --------------------------------------*/
app.post('/add_history', function (req, res) {
    let { username, latitude, langtitude } = req.body;
    console.log(`username ${username} latitude ${latitude} langtitude ${langtitude}`)
    let sql = 'INSERT INTO detection_history (Username, latitude, longtitude) VALUES (?,?,?)';
    connection.query(sql, [username, latitude, langtitude], function (err, data, field) {
        if (err) {
            res.status(403);
        }
        else {
            res.status(200).end()
        }
    });
});

/* GET localhost:3000/get_history
req body {
    username,
}
---------------------------------------------- add_history --------------------------------------*/
app.post('/add_history', function (req, res) {
    let { username, latitude, langtitude } = req.body;
    console.log(`username ${username} latitude ${latitude} langtitude ${langtitude}`)
    let sql = 'SELECT * FROM detection_history WHARE Username = ?';
    connection.query(sql, [username], function (err, data, field) {
        if (err) {
            res.status(403);
        }
        if(data.length === 0){
            console.log("NO USER")
            res.status(404).end()
        }
        else {
            res.send(data)
        }
    });
});

var server = app.listen(3000, function () {
    console.log('Server is running..');
});