(this.webpackJsonpmovie=this.webpackJsonpmovie||[]).push([[0],{34:function(e,t,n){},54:function(e,t,n){},72:function(e,t,n){},73:function(e,t,n){},84:function(e,t,n){"use strict";n.r(t);var i=n(1),a=n(0),o=n.n(a),s=n(20),c=n.n(s),r=(n(54),n(10)),l=n(11),d=n(13),h=n(12),j=(n(34),n(21)),u=n.n(j),b=(n(72),function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(r.a)(this,n);for(var i=arguments.length,a=new Array(i),o=0;o<i;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))).state={movieSuggestion:"",user:"",movieNote:""},e.submitSuggestion=function(){if(0!==e.state.movieSuggestion.length)if(0!==e.state.user.length){var t=e.state.movieSuggestion,n=e.state.user;u()({method:"post",url:"https://movieotw.herokuapp.com/SuggestMovie",data:{movie:t,name:n,movieNote:e.state.movieNote}}).then((function(t){t.data.success?(e.setState({movieSuggestion:"",movieNote:""}),window.alert("Successfully added "+t.data.val+".\nMovie ID: "+t.data.movieIdx)):window.alert(t.data.val)})).catch((function(e){console.log(e)}))}else window.alert("User not selected.");else window.alert("Movie name cannot be empty.")},e.updateMovie=function(t){e.setState({movieSuggestion:t.target.value})},e.updateUser=function(t){e.setState({user:t.target.value})},e.updateNote=function(t){e.setState({movieNote:t.target.value})},e.showReviewForm=function(){window.alert("clicked")},e}return Object(l.a)(n,[{key:"render",value:function(){return Object(i.jsxs)("div",{children:[Object(i.jsx)("h1",{children:" Suggest a Movie "}),Object(i.jsx)("label",{children:" Title: "}),Object(i.jsx)("input",{value:this.state.movieSuggestion,onChange:this.updateMovie}),Object(i.jsx)("br",{}),Object(i.jsx)("label",{children:" Suggested By: "}),Object(i.jsxs)("select",{name:"Name",defaultValue:"Choose here",onChange:this.updateUser,children:[Object(i.jsx)("option",{value:"Choose here",disabled:!0,hidden:!0,children:"Choose here"}),Object(i.jsx)("option",{value:"Felix",children:"Felix"}),Object(i.jsx)("option",{value:"Hector",children:"Hector"}),Object(i.jsx)("option",{value:"Jason",children:"Jason"}),Object(i.jsx)("option",{value:"Jesse",children:"Jesse"}),Object(i.jsx)("option",{value:"Jorge",children:"Jorge"}),Object(i.jsx)("option",{value:"Juan",children:"Juan"}),Object(i.jsx)("option",{value:"Octavio",children:"Octavio"})]}),Object(i.jsx)("br",{}),Object(i.jsx)("label",{children:" Teaser Note (optional): "}),Object(i.jsx)("textarea",{value:this.state.movieNote,onChange:this.updateNote}),Object(i.jsx)("br",{}),Object(i.jsx)("button",{onClick:this.submitSuggestion,children:" Suggest "})]})}}]),n}(o.a.Component)),v=(n(73),function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(r.a)(this,n);for(var i=arguments.length,a=new Array(i),o=0;o<i;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))).state={displayReviewForm:!1,reviewSubmitted:!1,reviewScoreInput:-1,finalReviewScore:-1,user:""},e.displayReviewForm=function(){e.setState({displayReviewForm:!0})},e.cancelReview=function(){e.setState({displayReviewForm:!1})},e.updateReviewScore=function(t){e.setState({reviewScore:t.target.value})},e.updateUser=function(t){e.setState({user:t.target.value})},e.submitReview=function(){try{var t=parseFloat(e.state.reviewScore);window.alert(t)}catch(n){return void window.alert("Error")}e.setState({reviewSubmitted:!0})},e}return Object(l.a)(n,[{key:"render",value:function(){return Object(i.jsxs)("div",{className:"container",children:[Object(i.jsxs)("p",{children:[" Movie title: ",this.props.movieTitle," "]}),Object(i.jsxs)("p",{children:[" Suggested by: ",this.props.addedBy," "]}),Object(i.jsxs)("p",{children:[" Watched on: ",this.props.dateWatched," "]}),Object(i.jsxs)("p",{children:[" Teaser Note: ",this.props.teaser," "]})]})}}]),n}(o.a.Component)),O=n(88),p=n(90),m=n(89),g=n(87),x=n(45),f=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(i.jsxs)(O.a,{bg:"dark",expand:"lg",children:[Object(i.jsx)(O.a.Brand,{style:{color:"salmon"},href:"#home",children:"Movie Of The Week"}),Object(i.jsx)(O.a.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(i.jsxs)(O.a.Collapse,{id:"basic-navbar-nav",children:[Object(i.jsxs)(p.a,{className:"mr-auto",children:[Object(i.jsx)(p.a.Link,{style:{color:"white"},href:"#home",children:"Leaderboard"}),Object(i.jsx)(p.a.Link,{style:{color:"white"},href:"#home",children:"Suggestions"})]}),Object(i.jsx)(m.a,{inline:!0,children:Object(i.jsx)(x.LinkContainer,{to:"/login",children:Object(i.jsx)(g.a,{color:"blue",variant:"secondary",children:"Login"})})})]})]})}}]),n}(o.a.Component),w=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(r.a)(this,n);for(var i=arguments.length,a=new Array(i),o=0;o<i;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))).state={isMovieSelected:!1,movieOTW:"",userOTW:"",noteOTW:"",previousMovies:[],currentPool:[],upcomingMovies:[],isLoading:!0},e.updateWatchedSort=function(t){var n=t.target.value;u()({method:"post",url:"https://movieotw.herokuapp.com/SortWatched",data:{sortBy:n}}).then((function(t){e.setState({previousMovies:t.data.movies})})).catch((function(e){window.alert("Unable to apply filter: "+e)}))},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;u()({method:"get",url:"https://movieotw.herokuapp.com/HomeData"}).then((function(t){var n=t.data.movieOTW,i=0!==n.watchOTW.length,a=t.data.watchedMovies;e.setState({previousMovies:a,isMovieSelected:i,movieOTW:n.watchOTW,userOTW:n.addedBy,noteOTW:n.note,upcomingMovies:t.data.upcomingMovies,currentPool:t.data.currentPool,isLoading:!1})})).catch((function(e){window.alert("Unable to load home data: "+e)})),this.setState({isLoading:!1})}},{key:"render",value:function(){return this.state.isLoading?Object(i.jsx)("h1",{style:{textAlign:"center"},children:" Loading... "}):Object(i.jsxs)("div",{className:"App",children:[Object(i.jsx)(f,{}),this.state.isMovieSelected?Object(i.jsxs)("div",{className:"motw-container borders",children:[Object(i.jsxs)("h1",{className:"title",children:[" ",this.state.movieOTW," "]}),Object(i.jsx)("h4",{children:" February 19, 2021"}),Object(i.jsxs)("p",{children:[" Location: ",Object(i.jsx)("a",{href:"https://zoom.us/j/97457711739?pwd=Z2x3K3l5OUVTQVJmNDBkRGNqWHdjZz09",children:"Zoom Theatre"})]}),Object(i.jsxs)("p",{className:"addedBy",children:[" Added by ",this.state.userOTW," "]}),0===this.state.noteOTW.length?null:Object(i.jsxs)("p",{children:[" Teaser: ",this.state.noteOTW," "]}),Object(i.jsx)("img",{style:{height:"45%",width:"45%"},src:"https://m.media-amazon.com/images/M/MV5BZWFlYmY2MGEtZjVkYS00YzU4LTg0YjQtYzY1ZGE3NTA5NGQxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"}),Object(i.jsxs)("div",{className:"description-container",children:[Object(i.jsx)("p",{style:{marginBottom:"-.5px"},children:" Description: "}),Object(i.jsx)("p",{children:" Jack Torrance (Jack Nicholson) becomes winter caretaker at the isolated Overlook Hotel in Colorado, hoping to cure his writer's block. He settles in along with his wife, Wendy (Shelley Duvall), and his son, Danny (Danny Lloyd), who is plagued by psychic premonitions. As Jack's writing goes nowhere and Danny's visions become more disturbing, Jack discovers the hotel's dark secrets and begins to unravel into a homicidal maniac hell-bent on terrorizing his family. "})]})]}):Object(i.jsx)("p",{children:" No movie selected yet for this week."}),Object(i.jsxs)("div",{className:"center",children:[Object(i.jsx)(b,{}),Object(i.jsx)("h1",{children:" Current Pool "}),this.state.currentPool.map((function(e,t){return Object(i.jsxs)("p",{children:[" ",e.suggestion," - ",e.name," "]},t)})),Object(i.jsx)("h1",{children:" Movies Watched so Far "}),Object(i.jsx)("label",{style:{marginRight:".5vw"},children:" Sort by "}),Object(i.jsxs)("select",{name:"Name",defaultValue:"Date-Descending",onChange:this.updateWatchedSort,children:[Object(i.jsx)("option",{value:"recent",children:"Recent First"}),Object(i.jsx)("option",{value:"oldest",children:"Oldest First"}),Object(i.jsx)("option",{value:"name",children:"Movie Name"}),Object(i.jsx)("option",{disabled:!0,value:"o-rating",children:"Overall Ratings"}),Object(i.jsx)("option",{disabled:!0,value:"u-rating",children:"My Ratings"})]}),this.state.previousMovies.map((function(e,t){return Object(i.jsx)(v,{className:"watched-container",movieTitle:e.name,teaser:e.teaser,addedBy:e.addedBy,dateWatched:e.dateWatched},t)})),Object(i.jsx)("br",{}),Object(i.jsx)("h1",{children:" Upcoming Movies "}),this.state.upcomingMovies.map((function(e,t){return Object(i.jsx)("div",{children:Object(i.jsxs)("p",{children:[" ",e.name," - ",e.user," "]},t)})})),Object(i.jsx)("br",{})]})]})}}]),n}(o.a.Component),y=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(r.a)(this,n);for(var i=arguments.length,a=new Array(i),o=0;o<i;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))).state={recoverPassword:!1},e}return Object(l.a)(n,[{key:"render",value:function(){var e=this;return Object(i.jsx)(i.Fragment,{children:this.state.recoverPassword?Object(i.jsxs)("div",{children:[Object(i.jsx)("h1",{children:" Password Recovery "}),Object(i.jsx)("label",{children:" Enter email to recover account: "}),Object(i.jsx)("input",{onChange:this.updateMovie}),Object(i.jsx)("button",{onClick:function(){e.setState({recoverPassword:!1})},children:" Back to Login "})]}):Object(i.jsxs)("div",{children:[Object(i.jsx)("h1",{children:" Login "}),Object(i.jsx)("label",{children:" email or username: "}),Object(i.jsx)("input",{onChange:this.updateMovie}),Object(i.jsx)("br",{}),Object(i.jsx)("label",{children:" password: "}),Object(i.jsx)("input",{onChange:this.updateMovie}),Object(i.jsx)("br",{}),Object(i.jsx)("button",{onClick:function(){window.alert("hi")},children:" Login "}),Object(i.jsx)("button",{onClick:function(){e.setState({recoverPassword:!0})},children:" Forgot Username/Password "})]})})}}]),n}(o.a.Component),S=n(19),k=n(6);n(81).config();var M=function(e){Object(d.a)(n,e);var t=Object(h.a)(n);function n(){var e;Object(r.a)(this,n);for(var i=arguments.length,a=new Array(i),o=0;o<i;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))).state={},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return Object(i.jsxs)(S.BrowserRouter,{children:[Object(i.jsx)(k.d,{path:"/",exact:!0,render:function(e){return Object(i.jsx)(w,{})}}),Object(i.jsx)(k.d,{path:"/login",exact:!0,render:function(e){return Object(i.jsx)(y,{})}})]})}}]),n}(o.a.Component),N=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,91)).then((function(t){var n=t.getCLS,i=t.getFID,a=t.getFCP,o=t.getLCP,s=t.getTTFB;n(e),i(e),a(e),o(e),s(e)}))};c.a.render(Object(i.jsx)(S.BrowserRouter,{children:Object(i.jsx)(M,{})}),document.getElementById("root")),N()}},[[84,1,2]]]);
//# sourceMappingURL=main.1b151400.chunk.js.map