import React from 'react'
import ProductCard from "../components/ProductCard"
import Axios from 'axios'
import {API_URL} from '../constants/API'

class Home extends React.Component{
    state={
        productList:[],
        page: 1,
        maxPage:0,
        itemPerPage:5,
    }
    fetchProducts = ()=>{
        Axios.get(`${API_URL}/products`)
        .then((result)=>{
            this.setState({productList: result.data, maxPage: Math.ceil(result.data.length / this.state.itemPerPage)})
        })
        .catch(()=>{
            alert("Terjadi Kesalahan di server")
        })
    }


    renderProducts = ()=>{
        const beginningIndex = (this.state.page - 1) * this.state.itemPerPage
        const currentData = this.state.productList.slice(beginningIndex, beginningIndex+this.state.itemPerPage)

        return currentData.map((val)=>{
            return <ProductCard productData={val} />
        })
    }
    componentDidMount(){
        this.fetchProducts()
    }

    nextPageHandler=()=>{
        if(this.state.page < this.state.maxPage){
            this.setState({page: this.state.page +1})
        }
    }

    prevPageHandler =()=>{
        if(this.state.page >1){
            this.setState({page: this.state.page -1})
        }
    }

    
    render(){
        return(
            <div className="container mt-5">
                <div className="row">
                    <div className="col-3">
                        <div className="card">
                            <div className="card-header">
                                <strong>Filter Product</strong>
                            </div>
                            <div className="card-body">
                                <label htmlFor="searchProductName">Product Name</label>
                                <input
                                name="searchProductName"
                                type="text"
                                className="form-control mb-3"
                                />
                                <label htmlFor="searchCategory">Product Category</label>
                                <select name="searchCategory" className="form-control">
                                    <option value="">All Items</option> 
                                    <option value="">Macbook</option> 
                                    <option value="">Iphone</option> 
                                    <option value="">Aksesoris</option> 
                                </select>
                            </div>
                        </div>
                        <div className="card mt-4">
                            <div className="card-header">
                                <strong>Sort Product</strong>
                            </div>
                            <div className="card-body">
                                <label htmlFor="searchProductName">Product Name</label>
                                <input
                                name="searchProductName"
                                type="text"
                                className="form-control mb-3"
                                />
                                <label htmlFor="searchCategory">Sort by</label>
                                <select name="searchCategory" className="form-control">
                                    <option value="">Default</option> 
                                    <option value="">Lowest Price</option> 
                                    <option value="">Highest</option> 
                                    <option value="">A-Z</option> 
                                    <option value="">Z-A</option> 
                                </select>
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="d-flex flex-row justify-content-between align-items-center">
                                <button onClick={this.prevPageHandler} className="btn btn-dark">
                                    {"<"}
                                </button>
                                <div className="text-center">Page {this.state.page} of {this.state.maxPage}</div>
                                <button onClick={this.nextPageHandler} className="btn btn-dark">
                                    {">"}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="d-flex flex-wrap flex-row">
                            {/* Render Products here */}
                            {this.renderProducts()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home