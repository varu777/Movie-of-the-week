(this.webpackJsonpmovie=this.webpackJsonpmovie||[]).push([[0],{100:function(e,t,n){},119:function(e,t){},121:function(e,t){},139:function(e,t,n){},140:function(e,t,n){},144:function(e,t,n){"use strict";n.r(t);var s=n(1),a=n(0),o=n.n(a),i=n(26),r=n.n(i),c=(n(81),n(45),n(9)),d=n(10),l=n(12),u=n(11),h=n(7),j=n.n(h),p=n(6),b=(n(99),function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var s=arguments.length,a=new Array(s),o=0;o<s;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))).state={movieSuggestion:"",movieNote:"",loggedIn:!1},e.submitSuggestion=function(){if(0!==e.state.movieSuggestion.length){var t=e.state.movieSuggestion;j()({method:"post",url:"https://movieotw.herokuapp.com/SuggestMovie",data:{movie:t,movieNote:e.state.movieNote},withCredentials:!0}).then((function(t){t.data.success?(e.setState({movieSuggestion:"",movieNote:""}),window.alert("Successfully added "+t.data.val+".\nMovie ID: "+t.data.movieIdx)):window.alert(t.data.val)})).catch((function(e){console.log(e)}))}else window.alert("Movie name cannot be empty.")},e.updateMovie=function(t){e.setState({movieSuggestion:t.target.value})},e.updateUser=function(t){e.setState({user:t.target.value})},e.updateNote=function(t){e.setState({movieNote:t.target.value})},e.showReviewForm=function(){window.alert("clicked")},e}return Object(d.a)(n,[{key:"componentDidMount",value:function(){this.setState({loggedIn:this.context})}},{key:"render",value:function(){return Object(s.jsxs)("div",{children:[Object(s.jsx)("h1",{children:" Suggest a Movie "}),Object(s.jsx)("label",{children:" Title: "}),Object(s.jsx)("input",{value:this.state.movieSuggestion,onChange:this.updateMovie}),Object(s.jsx)("br",{}),"true"==localStorage.getItem("loggedIn")?Object(s.jsx)(s.Fragment,{}):Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("label",{children:" Suggested By: "}),Object(s.jsxs)("select",{name:"Name",defaultValue:"Choose here",onChange:this.updateUser,children:[Object(s.jsx)("option",{value:"Choose here",disabled:!0,hidden:!0,children:"Choose here"}),Object(s.jsx)("option",{value:"Felix",children:"Felix"}),Object(s.jsx)("option",{value:"Hector",children:"Hector"}),Object(s.jsx)("option",{value:"Jason",children:"Jason"}),Object(s.jsx)("option",{value:"Jesse",children:"Jesse"}),Object(s.jsx)("option",{value:"Jorge",children:"Jorge"}),Object(s.jsx)("option",{value:"Juan",children:"Juan"}),Object(s.jsx)("option",{value:"Octavio",children:"Octavio"})]}),Object(s.jsx)("br",{})]}),Object(s.jsx)("label",{children:" Teaser Note (optional): "}),Object(s.jsx)("textarea",{value:this.state.movieNote,onChange:this.updateNote}),Object(s.jsx)("br",{}),Object(s.jsx)("button",{onClick:this.submitSuggestion,children:" Suggest "})]})}}]),n}(o.a.Component)),g=(n(100),function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var s=arguments.length,a=new Array(s),o=0;o<s;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))).state={displayReviewForm:!1,reviewSubmitted:!1,reviewScoreInput:-1,finalReviewScore:-1,user:""},e.displayReviewForm=function(){e.setState({displayReviewForm:!0})},e.cancelReview=function(){e.setState({displayReviewForm:!1})},e.updateReviewScore=function(t){e.setState({reviewScore:t.target.value})},e.updateUser=function(t){e.setState({user:t.target.value})},e.submitReview=function(){try{var t=parseFloat(e.state.reviewScore);window.alert(t)}catch(n){return void window.alert("Error")}e.setState({reviewSubmitted:!0})},e}return Object(d.a)(n,[{key:"render",value:function(){return Object(s.jsxs)("div",{className:"container",children:[Object(s.jsxs)("p",{children:[" Movie title: ",this.props.movieTitle," "]}),Object(s.jsxs)("p",{children:[" Suggested by: ",this.props.addedBy," "]}),Object(s.jsxs)("p",{children:[" Watched on: ",this.props.dateWatched," "]}),Object(s.jsxs)("p",{children:[" Teaser Note: ",this.props.teaser," "]})]})}}]),n}(o.a.Component)),m=n(148),v=n(150),O=n(149),w=n(147),x=n(41),f=n(44),y=(n(106),o.a.createContext({loggedin:!1,currentUser:{}})),C=o.a.createContext(!0),S=function(e){var t=e.children,n=Object(a.useContext)(y),o=Object(a.useState)(n),i=Object(f.a)(o,2),r=i[0],c=i[1],d=Object(a.useState)(!0),l=Object(f.a)(d,2),u=l[0],h=l[1],p=function(){return j()({method:"get",url:"https://movieotw.herokuapp.com/loginCheck",withCredentials:!0}).then((function(e){e.data.isLoggedIn?c({loggedIn:!0,currentUser:e.data.currentUser}):c({loggedIn:!1,currentUser:{}}),h(!1)})).catch((function(e){window.alert("Unable to load home data: "+e),c({loggedIn:!1,currentUser:{}}),h(!1)}))};return Object(a.useEffect)((function(){p()}),[]),u?(console.log("here"),Object(s.jsx)(s.Fragment,{children:" "})):Object(s.jsx)(C.Provider,{value:p,children:Object(s.jsx)(y.Provider,{value:r,children:t})})},P=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var s=arguments.length,a=new Array(s),o=0;o<s;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))).state={loggedIn:e.props.user.loggedIn,currentUser:null===e.props.user.currentUser?"":e.props.user.currentUser.username},e.logout=function(){console.log("her"),j()({method:"get",url:"https://movieotw.herokuapp.com/logout",withCredentials:!0,loggedIn:e.context.loggedIn}).then((function(t){t.data.success?(e.setState({loggedIn:!1}),localStorage.setItem("loggedIn",!1),window.location.reload()):window.alert("Unable to logout, please try again.")})).catch((function(e){window.alert("Unable to logout: "+e)}))},e}return Object(d.a)(n,[{key:"componentDidMount",value:function(){console.log(this.props.user),this.setState({loggedIn:this.props.user.loggedIn}),this.setState({currentUser:this.props.user.currentUser.username})}},{key:"render",value:function(){return Object(s.jsxs)(m.a,{bg:"dark",expand:"lg",children:[Object(s.jsx)(m.a.Brand,{style:{color:"salmon"},href:"/",children:"Movie Of The Week"}),Object(s.jsx)(m.a.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(s.jsxs)(m.a.Collapse,{id:"basic-navbar-nav",children:[Object(s.jsxs)(v.a,{className:"mr-auto",children:[Object(s.jsx)(v.a.Link,{style:{color:"white"},href:"#home",children:"Leaderboard"}),Object(s.jsx)(v.a.Link,{style:{color:"white"},href:"#suggestions",children:"Suggestions"})]}),Object(s.jsx)(O.a,{inline:!0,children:this.state.loggedIn?Object(s.jsxs)(s.Fragment,{children:[""===this.state.currentUser?Object(s.jsx)("p",{}):Object(s.jsxs)("p",{style:{marginRight:"10px",marginTop:"12px"},children:[" Welcome back, ",this.state.currentUser,"!"]}),Object(s.jsx)(x.LinkContainer,{style:{marginRight:"5px"},to:"/profile",children:Object(s.jsx)(w.a,{color:"blue",variant:"secondary",children:"Profile"})}),Object(s.jsx)(w.a,{onClick:this.logout,color:"blue",variant:"secondary",children:"Logout"})]}):Object(s.jsx)(s.Fragment,{children:Object(s.jsx)(x.LinkContainer,{to:"/login",children:Object(s.jsx)(w.a,{color:"green",variant:"secondary",children:"Login"})})})})]})]})}}]),n}(o.a.Component),k=Object(p.o)(P),U=n(27),M=n.n(U),N=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var s=arguments.length,a=new Array(s),o=0;o<s;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))).state={isMovieSelected:!1,movieOTW:"",userOTW:"",date:"",noteOTW:"",description:"",posterLink:"",previousMovies:[],currentPool:[],upcomingMovies:[],isLoading:!0,loggedIn:!1},e.updateWatchedSort=function(t){var n=t.target.value;j()({method:"post",url:"https://movieotw.herokuapp.com/SortWatched",data:{sortBy:n},withCredentials:!0}).then((function(t){e.setState({previousMovies:t.data.movies})})).catch((function(e){window.alert("Unable to apply filter: "+e)}))},e}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=this;j()({method:"get",url:"https://movieotw.herokuapp.com/HomeData",withCredentials:!0}).then((function(t){console.log(t.data);var n=t.data.movieOTW,s=0!==n.watchOTW.length,a=t.data.watchedMovies;e.setState({previousMovies:a,isMovieSelected:s,movieOTW:n.watchOTW,userOTW:n.addedBy,noteOTW:n.note,genre:n.genre,rating:n.rating,posterLink:n.posterLink,runtime:n.runtime,description:n.description,upcomingMovies:t.data.upcomingMovies,currentPool:t.data.currentPool,isLoading:!1,imgLoaded:!1})})).catch((function(e){window.alert("Unable to load home data: "+e)})),this.setState({loggedIn:this.context})}},{key:"render",value:function(){var e=this;return Object(s.jsx)(s.Fragment,{children:Object(s.jsxs)("div",{style:{display:1==this.state.imgLoaded?"block":"none"},className:"App",children:[Object(s.jsx)("h1",{className:"title",children:"Selected Movie "}),this.state.isMovieSelected?Object(s.jsxs)("div",{className:"motw-container borders",children:[Object(s.jsxs)("h1",{className:"title",children:[" ",this.state.movieOTW," "]}),Object(s.jsxs)("h4",{children:[" ",this.state.date," "]}),Object(s.jsxs)("p",{children:[" Location: ",Object(s.jsx)("a",{style:{textDecoration:"underline"},href:"https://zoom.us/j/97457711739?pwd=Z2x3K3l5OUVTQVJmNDBkRGNqWHdjZz09",children:"Zoom Theatre"})]}),Object(s.jsxs)("p",{className:"addedBy",children:[" Added by ",this.state.userOTW," "]}),0===this.state.noteOTW.length?null:Object(s.jsxs)("p",{children:[" Teaser: ",this.state.noteOTW," "]}),Object(s.jsx)("img",{style:{height:"45%",width:"45%"},onLoad:function(){e.setState({imgLoaded:!0})},src:this.state.posterLink}),Object(s.jsxs)("div",{className:"description-container",children:[Object(s.jsx)("p",{style:{marginBottom:"-.5px"},children:" Description: "}),Object(s.jsxs)("p",{children:[" ",this.state.description," "]}),Object(s.jsxs)("p",{children:[" Genre: ",this.state.genre," | Runtime: ",this.state.runtime," | Rated ",this.state.rating]})]})]}):Object(s.jsx)("p",{style:{textAlign:"center"},children:" No movie selected yet for this week."}),Object(s.jsxs)("div",{className:"center",children:[Object(s.jsx)("h1",{children:" Statistics "}),Object(s.jsxs)("p",{children:["Total Movies Suggested: ",this.state.upcomingMovies.length+this.state.previousMovies.length," "]}),Object(s.jsxs)("p",{children:["Movies Watched: ",this.state.previousMovies.length," "]}),Object(s.jsxs)("p",{children:["Upcoming Movies: ",this.state.upcomingMovies.length," "]}),Object(s.jsxs)("p",{children:["Current Pool Size: ",this.state.currentPool.length," "]}),Object(s.jsx)("p",{children:"Members: 7 "}),Object(s.jsx)(b,{}),Object(s.jsx)("h1",{children:" Current Pool "}),this.state.currentPool.map((function(e,t){return Object(s.jsxs)("p",{children:[" ",e.suggestion," - ",e.name," "]},t)})),Object(s.jsx)("h1",{children:" Upcoming Movies "}),this.state.upcomingMovies.map((function(e,t){return Object(s.jsx)("div",{children:Object(s.jsxs)("p",{children:[" ",e.name," - ",e.addedBy," "]},t)})})),Object(s.jsx)("h1",{children:" Movies Watched so Far "}),Object(s.jsx)("label",{style:{marginRight:".5vw"},children:" Sort by "}),Object(s.jsxs)("select",{name:"Name",defaultValue:"Date-Descending",onChange:this.updateWatchedSort,children:[Object(s.jsx)("option",{value:"recent",children:"Recent First"}),Object(s.jsx)("option",{value:"oldest",children:"Oldest First"}),Object(s.jsx)("option",{value:"name",children:"Movie Name"}),Object(s.jsx)("option",{disabled:!0,value:"o-rating",children:"Overall Ratings"}),Object(s.jsx)("option",{disabled:!0,value:"u-rating",children:"My Ratings"})]}),this.state.previousMovies.map((function(e,t){return Object(s.jsx)(g,{className:"watched-container",movieTitle:e.name,teaser:e.teaser,addedBy:e.addedBy,dateWatched:M()(e.date)},t)})),Object(s.jsx)("br",{})]})]})})}}]),n}(o.a.Component),L=Object(p.o)(N),T=(n(139),function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var s=arguments.length,a=new Array(s),o=0;o<s;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))).state={user:"",password:""},e.loginUser=function(t){t.preventDefault(),0!=e.state.user.length||0!=e.state.password.length?0!=e.state.user.length?0!=e.state.password.length?j()({method:"post",url:"https://movieotw.herokuapp.com/login",data:{username:e.state.user,password:e.state.password},withCredentials:!0}).then((function(t){t.data.success?(localStorage.setItem("loggedIn",!0),(0,e.context)().then((function(){e.props.history.push("/"),window.location.reload()}))):window.alert(t.data.message)})).catch((function(e){window.alert("Error signing in: "+e)})):window.alert("Password field cannot be empty."):window.alert("Email/Username field cannot be empty."):window.alert("Both fields cannot be empty.")},e.updateUser=function(t){e.setState({user:t.target.value})},e.updatePass=function(t){e.setState({password:t.target.value})},e}return Object(d.a)(n,[{key:"render",value:function(){return Object(s.jsx)(s.Fragment,{children:Object(s.jsxs)("div",{className:"login-container",children:[Object(s.jsx)("h1",{className:"title",children:" Login "}),Object(s.jsxs)("form",{onSubmit:this.loginUser,children:[Object(s.jsx)("input",{placeholder:"Username or Email",onChange:this.updateUser}),Object(s.jsx)("br",{}),Object(s.jsx)("input",{type:"password",placeholder:"Password",onChange:this.updatePass}),Object(s.jsx)("br",{}),Object(s.jsx)("br",{}),Object(s.jsx)("button",{type:"submit",children:" Login "})]}),Object(s.jsx)("br",{})]})})}}]),n}(o.a.Component));T.contextType=C;var F=Object(p.o)(T),I=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var s=arguments.length,a=new Array(s),o=0;o<s;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))).state={movieName:"",addedBy:"",teaser:"",description:"",rating:"",runtime:"",genre:"",posterLink:""},e.updateMovieName=function(t){e.setState({movieName:t.target.value})},e.updateAddedBy=function(t){e.setState({addedBy:t.target.value})},e.updateTeaser=function(t){e.setState({teaser:t.target.value})},e.updateDescription=function(t){e.setState({description:t.target.value})},e.updateRating=function(t){e.setState({rating:t.target.value})},e.updateRuntime=function(t){e.setState({runtime:t.target.value})},e.updateGenre=function(t){e.setState({genre:t.target.value})},e.updatePosterLink=function(t){e.setState({posterLink:t.target.value})},e.submitUpdateMovie=function(){j()({method:"post",url:"https://movieotw.herokuapp.com/movie/updateMovie",data:{movieName:e.state.movieName,addedBy:e.state.addedBy,teaser:e.state.teaser,description:e.state.description,rating:e.state.rating,runtime:e.state.runtime,genre:e.state.genre,posterLink:e.state.posterLink},withCredentials:!0}).then((function(e){e.data.success?window.alert("Movie of the week updated."):window.alert("Unable to update movie of the week.")})).catch((function(e){window.alert("Error updating movie: "+e)}))},e}return Object(d.a)(n,[{key:"render",value:function(){return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)(k,{}),Object(s.jsx)("h1",{children:" Movie Name "}),Object(s.jsx)("input",{value:this.state.movieName,onChange:this.updateMovieName}),Object(s.jsx)("br",{}),Object(s.jsx)("h1",{children:" Added By "}),Object(s.jsx)("input",{value:this.state.addedBy,onChange:this.updateAddedBy}),Object(s.jsx)("br",{}),Object(s.jsx)("h1",{children:" Teaser "}),Object(s.jsx)("input",{value:this.state.teaser,onChange:this.updateTeaser}),Object(s.jsx)("br",{}),Object(s.jsx)("h1",{children:" Description "}),Object(s.jsx)("input",{value:this.state.description,onChange:this.updateDescription}),Object(s.jsx)("br",{}),Object(s.jsx)("h1",{children:" Rating "}),Object(s.jsx)("input",{value:this.state.rating,onChange:this.updateRating}),Object(s.jsx)("br",{}),Object(s.jsx)("h1",{children:" Runtime "}),Object(s.jsx)("input",{value:this.state.runtime,onChange:this.updateRuntime}),Object(s.jsx)("br",{}),Object(s.jsx)("h1",{children:" Genre "}),Object(s.jsx)("input",{value:this.state.genre,onChange:this.updateGenre}),Object(s.jsx)("br",{}),Object(s.jsx)("h1",{children:" Poster Link"}),Object(s.jsx)("input",{value:this.state.posterLink,onChange:this.updatePosterLink}),Object(s.jsx)("br",{}),Object(s.jsx)("br",{}),Object(s.jsx)("button",{onClick:this.submitUpdateMovie,children:"Update Movie"})]})}}]),n}(o.a.Component),R=(n(140),function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var s=arguments.length,a=new Array(s),o=0;o<s;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))).state={enteredPool:!1,currentChoice:{},isLoading:!0,userMovies:[],otherMovies:[]},e.deleteSuggestion=function(t){window.confirm("Remove "+t+"?")&&j()({method:"post",url:"https://movieotw.herokuapp.com/movie/removeSuggestion",data:{movie:t},withCredentials:!0}).then((function(n){n.data.success?(e.setState({userMovies:e.state.userMovies.filter((function(e){return e.name!==t}))}),window.alert("Successfully removed "+t+".")):window.alert(n.data.val)})).catch((function(e){window.alert("Unable to suggestions: "+e)}))},e.setAsNextChoice=function(t){if(t.name===e.state.currentChoice.name&&e.state.enteredPool)window.alert("Movie already set as current choice.");else if(window.confirm("Update current suggestion to "+t.name+"?")){if(e.setState({enteredPool:!0}),t.name==e.state.currentChoice)return void window.alert("hit");j()({method:"post",url:"http://movieotw.herokuapp.com/movie/updateSuggestion",data:{previous:e.state.currentChoice.name,new:t.name},withCredentials:!0}).then((function(n){n.data.success?e.setState({currentChoice:t}):window.alert(n.data.val)})).catch((function(e){window.alert("Unable to suggestions: "+e)}))}},e.enterPool=function(){j()({method:"post",url:"https://movieotw.herokuapp.com/user/enterPool",withCredentials:!0}).then((function(t){t.data.success?e.setState({enteredPool:!0}):window.alert(t.data.val)})).catch((function(e){window.alert("Unable to suggestions: "+e)}))},e.leavePool=function(){window.confirm("Leave current pool?")&&j()({method:"post",url:"https://movieotw.herokuapp.com/user/leavePool",withCredentials:!0}).then((function(t){t.data.success?e.setState({enteredPool:!1}):window.alert(t.data.val)})).catch((function(e){window.alert("Unable to suggestions: "+e)}))},e}return Object(d.a)(n,[{key:"componentDidMount",value:function(){var e=this;j()({method:"get",url:"https://movieotw.herokuapp.com/loadSuggestions",withCredentials:!0}).then((function(t){console.log(t.data.currentChoice),e.setState({enteredPool:t.data.enteredPool,userMovies:t.data.userMovies,otherMovies:t.data.otherMovies,currentChoice:t.data.currentChoice,isLoading:!1})})).catch((function(e){window.alert("Unable to suggestions: "+e)}))}},{key:"render",value:function(){var e=this;return this.state.isLoading?Object(s.jsx)(k,{loading:!0}):Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)(k,{}),Object(s.jsx)("h1",{className:"suggestion-title",children:" Current Choice "}),0==this.state.enteredPool?Object(s.jsxs)("div",{style:{textAlign:"center"},children:[Object(s.jsx)("p",{children:" Join the pool! "}),Object(s.jsx)("button",{style:{align:"center"},onClick:this.enterPool,children:" Enter Pool "})]}):Object(s.jsxs)("div",{className:"suggestion-container",children:[Object(s.jsxs)("p",{children:[" ",this.state.currentChoice.name]}),Object(s.jsxs)("p",{children:[" Date added ",M()(this.state.currentChoice.date)," "]}),Object(s.jsxs)("p",{children:[" Added by ",this.state.currentChoice.addedBy," "]}),Object(s.jsx)("button",{onClick:function(){e.deleteSuggestion(e.state.currentChoice.name)},children:" Delete "}),Object(s.jsx)("button",{onClick:this.leavePool,children:" Leave Pool "})]}),Object(s.jsx)("h1",{className:"suggestion-title",children:" My Unwatched Suggestions "}),this.state.userMovies.map((function(t,n){return Object(s.jsxs)("div",{className:"suggestion-container",children:[Object(s.jsxs)("p",{children:[" ",t.name," "]}),Object(s.jsxs)("p",{children:[" Added on ",M()(t.date)," "]}),Object(s.jsx)("button",{onClick:function(){e.deleteSuggestion(t.name)},children:" Delete "}),Object(s.jsx)("button",{onClick:function(){e.setAsNextChoice(t)},children:" Suggest Now "})]},n)})),Object(s.jsx)("h1",{className:"suggestion-title",children:" What Everyone Else Wants to Watch "}),this.state.otherMovies.map((function(t,n){return Object(s.jsxs)("div",{className:"suggestion-container",children:[Object(s.jsxs)("p",{children:[" ",t.name," "]}),Object(s.jsxs)("p",{children:[" Date added ",M()(t.date)," "]}),Object(s.jsxs)("p",{children:[" Added by ",t.addedBy," "]}),Object(s.jsx)("button",{onClick:function(){e.setAsNextChoice(t)},children:" Suggest Now "})]},n)}))]})}}]),n}(o.a.Component)),W=Object(p.o)(R),B=n(35),D=n(75),A=function(e){var t=e.render,n=Object(D.a)(e,["render"]),o=Object(a.useContext)(y).loggedIn;return Object(s.jsx)(p.d,Object(B.a)(Object(B.a)({},n),{},{render:function(e){return o?Object(s.jsx)(t,Object(B.a)({},e)):Object(s.jsx)(p.c,{to:"/login"})}}))},E=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var s=arguments.length,a=new Array(s),o=0;o<s;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))).state={email:"",currentPassword:"",newPassword:"",confirmNewPassword:"",username:""},e.updateEmail=function(t){e.setState({email:t.target.value})},e.updateUsername=function(t){e.setState({username:t.target.value})},e.updateCurrentPassword=function(t){e.setState({currentPassword:t.target.value})},e.updateNewPassword=function(t){e.setState({newPassword:t.target.value})},e.updateConfirmNewPassword=function(t){e.setState({confirmNewPassword:t.target.value})},e.submitEmailUpdate=function(){0!==e.state.email.length?e.state.email.includes("@")?j()({method:"post",url:"https://movieotw.herokuapp.com/user/updateEmail",data:{email:e.state.email},withCredentials:!0}).then((function(t){t.data.success?(window.alert("Email has successfully updated."),e.setState({email:""})):window.alert("Email did not update: "+t.data.val)})).catch((function(e){window.alert("Unable to update email: "+e)})):window.alert("Domain (@) not specified."):window.alert("Email field empty.")},e.submitUsernameUpdate=function(){0!==e.state.username.length?j()({method:"post",url:"https://movieotw.herokuapp.com/user/updateUsername",data:{username:e.state.username},withCredentials:!0}).then((function(t){t.data.success?(window.alert("Username has successfully updated."),e.setState({username:""})):window.alert("Username did not update, please try again.")})).catch((function(e){window.alert("Unable to update username: "+e)})):window.alert("Username field empty.")},e.submitPasswordUpdate=function(){0!==e.state.currentPassword.length?0!==e.state.newPassword.length?e.state.confirmNewPassword===e.state.newPassword?j()({method:"post",url:"https://movieotw.herokuapp.com/user/updatePassword",data:{newPassword:e.state.newPassword,currPassword:e.state.currentPassword},withCredentials:!0}).then((function(t){t.data.success?(window.alert("Password has successfully updated."),e.setState({currentPassword:""}),e.setState({newPassword:""}),e.setState({confirmNewPassword:""})):window.alert("Password did not update: "+t.data.val)})).catch((function(e){window.alert("Unable to update password: "+e)})):window.alert("New passwords did not match. Please try again."):window.alert("New password field is empty."):window.alert("Current password field is empty.")},e}return Object(d.a)(n,[{key:"render",value:function(){return Object(s.jsxs)(s.Fragment,{children:[Object(s.jsx)("h1",{children:" Update Email "}),Object(s.jsx)("input",{value:this.state.email,onChange:this.updateEmail}),Object(s.jsx)("br",{}),Object(s.jsx)("button",{onClick:this.submitEmailUpdate,children:"Update Email "}),Object(s.jsx)("h1",{children:" Update Username "}),Object(s.jsx)("input",{value:this.state.username,onChange:this.updateUsername}),Object(s.jsx)("br",{}),Object(s.jsx)("button",{onClick:this.submitUsernameUpdate,children:"Update Username"}),Object(s.jsx)("h1",{children:" Update Password "}),Object(s.jsx)("label",{children:" Current password "}),Object(s.jsx)("input",{value:this.state.currentPassword,type:"password",onChange:this.updateCurrentPassword}),Object(s.jsx)("br",{}),Object(s.jsx)("label",{children:" New Password "}),Object(s.jsx)("input",{value:this.state.newPassword,type:"password",onChange:this.updateNewPassword}),Object(s.jsx)("br",{}),Object(s.jsx)("label",{children:" Confirm New Password "}),Object(s.jsx)("input",{value:this.state.confirmNewPassword,type:"password",onChange:this.updateConfirmNewPassword}),Object(s.jsx)("br",{}),Object(s.jsx)("button",{onClick:this.submitPasswordUpdate,children:"Update Password "})]})}}]),n}(o.a.Component),J=n(23);n(141).config();var G=function(e){e.children;var t=Object(a.useContext)(y);return Object(s.jsx)(s.Fragment,{children:Object(s.jsxs)(J.BrowserRouter,{children:[Object(s.jsx)(k,{user:t}),Object(s.jsx)(A,{path:"/",exact:!0,render:function(e){return Object(s.jsx)(L,{})}}),Object(s.jsx)(p.d,{path:"/login",exact:!0,render:function(e){return Object(s.jsx)(F,{})}}),Object(s.jsx)(A,{path:"/suggestions",exact:!0,render:function(e){return Object(s.jsx)(W,{})}}),Object(s.jsx)(A,{path:"/profile",exact:!0,render:function(e){return Object(s.jsx)(E,{})}}),Object(s.jsx)(A,{path:"/updateMovie",exact:!0,render:function(e){return Object(s.jsx)(I,{})}})]})})},H=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,151)).then((function(t){var n=t.getCLS,s=t.getFID,a=t.getFCP,o=t.getLCP,i=t.getTTFB;n(e),s(e),a(e),o(e),i(e)}))};r.a.render(Object(s.jsx)(S,{children:Object(s.jsx)(J.BrowserRouter,{children:Object(s.jsx)(G,{})})}),document.getElementById("root")),H()},27:function(e,t){var n=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];e.exports=function(e){return e=new Date(e),n[e.getMonth()]+" "+e.getDate()+", "+e.getFullYear()}},45:function(e,t,n){},81:function(e,t,n){},99:function(e,t,n){}},[[144,1,2]]]);
//# sourceMappingURL=main.23068806.chunk.js.map