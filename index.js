const functions = require('firebase/app');
const authentication = require('firebase/auth');
const { getFirestore, collection, doc, setDoc, getDocs, getDoc, Timestamp, serverTimestamp, addDoc } = require('firebase/firestore');
const databaseTime = require('firebase/database');
let express = require('express');
let session = require('express-session');
const { get } = require('express/lib/response');
const { request } = require('express');
const res = require('express/lib/response');
const { getDatabase, set, ref, update } = require('firebase/database');
const { linkWithPopup } = require('firebase/auth');
const bodyParser = require('body-parser');

var curUser;
var indexNum=0;
let curItemID ='';
let currentItem = {
    title : '',
    type: '',
    status: '',
    progress: 0,
    rating: 0,
    recommend: false,
    link: '',
    notes: '',
    dateModified : Timestamp.now()
}

let app = express();

const firebaseConfig = {
    apiKey: "AIzaSyCUCsxLZZs0y70eJCJ9-Ez6JG220CJvhxY",
    authDomain: "listicle-web.firebaseapp.com",
    projectId: "listicle-web",
    storageBucket: "listicle-web.appspot.com",
    messagingSenderId: "720158917337",
    appId: "1:720158917337:web:aa59ef000ebf05c90634c8",
    measurementId: "G-D41RC11RFZ"
  };
  
const fbApp = functions.initializeApp(firebaseConfig);
const auth = authentication.getAuth(fbApp);
const db = getFirestore(fbApp);
var listInDoc = [];

app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/public/views`)

app.use(session({
    secret: 'listicle',
    resave: false,
    saveUninitialized: false,
}));
app.use(express.urlencoded({ extended: false }));

app.get("/", function (request, response) {
    response.render('landingPage');
});

app.get("/home", function (request, response){
    authentication.onAuthStateChanged(auth, user => {
        if(user != null){
            curUser=user;
            listInDoc=[];
            showFirstList(user).then((x) => {
                response.status(200).render('userHome', {listInDoc:listInDoc});
            })
        }
    })
});

app.get("/welcome", function (request, response){
    authentication.onAuthStateChanged(auth, user => {
        if(user != null){
            curUser=user;
            listInDoc=[];
            showFirstList(user).then((x) => {
                response.status(200).render('userHome', {listInDoc:listInDoc});
            })
        }
    })
});

app.get("/login", function (request, response) {
    var errorMessage="";
    response.render('login', {errorMessage:errorMessage});
});

app.get("/logout", function (request, response) {
    authentication.signOut(auth).then(() => {
        response.status(200).redirect('/');
    }).catch((error) => {
        // An error happened.
    });
});

app.get("/addItem", function (request, response) { 
    response.status(200).render('addItem');
});

app.get("/editItem", function (request, response) { 
    response.status(200).render('editItem', {currentItem:currentItem});
});

app.get("/searchItem", function (request, response) {
    response.status(200).render('searchItem', );
});

app.post("/item", function async (request, response) {
    curItemID = '/' + request.body.id;
    response.status(204); //accepted and sending no content
});

app.get('/item', function async (request, response) {  
    getItem(curUser, curItemID).then((x) => {
        response.status(200).render('itemPage', {currentItem : currentItem});
    });
});


app.post('/home', function async (request, response) {
    listInDoc=[];
    authentication.signInWithEmailAndPassword(auth, request.body.email, request.body.password)
    .then((cred) => {
        // Signed in 
        const user = cred.user;
        curUser=user;
        showFirstList(user).then((x) => {
            response.render('userHome', {listInDoc:listInDoc});
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        response.render('login', {errorMessage:errorMessage});
      });
});

app.post('/welcome', function async (request, response) {
    authentication.createUserWithEmailAndPassword(auth, request.body.email, request.body.password)
    .then((cred) => {
        // Signed in 
        const user = cred.user;
        curUser = user;
        listInDoc=[];
        setDoc(doc(db, 'customUser', user.uid),{}).then(
            response.render('userHome', {listInDoc:listInDoc}),
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
        response.render('login', {errorMessage:errorMessage})
      });
    
});

app.post('/creatingItem', function async (request, response) {
    const recStat = (request.body.recommend == 'on');
    const newItem = {
        title : request.body.title,
        type: request.body.type,
        status: request.body.status,
        progress: request.body.progress,
        rating: request.body.rating,
        recommend: recStat,
        link: request.body.link,
        notes: request.body.notes,
        dateModified : Timestamp.now()
    }
    listInDoc.push({title: newItem.title, id:''});
    indexNum++;
    writeNewItem(newItem).then((x) => {
        response.redirect('/home')
    })

});

app.post('/editingItem', function async (request, response) {
    const recStat = (request.body.recommend == 'on');

    currentItem.status = request.body.status,
    currentItem.progress = request.body.progress,
    currentItem.rating =  request.body.rating,
    currentItem.recommend = recStat,
    currentItem.link = request.body.link,
    currentItem.notes = request.body.notes,
    currentItem.dateModified = Timestamp.now()

    editCurrentItem().then((x) => {
        response.redirect('/item')
    })

});

// 404 page not found
app.use((request, response, next) => {
    response.status(404).render('404');
    return next();
})

app.set('port', process.env.PORT || 8080);
app.listen(app.get('port'), function () {
    console.log(`Checking Nodejs Server is up and listing to port ${app.get('port')}`);
});

async function showFirstList(user) {
    const querySnapshot = await getDocs(collection(db, 'customUser/' + user.uid + '/list'));
    querySnapshot.forEach((docc) => {
        indexNum++;
        var title = docc.data().title;
        var docID = docc.id;
        listInDoc.push({title: title, id: docID});
    });
}

async function getItem(user, itemID) {
    const docRef = doc(db, 'customUser/' + user.uid + '/list', itemID);
    const docSnapshot = await getDoc(docRef);

    if(docSnapshot.exists()){
        currentItem=docSnapshot.data();
    }
}

async function writeNewItem(newItem) {
    var docID = await setDoc(doc(db, 'customUser/' + curUser.uid + '/list', "item"+(listInDoc.length)), newItem);
    listInDoc[listInDoc.length-1].id = docID;
}

async function editCurrentItem() {
    await setDoc(doc(db, 'customUser/' + curUser.uid + '/list', curItemID), currentItem);
}