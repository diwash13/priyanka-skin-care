import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';

class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
          service: {}  
        }
    }

    componentDidMount() {
        axios.get(`/api/service/${this.props.match.params.id}`).then(res => {
            this.setState({
                service: res.data
            })
        })
    }

    addToCart = (service_id) => {
        if (this.props.username) {
        axios.post(`/api/cart`,{ service_id:service_id}).then(toast.success('Successfully Added to the Cart'))
        
        } else {
            this.props.history.push('/dashboard')
        }
    }
    

    render() {
        const { service } = this.state
        return (
            
            <div className='detail-div'>
               <div>
                    <h3 style={{fontFamily:'cursive', color:'grey', fontWeight:'bold', marginTop:15}}>{service.service}</h3>
               </div> 
               <div className='service-div'>
                   <div className='detail-img-div'>
                        <img className='detail-img' src={`${service.img}`} alt='service'/>
                   </div>
                   <div className='info-div'>{service.info}</div>
               </div>
               <div className='bottom-div'>
                   <div className='price-div'>
                       <h4>${service.price}</h4>
                    </div>
                   <div className='btn-div'>
                        <button className='back-btn' onClick={() => this.addToCart(service.service_id)}>Add to Cart</button>
                        <button className='back-btn' onClick={() => this.props.history.goBack()}>Back To Services</button>
                   </div>
               </div>
               <Link to={'/cart'}>
               <ToastContainer style={{fontSize: 20}} />
               </Link>
            </div>
        )
    }
}
const mapStateToProps = reduxState => {
    return reduxState
}

export default connect(mapStateToProps) (Detail)