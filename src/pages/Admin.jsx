import React from 'react'                           // import React from 'react'  ini syarat untuk membuat file react
import Axios from 'axios'                           //
import {API_URL} from '../constants/API'            // link ke lembar kerja API yang didalamnya ada variable const API_URL
import "../assets/styles/admin.css"                 // link ke lembar kerja admin.css yang ada di dalam directory /assets/styles/admin.css
import {connect} from 'react-redux'                 // 
import {Redirect} from 'react-router-dom'           // untuk link atau mengalihkan dari page a ke page yang lain


class Admin extends React.Component{

    state = {
        productList:[],
        addProductName : "",
        addPrice :0,
        addProductImage: "",
        addDescription:"",
        addCategory :"",

        editId : 0, 
///////////////////////////////////////////////
////// INI ADALAH BAGIAN STATE EDIT PRODUCT ///
//////////////////////////////////////////////
        editProductName : "",
        editPrice :0,
        editProductImage: "",
        editDescription:"",
        editCategory :"",

    }
////////////////////////////////////////////
// PERTAMA KITA BUAT FUNCTION fetchProducts
// Di Axios.get tujuannya untuk mendapatkan isi dari variable API_URL  dan hanya mengambil field "products" bisa lihat di db.json
// .then dll ini untuk menampilkan ata mengirim value ke array productlist 
// .catch ini bertujuan hanya menampilkan jika function .then  atau metode yang kita gunakan salah
///////////////////////////////////////////
fetchProducts = ()=>{
    Axios.get(`${API_URL}/products`)
    .then((result)=>{
        this.setState({productList : result.data})

    })
    .catch(()=>{
        alert("Terjadi Kesalahan server")
    })
}
///////////////////////////////////////////////


///////////////////////////////////////////////
////// INI ADALAH FUNCTION UNTUK EDIT PRODUK //
//////////////////////////////////////////////


editToggle = (editData)=>{
    this.setState({
        editId : editData.id,
        editProductName : editData.productName,
        editPrice : editData.price,
        editProductImage: editData.productImage,
        editDescription: editData.description,
        editCategory :editData.category,
    })

}
///////////////////////////////////////////////


///////////////////////////////////////////////
////// INI ADALAH FUNCTION UNTUK CANCEL PRODUK//
//////////////////////////////////////////////

cancelEdit =()=>{
    this.setState({editId : 0})
}
///////////////////////////////////////////////



///////////////////////////////////////////////////////////////////////////
////// INI ADALAH FUNCTION UNTUK SAVE PRODUCT ketika selesai edit PRODUK//
/////////////////////////////////////////////////////////////////////////

saveBtnHandler = ()=>{
    Axios.patch(`${API_URL}/products/${this.state.editId}`,{
        productName : this.state.editProductName,
        price: parseInt(this.state.editPrice),
        productImage : this.state.editProductImage,
        description : this.state.editDescription,
        category : this.state.editCategory,
    })
    .then(() =>{
        this.fetchProducts()
        this.cancelEdit()
    })
    .catch(()=>{
        alert("Terjadi kesalahan diserver")
    })
}
///////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////
////// INI ADALAH FUNCTION UNTUK Delete PRODUK      /////////////////////
/////////////////////////////////////////////////////////////////////////

deleteBtnHandler =(deleteId)=>{
    const confirmDelete = window.confirm("Apa anda Yakin Delete Product?")
    if (confirmDelete){

        Axios.delete(`${API_URL}/products/${deleteId}`)
        .then(()=>{
            this.fetchProducts()
        })
        .catch(()=>{
            alert("Terjadi kesalahan di server")
        })
    }else{
        alert("Cancel delete")
    }
  
}
///////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////
////// Render untuk memberikan nilai baru dari hasil edit bedasarka ID   /////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////

renderProducts = ()=>{
    return this.state.productList.map(val =>{
        if (val.id === this.state.editId){
            return(
            <tr>
                     <td>{val.id}</td>
                     <td><input value={this.state.editProductName} onChange={this.inputHandler} type="text" name="editProductName" className="form-control" /></td>
                     <td><input value={this.state.editPrice} onChange={this.inputHandler} type="number" name="editPrice" className="form-control" /></td>
                     <td><input value={this.state.editProductImage} onChange={this.inputHandler} type="text" name="editProductImage" className="form-control" /></td>
                     <td><input value={this.state.editDescription} onChange={this.inputHandler} type="text" name="editDescription" className="form-control" /></td>
                     <td>
                            <select value={this.state.editCategory} onChange={this.inputHandler} name="editCategory" className="form-control" >
                                <option value="">All Items</option>
                                <option value="Laptop">Laptop</option>
                                <option value="Smartphone">Smartphone</option>
                                <option value="Aksesoris">Aksesoris</option>
                            </select>
                    </td>
                         <td>
                            <button onClick={this.saveBtnHandler} className="btn btn-success">Save</button>
                         </td>
                         <td>
                            <button onClick={this.cancelEdit} className="btn btn-danger">Cancel</button>
                         </td>
             </tr>
            )
        }
        return (
        <tr>
            <td>{val.id}</td>
            <td>{val.productName}</td>
            <td>{val.price}</td>
            <td><img className="admin-product-image" src={val.productImage} alt="" /></td>
            <td>{val.description}</td>
            <td>{val.category}</td>
            <td>
                <button onClick={()=> this.editToggle(val)} className="btn btn-secondary">Edit</button>
            </td>
            <td>
                <button onClick={()=> this.deleteBtnHandler(val.id)} className="btn btn-danger">Delete</button>
            </td>
        </tr>
        )
    })
}
/////////////////////////////////////////
//membuat function untuk input product
////////////////////////////////////////
inputHandler =(event)=>{
    const {name, value} = event.target
    this.setState({[name]:value})
}
///////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// membuat function untuk Add product
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
addNewProduct =()=>{                                           // 1. pertama fungsi ini untuk membuat product baru
    Axios.post(`${API_URL}/products`,{
        productName : this.state.addProductName,
        price: parseInt(this.state.addPrice),
        productImage : this.state.addProductImage,
        description : this.state.addDescription,
        category : this.state.addCategory,
    })
// 
    .then(()=>{                                                 // 2. kedua .then itu untuk nge refresh menampilkan semua product yang ada di fetchproduct
        this.fetchProducts()
        this.setState({
            productList:[],
            addProductName : "",
            addPrice :0,
            addProductImage: "",
            addDescription:"",
            addCategory :"",
    
        })                                    
    })
    .catch(()=>{                                                // 3. ini hanya opsional apabila ada kesalahan saat melakukan proses input baru
        alert("Terjadi kesalahan di server")
    })
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////
//ComponentDidMount berfungsi mengembalikan semua value dari isi variable fetchProducts
/////////////////////////////////////////////////////////////////////////////////////////

componentDidMount(){
    this.fetchProducts()
}
/////////////////////////////////////////////////////////////////////////////////////////




    render(){
        if (this.props.userGlobal.role !== "admin"){
            return <Redirect to="/" />
        }
        return(
            <div className="p-5">
                <div className="row">
                    <div className="col-12 text-center">
                        <h1> Manage Products</h1>
                        <table className="table mt-4">
                            <thead className="thead-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Image</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th colSpan="2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                    {this.renderProducts()}
                                </tbody>   
                                <tfoot className="bg-light">
                                    <tr>
                                        <td></td>
                                        <td>
                                            <input value={this.state.addProductName} onChange={this.inputHandler} name="addProductName" type="text" className="form-control" />
                                        </td>
                                        <td>
                                            <input value={this.state.addPrice} onChange={this.inputHandler} name="addPrice" type="number" className="form-control" />
                                        </td>
                                        <td>
                                            <input value={this.state.addProductImage} onChange={this.inputHandler} name="addProductImage" type="text" className="form-control" />
                                        </td>
                                        <td>
                                            <input value={this.state.addDescription} onChange={this.inputHandler} name="addDescription" type="text" className="form-control" />
                                        </td>
                                        <td>
                                            <select onChange={this.inputHandler} name="addCategory" className="form-control" >
                                                <option value="">All Items</option>
                                                <option value="Laptop">Laptop</option>
                                                <option value="Smartphone">Smartphone</option>
                                                <option value="Aksesoris">Aksesoris</option>
                                            </select>
                                        </td>
                                        <td colSpan="2">
                                            <button onClick={this.addNewProduct} className="btn btn-info">Add Product</button>
                                        </td>
                                    </tr>
                              </tfoot>                         
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps= state =>{
    return{
        userGlobal : state.user
    }
}
export default connect(mapStateToProps)(Admin)