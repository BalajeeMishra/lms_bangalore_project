import React  from 'react'
import FacLayout from './faculty';
import VidRecordings from '../src/components/VidRecordings';

const ViewRecordings = () => {
 
  return (
    <FacLayout>
      <p className='title-db'>HOME / View Recording Class</p>
      <hr />
      <div className="container">
        <div className="">
           <VidRecordings/>
        </div>
      </div>
    </FacLayout>
  )
}

export default ViewRecordings;