import React from "react"
import"../assets/styles/product_card.css"


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
                        <h6>{this.props.productData.productName}</h6>
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