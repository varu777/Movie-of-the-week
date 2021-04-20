(this.webpackJsonpmovie=this.webpackJsonpmovie||[]).push([[0],{37:function(e,t,a){},57:function(e,t,a){},75:function(e,t,a){},76:function(e,t,a){},84:function(e,t,a){},85:function(e,t,a){},89:function(e,t,a){"use strict";a.r(t);var n=a(1),s=a(0),o=a.n(s),i=a(21),r=a.n(i),c=(a(57),a(9)),l=a(10),d=a(12),u=a(11),h=(a(37),a(7)),j=a.n(h),p=a(6),b=(a(75),function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(e=t.call.apply(t,[this].concat(s))).state={movieSuggestion:"",movieNote:"",loggedIn:!1},e.submitSuggestion=function(){if(0!==e.state.movieSuggestion.length){var t=e.state.movieSuggestion;j()({method:"post",url:"https://movieotw.herokuapp.com/SuggestMovie",data:{movie:t,movieNote:e.state.movieNote},withCredentials:!0}).then((function(t){t.data.success?(e.setState({movieSuggestion:"",movieNote:""}),window.alert("Successfully added "+t.data.val+".\nMovie ID: "+t.data.movieIdx)):window.alert(t.data.val)})).catch((function(e){console.log(e)}))}else window.alert("Movie name cannot be empty.")},e.updateMovie=function(t){e.setState({movieSuggestion:t.target.value})},e.updateUser=function(t){e.setState({user:t.target.value})},e.updateNote=function(t){e.setState({movieNote:t.target.value})},e.showReviewForm=function(){window.alert("clicked")},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){this.setState({loggedIn:this.context})}},{key:"render",value:function(){return Object(n.jsxs)("div",{children:[Object(n.jsx)("h1",{children:" Suggest a Movie "}),Object(n.jsx)("label",{children:" Title: "}),Object(n.jsx)("input",{value:this.state.movieSuggestion,onChange:this.updateMovie}),Object(n.jsx)("br",{}),"true"==localStorage.getItem("loggedIn")?Object(n.jsx)(n.Fragment,{}):Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("label",{children:" Suggested By: "}),Object(n.jsxs)("select",{name:"Name",defaultValue:"Choose here",onChange:this.updateUser,children:[Object(n.jsx)("option",{value:"Choose here",disabled:!0,hidden:!0,children:"Choose here"}),Object(n.jsx)("option",{value:"Felix",children:"Felix"}),Object(n.jsx)("option",{value:"Hector",children:"Hector"}),Object(n.jsx)("option",{value:"Jason",children:"Jason"}),Object(n.jsx)("option",{value:"Jesse",children:"Jesse"}),Object(n.jsx)("option",{value:"Jorge",children:"Jorge"}),Object(n.jsx)("option",{value:"Juan",children:"Juan"}),Object(n.jsx)("option",{value:"Octavio",children:"Octavio"})]}),Object(n.jsx)("br",{})]}),Object(n.jsx)("label",{children:" Teaser Note (optional): "}),Object(n.jsx)("textarea",{value:this.state.movieNote,onChange:this.updateNote}),Object(n.jsx)("br",{}),Object(n.jsx)("button",{onClick:this.submitSuggestion,children:" Suggest "})]})}}]),a}(o.a.Component)),m=(a(76),function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(e=t.call.apply(t,[this].concat(s))).state={displayReviewForm:!1,reviewSubmitted:!1,reviewScoreInput:-1,finalReviewScore:-1,user:""},e.displayReviewForm=function(){e.setState({displayReviewForm:!0})},e.cancelReview=function(){e.setState({displayReviewForm:!1})},e.updateReviewScore=function(t){e.setState({reviewScore:t.target.value})},e.updateUser=function(t){e.setState({user:t.target.value})},e.submitReview=function(){try{var t=parseFloat(e.state.reviewScore);window.alert(t)}catch(a){return void window.alert("Error")}e.setState({reviewSubmitted:!0})},e}return Object(l.a)(a,[{key:"render",value:function(){return Object(n.jsxs)("div",{className:"container",children:[Object(n.jsxs)("p",{children:[" Movie title: ",this.props.movieTitle," "]}),Object(n.jsxs)("p",{children:[" Suggested by: ",this.props.addedBy," "]}),Object(n.jsxs)("p",{children:[" Watched on: ",this.props.dateWatched," "]}),Object(n.jsxs)("p",{children:[" Teaser Note: ",this.props.teaser," "]})]})}}]),a}(o.a.Component)),g=a(93),w=a(95),O=a(94),v=a(92),x=a(33),f=a(36),y=o.a.createContext(!1),S=o.a.createContext(!0),C=function(e){var t=e.children,a=Object(s.useContext)(y),o=Object(s.useState)(a),i=Object(f.a)(o,2),r=i[0],c=i[1],l=Object(s.useState)(!0),d=Object(f.a)(l,2),u=d[0],h=d[1],p=function(){return j()({method:"get",url:"https://movieotw.herokuapp.com/isLoggedIn",withCredentials:!0}).then((function(e){console.log(e),console.log("hi"),console.log(e.data),e.data.isLoggedIn?c(!0):c(!1),h(!1)})).catch((function(e){window.alert("Unable to load home data: "+e),c(!1),h(!1)}))};return Object(s.useEffect)((function(){p()}),[]),u?Object(n.jsx)(P,{loading:!0}):Object(n.jsx)(S.Provider,{value:p,children:Object(n.jsx)(y.Provider,{value:r,children:t})})},M=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(e=t.call.apply(t,[this].concat(s))).state={loggedIn:e.context},e.logout=function(){j()({method:"get",url:"https://movieotw.herokuapp.com/logout",withCredentials:!0,loggedIn:e.context}).then((function(t){t.data.success?(e.setState({loggedIn:!1}),localStorage.setItem("loggedIn",!1),window.location.reload()):window.alert("Unable to logout, please try again.")})).catch((function(e){window.alert("Unable to logout: "+e)}))},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){this.setState({loggedIn:this.context})}},{key:"render",value:function(){return Object(n.jsxs)(g.a,{bg:"dark",expand:"lg",children:[Object(n.jsx)(g.a.Brand,{style:{color:"salmon"},href:"/",children:"Movie Of The Week"}),Object(n.jsx)(g.a.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(n.jsxs)(g.a.Collapse,{id:"basic-navbar-nav",children:[Object(n.jsxs)(w.a,{className:"mr-auto",children:[Object(n.jsx)(w.a.Link,{style:{color:"white"},href:"#home",children:"Leaderboard"}),Object(n.jsx)(w.a.Link,{style:{color:"white"},href:"#suggestions",children:"Suggestions"})]}),Object(n.jsx)(O.a,{inline:!0,children:null!=this.props.loading||this.state.loggedIn?Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(x.LinkContainer,{style:{marginRight:"5px"},to:"/profile",children:Object(n.jsx)(v.a,{color:"blue",variant:"secondary",children:"Profile"})}),Object(n.jsx)(v.a,{onClick:this.logout,color:"blue",variant:"secondary",children:"Logout"})]}):Object(n.jsx)(x.LinkContainer,{to:"/login",children:Object(n.jsx)(v.a,{color:"green",variant:"secondary",children:"Login"})})})]})]})}}]),a}(o.a.Component);M.contextType=y;var P=Object(p.o)(M),N=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(e=t.call.apply(t,[this].concat(s))).state={isMovieSelected:!1,movieOTW:"",userOTW:"",noteOTW:"",previousMovies:[],currentPool:[],upcomingMovies:[],isLoading:!0,loggedIn:!1},e.updateWatchedSort=function(t){var a=t.target.value;j()({method:"post",url:"https://movieotw.herokuapp.com/SortWatched",data:{sortBy:a},withCredentials:!0}).then((function(t){e.setState({previousMovies:t.data.movies})})).catch((function(e){window.alert("Unable to apply filter: "+e)}))},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this;j()({method:"get",url:"https://movieotw.herokuapp.com/HomeData",withCredentials:!0}).then((function(t){var a=t.data.movieOTW,n=0!==a.watchOTW.length,s=t.data.watchedMovies;e.setState({previousMovies:s,isMovieSelected:n,movieOTW:a.watchOTW,userOTW:a.addedBy,noteOTW:a.note,upcomingMovies:t.data.upcomingMovies,currentPool:t.data.currentPool,isLoading:!1,imgLoaded:!1})})).catch((function(e){window.alert("Unable to load home data: "+e)})),this.setState({loggedIn:this.context})}},{key:"render",value:function(){var e=this;return this.state.isLoading&&!this.state.imgLoaded?Object(n.jsx)(P,{loading:!0}):Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(P,{}),Object(n.jsxs)("div",{style:{display:1==this.state.imgLoaded?"block":"none"},className:"App",children:[Object(n.jsx)("h1",{className:"title",children:"Selected Movie "}),this.state.isMovieSelected?Object(n.jsxs)("div",{className:"motw-container borders",children:[Object(n.jsxs)("h1",{className:"title",children:[" ",this.state.movieOTW," "]}),Object(n.jsx)("h4",{children:" April 23, 2021 "}),Object(n.jsxs)("p",{children:[" Location: ",Object(n.jsx)("a",{style:{textDecoration:"underline"},href:"https://zoom.us/j/97457711739?pwd=Z2x3K3l5OUVTQVJmNDBkRGNqWHdjZz09",children:"Zoom Theatre"})]}),Object(n.jsxs)("p",{className:"addedBy",children:[" Added by ",this.state.userOTW," "]}),0===this.state.noteOTW.length?null:Object(n.jsxs)("p",{children:[" Teaser: ",this.state.noteOTW," "]}),Object(n.jsx)("img",{style:{height:"45%",width:"45%"},onLoad:function(){e.setState({imgLoaded:!0})},src:"https://m.media-amazon.com/images/M/MV5BOTYwNWNmM2UtNDhlOC00ZGQzLWI1MTMtMmZlMTFjM2Y1N2ZhXkEyXkFqcGdeQXVyMTY5Nzc4MDY@._V1_SX300.jpg"}),Object(n.jsxs)("div",{className:"description-container",children:[Object(n.jsx)("p",{style:{marginBottom:"-.5px"},children:" Description: "}),Object(n.jsx)("p",{children:" In \"Mortal Kombat,\" MMA fighter Cole Young, accustomed to taking a beating for money, is unaware of his heritage--or why Outworld's Emperor Shang Tsung has sent his best warrior, Sub-Zero, an otherworldly Cryomancer, to hunt Cole down. Fearing for his family's safety, Cole goes in search of Sonya Blade at the direction of Jax, a Special Forces Major who bears the same strange dragon marking Cole was born with. Soon, he finds himself at the temple of Lord Raiden, an Elder God and the protector of Earthrealm, who grants sanctuary to those who bear the mark. Here, Cole trains with experienced warriors Liu Kang, Kung Lao and rogue mercenary Kano, as he prepares to stand with Earth's greatest champions against the enemies of Outworld in a high stakes battle for the universe. But will Cole be pushed hard enough to unlock his arcana--the immense power from within his soul--in time to save not only his family, but to stop Outworld once and for all?"}),Object(n.jsx)("p",{children:" Genre: Fantasy, Action, Adventure | Runtime: 1hr 50m | Rated R"})]})]}):Object(n.jsx)("p",{style:{textAlign:"center"},children:" No movie selected yet for this week."}),Object(n.jsxs)("div",{className:"center",children:[Object(n.jsx)("h1",{children:" Statistics "}),Object(n.jsxs)("p",{children:["Total Movies Suggested: ",this.state.upcomingMovies.length+this.state.previousMovies.length," "]}),Object(n.jsxs)("p",{children:["Movies Watched: ",this.state.previousMovies.length," "]}),Object(n.jsxs)("p",{children:["Upcoming Movies: ",this.state.upcomingMovies.length," "]}),Object(n.jsxs)("p",{children:["Current Pool Size: ",this.state.currentPool.length," "]}),Object(n.jsx)("p",{children:"Members: 8 "}),Object(n.jsx)(b,{}),Object(n.jsx)("h1",{children:" Current Pool "}),this.state.currentPool.map((function(e,t){return Object(n.jsxs)("p",{children:[" ",e.suggestion," - ",e.name," "]},t)})),Object(n.jsx)("h1",{children:" Upcoming Movies "}),this.state.upcomingMovies.map((function(e,t){return Object(n.jsx)("div",{children:Object(n.jsxs)("p",{children:[" ",e.name," - ",e.addedBy," "]},t)})})),Object(n.jsx)("h1",{children:" Movies Watched so Far "}),Object(n.jsx)("label",{style:{marginRight:".5vw"},children:" Sort by "}),Object(n.jsxs)("select",{name:"Name",defaultValue:"Date-Descending",onChange:this.updateWatchedSort,children:[Object(n.jsx)("option",{value:"recent",children:"Recent First"}),Object(n.jsx)("option",{value:"oldest",children:"Oldest First"}),Object(n.jsx)("option",{value:"name",children:"Movie Name"}),Object(n.jsx)("option",{disabled:!0,value:"o-rating",children:"Overall Ratings"}),Object(n.jsx)("option",{disabled:!0,value:"u-rating",children:"My Ratings"})]}),this.state.previousMovies.map((function(e,t){return Object(n.jsx)(m,{className:"watched-container",movieTitle:e.name,teaser:e.teaser,addedBy:e.addedBy,dateWatched:e.dateWatched},t)})),Object(n.jsx)("br",{})]})]})]})}}]),a}(o.a.Component),k=Object(p.o)(N),U=(a(84),function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(e=t.call.apply(t,[this].concat(s))).state={user:"",password:""},e.loginUser=function(t){t.preventDefault(),0!=e.state.user.length||0!=e.state.password.length?0!=e.state.user.length?0!=e.state.password.length?j()({method:"post",url:"https://movieotw.herokuapp.com/login",data:{username:e.state.user,password:e.state.password},withCredentials:!0}).then((function(t){t.data.success?(localStorage.setItem("loggedIn",!0),(0,e.context)().then((function(){console.log("pushing to login"),e.props.history.push("/")}))):window.alert(t.data.message)})).catch((function(e){window.alert("Error signing in: "+e)})):window.alert("Password field cannot be empty."):window.alert("Email/Username field cannot be empty."):window.alert("Both fields cannot be empty.")},e.updateUser=function(t){e.setState({user:t.target.value})},e.updatePass=function(t){e.setState({password:t.target.value})},e}return Object(l.a)(a,[{key:"render",value:function(){return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(P,{}),Object(n.jsxs)("div",{className:"login-container",children:[Object(n.jsx)("h1",{className:"title",children:" Login "}),Object(n.jsxs)("form",{onSubmit:this.loginUser,children:[Object(n.jsx)("input",{placeholder:"Username or Email",onChange:this.updateUser}),Object(n.jsx)("br",{}),Object(n.jsx)("input",{type:"password",placeholder:"Password",onChange:this.updatePass}),Object(n.jsx)("br",{}),Object(n.jsx)("br",{}),Object(n.jsx)("button",{type:"submit",children:" Login "})]})]})]})}}]),a}(o.a.Component));U.contextType=S;var T=Object(p.o)(U),L=(a(85),function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(e=t.call.apply(t,[this].concat(s))).state={isLoading:!0,movies:[]},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this;j()({method:"get",url:"https://movieotw.herokuapp.com/loadSuggestions",withCredentials:!0}).then((function(t){null==t.data.isLoggedIn||t.data.isLoggedIn?e.setState({movies:t.data.movies,isLoading:!1}):e.props.history.push("/login")})).catch((function(e){window.alert("Unable to suggestions: "+e)}))}},{key:"render",value:function(){return this.state.isLoading?Object(n.jsx)(P,{loading:!0}):Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(P,{}),Object(n.jsx)("h1",{className:"suggestion-title",children:" My Suggestions "}),this.state.movies.map((function(e,t){return Object(n.jsxs)("div",{className:"suggestion-container",children:[Object(n.jsxs)("p",{children:[" ",e.name," - ",e.date," "]},t),Object(n.jsx)("button",{children:" Delete "})]})}))]})}}]),a}(o.a.Component)),F=Object(p.o)(L),I=a(27),W=a(51),E=function(e){var t=e.render,a=Object(W.a)(e,["render"]),o=Object(s.useContext)(y);return Object(n.jsx)(p.d,Object(I.a)(Object(I.a)({},a),{},{render:function(e){return o?Object(n.jsx)(t,Object(I.a)({},e)):Object(n.jsx)(p.c,{to:"/login"})}}))},R=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(c.a)(this,a);for(var n=arguments.length,s=new Array(n),o=0;o<n;o++)s[o]=arguments[o];return(e=t.call.apply(t,[this].concat(s))).state={email:"",currentPassword:"",newPassword:"",confirmNewPassword:"",username:""},e.updateEmail=function(t){e.setState({email:t.target.value})},e.updateUsername=function(t){e.setState({username:t.target.value})},e.updateCurrentPassword=function(t){e.setState({currentPassword:t.target.value})},e.updateNewPassword=function(t){e.setState({newPassword:t.target.value})},e.updateConfirmNewPassword=function(t){e.setState({confirmNewPassword:t.target.value})},e.submitEmailUpdate=function(){0!==e.state.email.length?e.state.email.includes("@")?j()({method:"post",url:"https://movieotw.herokuapp.com/user/updateEmail",data:{email:e.state.email},withCredentials:!0}).then((function(t){t.data.success?(window.alert("Email has successfully updated."),e.setState({email:""})):window.alert("Email did not update: "+t.data.val)})).catch((function(e){window.alert("Unable to update email: "+e)})):window.alert("Domain (@) not specified."):window.alert("Email field empty.")},e.submitUsernameUpdate=function(){0!==e.state.username.length?j()({method:"post",url:"https://movieotw.herokuapp.com/user/updateUsername",data:{username:e.state.username},withCredentials:!0}).then((function(t){t.data.success?(window.alert("Username has successfully updated."),e.setState({username:""})):window.alert("Username did not update, please try again.")})).catch((function(e){window.alert("Unable to update username: "+e)})):window.alert("Username field empty.")},e.submitPasswordUpdate=function(){0!==e.state.currentPassword.length?0!==e.state.newPassword.length?e.state.confirmNewPassword===e.state.newPassword?j()({method:"post",url:"https://movieotw.herokuapp.com/user/updatePassword",data:{newPassword:e.state.newPassword,currPassword:e.state.currentPassword},withCredentials:!0}).then((function(t){t.data.success?(window.alert("Password has successfully updated."),e.setState({currentPassword:""}),e.setState({newPassword:""}),e.setState({confirmNewPassword:""})):window.alert("Password did not update: "+t.data.val)})).catch((function(e){window.alert("Unable to update password: "+e)})):window.alert("New passwords did not match. Please try again."):window.alert("New password field is empty."):window.alert("Current password field is empty.")},e}return Object(l.a)(a,[{key:"render",value:function(){return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(P,{}),Object(n.jsx)("h1",{children:" Update Email "}),Object(n.jsx)("input",{value:this.state.email,onChange:this.updateEmail}),Object(n.jsx)("br",{}),Object(n.jsx)("button",{onClick:this.submitEmailUpdate,children:"Update Email "}),Object(n.jsx)("h1",{children:" Update User Name "}),Object(n.jsx)("input",{value:this.state.username,onChange:this.updateUsername}),Object(n.jsx)("br",{}),Object(n.jsx)("button",{onClick:this.submitUsernameUpdate,children:"Update Username"}),Object(n.jsx)("h1",{children:" Update Password "}),Object(n.jsx)("label",{children:" Current password "}),Object(n.jsx)("input",{value:this.state.currentPassword,type:"password",onChange:this.updateCurrentPassword}),Object(n.jsx)("br",{}),Object(n.jsx)("label",{children:" New Password "}),Object(n.jsx)("input",{value:this.state.newPassword,type:"password",onChange:this.updateNewPassword}),Object(n.jsx)("br",{}),Object(n.jsx)("label",{children:" Confirm New Password "}),Object(n.jsx)("input",{value:this.state.confirmNewPassword,type:"password",onChange:this.updateConfirmNewPassword}),Object(n.jsx)("br",{}),Object(n.jsx)("button",{onClick:this.submitPasswordUpdate,children:"Update Password "})]})}}]),a}(o.a.Component),B=a(20);a(86).config();var D=function(e){Object(d.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return Object(n.jsx)(n.Fragment,{children:Object(n.jsx)(C,{children:Object(n.jsxs)(B.BrowserRouter,{children:[Object(n.jsx)(E,{path:"/",exact:!0,render:function(e){return Object(n.jsx)(k,{})}}),Object(n.jsx)(p.d,{path:"/login",exact:!0,render:function(e){return Object(n.jsx)(T,{})}}),Object(n.jsx)(E,{path:"/suggestions",exact:!0,render:function(e){return Object(n.jsx)(F,{})}}),Object(n.jsx)(E,{path:"/profile",exact:!0,render:function(e){return Object(n.jsx)(R,{})}})]})})})}}]),a}(o.a.Component),A=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,96)).then((function(t){var a=t.getCLS,n=t.getFID,s=t.getFCP,o=t.getLCP,i=t.getTTFB;a(e),n(e),s(e),o(e),i(e)}))};r.a.render(Object(n.jsx)(B.BrowserRouter,{children:Object(n.jsx)(D,{})}),document.getElementById("root")),A()}},[[89,1,2]]]);
//# sourceMappingURL=main.84f9f376.chunk.js.map