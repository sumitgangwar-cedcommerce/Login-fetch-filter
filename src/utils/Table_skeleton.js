import React from 'react'
import { SkeletonTabs , SkeletonPage , Card} from '@shopify/polaris';

const Table_skeleton = () => {

  return (
    <SkeletonPage>
     
            {
                Array(7).fill(1).map((item , i) =>
                    <Card key={i}>
                        <SkeletonTabs count={7}/>
                    </Card>)
            }  
        
    </SkeletonPage> 
  )
}

export default Table_skeleton