import React from "react"
import"../assets/styles/product_card.css"
import {Link} from 'react-router-dom'


class ProductCard extends React.Component{


    render(){
        return(
            <div className="card product-card">
                <img
                src={this.props.productData.productImage}
                alt=""
                />
                <div className="mt-2">
                    <div>
                        {/*  
                        localhost:3000/product-detail/{id.barang} 
                        */}
                      <Link to="/product-detail" style={{textDecoration: "none", color: "inherit"}}>
                      <h6>{this.props.productData.productName}</h6>
                      </Link>
                        <span className="test-muted">Rp. {this.props.productData.price}</span>
                    </div>
                    <div className="d-flex flex-row justify-content-end">
                        <button className="btn btn-primary">Add to cart</button>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProductCard