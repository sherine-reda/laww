import i18next from 'i18next'
import React from 'react'

function Footer() {
  return <>
  <footer className=' p-5 my-5'>
  <h2 className="title py-5 mb-5"> {i18next.t('Businesspartners')} </h2>
   <div className="container mt-5 pt-5 ">
    <div className="row gy-5 justify-content-center">
        <div className="col-md-3">
            <div className="item text-center">
                <img src={require('../../Assets/footer1.png')} alt="" className='w-75'/>
            </div>
        </div>
        <div className="col-md-3">
            <div className="item text-center">
                <img src={require('../../Assets/footer2.png')} alt="" className='w-75'/>
            </div>
        </div>
        <div className="col-md-3">
            <div className="item text-center">
                <img src={require('../../Assets/footer3.png')} alt="" className='w-75'/>
            </div>
        </div>
        <div className="col-md-3">
            <div className="item text-center">
                <img src={require('../../Assets/footer4.png')} alt="" className='w-75'/>
            </div>
        </div>
    </div>
   </div>
  </footer>
  </>
}

export default Footer