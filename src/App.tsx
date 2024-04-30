import { useState, useEffect} from 'react'
import './App.css'

function App() {

const elemPerPage:number = 10
let dataRecieved = false;

const [posts, setPosts]  = useState([])
const [curPage, setCurentPage] = useState(0)
const [countPages,setCountPages] = useState(0)

useEffect(()=>{
	getData();
	return () => {
		dataRecieved = true;
	};
},[])

function getData() {
	if(!dataRecieved){
		fetch(`https://jsonplaceholder.typicode.com/posts?_limit=21`)
		.then((response) => response.json())
		.then((data) => {
			setPosts(data)
			setCountPages(Math.ceil(data.length/elemPerPage));
		})
	}
}

function handlerSetCurPage(e:any):void {
	setCurentPage(Number(e.target.value))
}

function handlerNextPage():void{
	setCurentPage(curPage + 1)
}
function handlerPrevPage():void{
	setCurentPage(curPage - 1)
}

return (
	<div className="app">
		<header><h1>API Posts</h1></header>
			<div className='list-container'>
				<ul>
					{
						posts.slice(curPage*elemPerPage,(curPage*elemPerPage)+elemPerPage).map(({ id, title,body }) => (
						<li key={id}>
							<h3><strong>{String(title).toUpperCase()}</strong></h3>
							<p className='post-text'>{body}</p>
						</li>
						))}
				</ul>
			</div>
			
				{ countPages !==1 && 
				<div className='pagination-buttons'>
					{
						curPage > 0 && <div><button onClick={handlerPrevPage} >{'<-'}</button></div>
					}
					{		
						[...Array(countPages).keys()].map((num) => (
						<div key={num}>
							<button onClick={handlerSetCurPage} className={num === curPage ? 'active' : ''} value={num}>{num+1}</button>
						</div>
						))
					}
					{
						curPage < countPages-1 && <button onClick={handlerNextPage} >{'->'}</button>
					}
				</div>
				}
	</div>
	);
}

export default App