(this.webpackJsonpmovie=this.webpackJsonpmovie||[]).push([[0],{34:function(e,t,n){},54:function(e,t,n){},72:function(e,t,n){},73:function(e,t,n){},84:function(e,t,n){"use strict";n.r(t);var a=n(1),o=n(0),i=n.n(o),s=n(20),r=n.n(s),c=(n(54),n(10)),l=n(11),d=n(13),h=n(12),u=(n(34),n(21)),j=n.n(u),b=(n(72),function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(e=t.call.apply(t,[this].concat(o))).state={movieSuggestion:"",user:"",movieNote:""},e.submitSuggestion=function(){if(0!==e.state.movieSuggestion.length)if(0!==e.state.user.length){var t=e.state.movieSuggestion,n=e.state.user;j()({method:"post",url:"https://movieotw.herokuapp.com/SuggestMovie",data:{movie:t,name:n,movieNote:e.state.movieNote}}).then((function(t){t.data.success?(e.setState({movieSuggestion:"",movieNote:""}),window.alert("Successfully added "+t.data.val+".\nMovie ID: "+t.data.movieIdx)):window.alert(t.data.val)})).catch((function(e){console.log(e)}))}else window.alert("User not selected.");else window.alert("Movie name cannot be empty.")},e.updateMovie=function(t){e.setState({movieSuggestion:t.target.value})},e.updateUser=function(t){e.setState({user:t.target.value})},e.updateNote=function(t){e.setState({movieNote:t.target.value})},e.showReviewForm=function(){window.alert("clicked")},e}return Object(l.a)(n,[{key:"render",value:function(){return Object(a.jsxs)("div",{children:[Object(a.jsx)("h1",{children:" Suggest a Movie "}),Object(a.jsx)("label",{children:" Title: "}),Object(a.jsx)("input",{value:this.state.movieSuggestion,onChange:this.updateMovie}),Object(a.jsx)("br",{}),Object(a.jsx)("label",{children:" Suggested By: "}),Object(a.jsxs)("select",{name:"Name",defaultValue:"Choose here",onChange:this.updateUser,children:[Object(a.jsx)("option",{value:"Choose here",disabled:!0,hidden:!0,children:"Choose here"}),Object(a.jsx)("option",{value:"Felix",children:"Felix"}),Object(a.jsx)("option",{value:"Hector",children:"Hector"}),Object(a.jsx)("option",{value:"Jason",children:"Jason"}),Object(a.jsx)("option",{value:"Jesse",children:"Jesse"}),Object(a.jsx)("option",{value:"Jorge",children:"Jorge"}),Object(a.jsx)("option",{value:"Juan",children:"Juan"}),Object(a.jsx)("option",{value:"Octavio",children:"Octavio"})]}),Object(a.jsx)("br",{}),Object(a.jsx)("label",{children:" Teaser Note (optional): "}),Object(a.jsx)("textarea",{value:this.state.movieNote,onChange:this.updateNote}),Object(a.jsx)("br",{}),Object(a.jsx)("button",{onClick:this.submitSuggestion,children:" Suggest "})]})}}]),n}(i.a.Component)),v=(n(73),function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(e=t.call.apply(t,[this].concat(o))).state={displayReviewForm:!1,reviewSubmitted:!1,reviewScoreInput:-1,finalReviewScore:-1,user:""},e.displayReviewForm=function(){e.setState({displayReviewForm:!0})},e.cancelReview=function(){e.setState({displayReviewForm:!1})},e.updateReviewScore=function(t){e.setState({reviewScore:t.target.value})},e.updateUser=function(t){e.setState({user:t.target.value})},e.submitReview=function(){try{var t=parseFloat(e.state.reviewScore);window.alert(t)}catch(n){return void window.alert("Error")}e.setState({reviewSubmitted:!0})},e}return Object(l.a)(n,[{key:"render",value:function(){return Object(a.jsxs)("div",{className:"container",children:[Object(a.jsxs)("p",{children:[" Movie title: ",this.props.movieTitle," "]}),Object(a.jsxs)("p",{children:[" Suggested by: ",this.props.addedBy," "]}),Object(a.jsxs)("p",{children:[" Watched on: ",this.props.dateWatched," "]}),Object(a.jsxs)("p",{children:[" Teaser Note: ",this.props.teaser," "]})]})}}]),n}(i.a.Component)),O=n(88),p=n(90),m=n(89),g=n(87),x=n(45),f=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(a.jsxs)(O.a,{bg:"dark",expand:"lg",children:[Object(a.jsx)(O.a.Brand,{style:{color:"salmon"},href:"#home",children:"Movie Of The Week"}),Object(a.jsx)(O.a.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(a.jsxs)(O.a.Collapse,{id:"basic-navbar-nav",children:[Object(a.jsxs)(p.a,{className:"mr-auto",children:[Object(a.jsx)(p.a.Link,{style:{color:"white"},href:"#home",children:"Leaderboard"}),Object(a.jsx)(p.a.Link,{style:{color:"white"},href:"#home",children:"Suggestions"})]}),Object(a.jsx)(m.a,{inline:!0,children:Object(a.jsx)(x.LinkContainer,{to:"/login",children:Object(a.jsx)(g.a,{color:"blue",variant:"secondary",children:"Login"})})})]})]})}}]),n}(i.a.Component),w=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(e=t.call.apply(t,[this].concat(o))).state={isMovieSelected:!1,movieOTW:"",userOTW:"",noteOTW:"",previousMovies:[],currentPool:[],upcomingMovies:[],isLoading:!0},e.updateWatchedSort=function(t){var n=t.target.value;j()({method:"post",url:"https://movieotw.herokuapp.com/SortWatched",data:{sortBy:n}}).then((function(t){e.setState({previousMovies:t.data.movies})})).catch((function(e){window.alert("Unable to apply filter: "+e)}))},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;j()({method:"get",url:"https://movieotw.herokuapp.com/HomeData"}).then((function(t){var n=t.data.movieOTW,a=0!==n.watchOTW.length,o=t.data.watchedMovies;e.setState({previousMovies:o,isMovieSelected:a,movieOTW:n.watchOTW,userOTW:n.addedBy,noteOTW:n.note,upcomingMovies:t.data.upcomingMovies,currentPool:t.data.currentPool,isLoading:!1})})).catch((function(e){window.alert("Unable to load home data: "+e)})),this.setState({isLoading:!1})}},{key:"render",value:function(){return this.state.isLoading?Object(a.jsx)("h1",{className:"title",children:" Loading... "}):Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)(f,{}),Object(a.jsx)("h1",{className:"title",children:"Selected Movie "}),this.state.isMovieSelected?Object(a.jsxs)("div",{className:"motw-container borders",children:[Object(a.jsxs)("h1",{className:"title",children:[" ",this.state.movieOTW," "]}),Object(a.jsx)("h4",{children:" April 23, 2021 "}),Object(a.jsxs)("p",{children:[" Location: ",Object(a.jsx)("a",{style:{textDecoration:"underline"},href:"https://zoom.us/j/97457711739?pwd=Z2x3K3l5OUVTQVJmNDBkRGNqWHdjZz09",children:"Zoom Theatre"})]}),Object(a.jsxs)("p",{className:"addedBy",children:[" Added by ",this.state.userOTW," "]}),0===this.state.noteOTW.length?null:Object(a.jsxs)("p",{children:[" Teaser: ",this.state.noteOTW," "]}),Object(a.jsx)("img",{style:{height:"45%",width:"45%"},src:"https://m.media-amazon.com/images/M/MV5BY2ZlNWIxODMtN2YwZi00ZjNmLWIyN2UtZTFkYmZkNDQyNTAyXkEyXkFqcGdeQXVyODkzNTgxMDg@._V1_SX300.jpg"}),Object(a.jsxs)("div",{className:"description-container",children:[Object(a.jsx)("p",{style:{marginBottom:"-.5px"},children:" Description: "}),Object(a.jsx)("p",{children:" In \"Mortal Kombat,\" MMA fighter Cole Young, accustomed to taking a beating for money, is unaware of his heritage--or why Outworld's Emperor Shang Tsung has sent his best warrior, Sub-Zero, an otherworldly Cryomancer, to hunt Cole down. Fearing for his family's safety, Cole goes in search of Sonya Blade at the direction of Jax, a Special Forces Major who bears the same strange dragon marking Cole was born with. Soon, he finds himself at the temple of Lord Raiden, an Elder God and the protector of Earthrealm, who grants sanctuary to those who bear the mark. Here, Cole trains with experienced warriors Liu Kang, Kung Lao and rogue mercenary Kano, as he prepares to stand with Earth's greatest champions against the enemies of Outworld in a high stakes battle for the universe. But will Cole be pushed hard enough to unlock his arcana--the immense power from within his soul--in time to save not only his family, but to stop Outworld once and for all?"}),Object(a.jsx)("p",{children:" Genre: Fantasy, Action, Adventure | Runtime: 1hr 50m | Rated R"})]})]}):Object(a.jsx)("p",{style:{textAlign:"center"},children:" No movie selected yet for this week."}),Object(a.jsxs)("div",{className:"center",children:[Object(a.jsx)(b,{}),Object(a.jsx)("h1",{children:" Current Pool "}),this.state.currentPool.map((function(e,t){return Object(a.jsxs)("p",{children:[" ",e.suggestion," - ",e.name," "]},t)})),Object(a.jsx)("h1",{children:" Upcoming Movies "}),this.state.upcomingMovies.map((function(e,t){return Object(a.jsx)("div",{children:Object(a.jsxs)("p",{children:[" ",e.name," - ",e.user," "]},t)})})),Object(a.jsx)("h1",{children:" Movies Watched so Far "}),Object(a.jsx)("label",{style:{marginRight:".5vw"},children:" Sort by "}),Object(a.jsxs)("select",{name:"Name",defaultValue:"Date-Descending",onChange:this.updateWatchedSort,children:[Object(a.jsx)("option",{value:"recent",children:"Recent First"}),Object(a.jsx)("option",{value:"oldest",children:"Oldest First"}),Object(a.jsx)("option",{value:"name",children:"Movie Name"}),Object(a.jsx)("option",{disabled:!0,value:"o-rating",children:"Overall Ratings"}),Object(a.jsx)("option",{disabled:!0,value:"u-rating",children:"My Ratings"})]}),this.state.previousMovies.map((function(e,t){return Object(a.jsx)(v,{className:"watched-container",movieTitle:e.name,teaser:e.teaser,addedBy:e.addedBy,dateWatched:e.dateWatched},t)})),Object(a.jsx)("br",{})]})]})}}]),n}(i.a.Component),y=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(e=t.call.apply(t,[this].concat(o))).state={recoverPassword:!1},e}return Object(l.a)(n,[{key:"render",value:function(){var e=this;return Object(a.jsx)(a.Fragment,{children:this.state.recoverPassword?Object(a.jsxs)("div",{children:[Object(a.jsx)("h1",{children:" Password Recovery "}),Object(a.jsx)("label",{children:" Enter email to recover account: "}),Object(a.jsx)("input",{onChange:this.updateMovie}),Object(a.jsx)("button",{onClick:function(){e.setState({recoverPassword:!1})},children:" Back to Login "})]}):Object(a.jsxs)("div",{children:[Object(a.jsx)("h1",{children:" Login "}),Object(a.jsx)("label",{children:" email or username: "}),Object(a.jsx)("input",{onChange:this.updateMovie}),Object(a.jsx)("br",{}),Object(a.jsx)("label",{children:" password: "}),Object(a.jsx)("input",{onChange:this.updateMovie}),Object(a.jsx)("br",{}),Object(a.jsx)("button",{onClick:function(){window.alert("hi")},children:" Login "}),Object(a.jsx)("button",{onClick:function(){e.setState({recoverPassword:!0})},children:" Forgot Username/Password "})]})})}}]),n}(i.a.Component),S=n(19),M=n(6);n(81).config();var k=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(c.a)(this,n);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(e=t.call.apply(t,[this].concat(o))).state={},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return Object(a.jsxs)(S.BrowserRouter,{children:[Object(a.jsx)(M.d,{path:"/",exact:!0,render:function(e){return Object(a.jsx)(w,{})}}),Object(a.jsx)(M.d,{path:"/login",exact:!0,render:function(e){return Object(a.jsx)(y,{})}})]})}}]),n}(i.a.Component),N=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,91)).then((function(t){var n=t.getCLS,a=t.getFID,o=t.getFCP,i=t.getLCP,s=t.getTTFB;n(e),a(e),o(e),i(e),s(e)}))};r.a.render(Object(a.jsx)(S.BrowserRouter,{children:Object(a.jsx)(k,{})}),document.getElementById("root")),N()}},[[84,1,2]]]);
//# sourceMappingURL=main.05477ccc.chunk.js.map