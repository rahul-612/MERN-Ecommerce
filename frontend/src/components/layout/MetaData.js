import React from 'react'
import Helmet from 'react-helmet';

// yani jo bhi page me isko import krege to ye us page ka title dikha dega
const MetaData = ({title}) => {
  return (
   <Helmet>
       <title>{title}</title>
   </Helmet>
  )
}

export default MetaData