import React from "react";
import {render} from "react-dom";
import $ from "jquery";
class App extends React.Component {
    constructor(props){
        super(props);
        this.state={
            dataSource: [],
            rawData:{},
            searchText:'',
            refreshing:false,
            updateTime:'',
            value:0,
            active: false,
            searchData:[]};
        this.filterSearch = this.filterSearch.bind(this)
    }
    getNotes() {
        return fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json())
    }
    componentDidMount() {
        this.fetchData();
    }
    fetchData() {
        this.setState({refreshing: true});
        this.getNotes()
            .then((data) => {
                this.setState({
                    dataSource: data,
                    isLoading: false,
                    empty: false,
                    rawData: data,
                    searchData:data,
                    refreshing:false,
                    updateTime : new Date().toLocaleString()
                });
            })
            .catch((error) => {
            });
    }
    showList(){
        const listView = this.state.dataSource.map((data)=>{
                return(
                    <div key={data.id} className="list-group-item list-group-item-action flex-column align-items-start" style={{cursor:'pointer'}}>
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">UserId: {data.userId}</h5>
                            <small>{data.id}</small>
                        </div>
                        <p className="mb-1">Title: {data.title}</p>
                        <small>Body: {data.body}</small>
                    </div>
                );
            }
        );
        return(listView);
    }
    filterSearch(event){
        let data = this.state.rawData;
        const newData = data.filter((item)=>{
            return item.body.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        this.setState({
            searchData:newData,
            dataSource:newData
        });
    }
    listSortTitle(){
        let data = this.state.searchData;
        const newData = data.sort((a, b)=>{
            if (a.title > b.title)
                return 1;
            if (a.title < b.title)
                return -1;
            return 0;
        });
        this.setState({
            dataSource:newData
        });
    }
    listSortId(){
        let data = this.state.searchData;
        const newData = data.sort((a, b)=>{
            if (a.id > b.id)
                return 1;
            if (a.id < b.id)
                return -1;
            return 0;
        });
        this.setState({
            dataSource:newData
        });
    }
    render() {
        return (
            <div className="container">
                <div className="row w-75 p-3 justify-content-center mx-auto">
                    <nav className="nav" style={{margin:15}}>
                        <form className="form-inline">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search"
                                   onChange={this.filterSearch}
                            />
                                <button className="btn btn-success my-2 my-sm-0" style={{margin:15}}
                                        type="button" onClick={()=>this.listSortTitle()}>Sort Title</button>
                                <button className="btn btn-success my-2 my-sm-0" style={{margin:15}}
                                        type="button" onClick={()=>this.listSortId()}>Sort Id</button>
                                <button className="btn btn-success my-2 my-sm-0" style={{margin:15}}
                                        type="button" onClick={()=>this.fetchData()}>Refresh</button>
                        </form>
                    </nav>
                        {this.showList()}
                </div>
            </div>
        );
    }
}

render(<App/>, window.document.getElementById("app"));