import React, { useEffect, useRef, useState } from 'react'
import Table_skeleton from '../utils/Table_skeleton';
import {Pagination , Select , Listbox , Button ,SkeletonTabs,Page, Card, DataTable,TextField} from '@shopify/polaris';

import '../App.css'
import Content_Table from '../utils/Content_Table';

const Dashboard = () => {
    const [page , setPage] = useState(1)
    const [itemPerPage , setItemPerPage] = useState(10)
    const [data , setData] = useState([])
    const total = useRef(0)
    const [isLoading , setIsLoading] = useState(false)
    const [isLoading1 , setIsLoading1] = useState(false)

    var option = {
        headers : {'Authorization' : sessionStorage.getItem('user')}
    }

    console.log(data)

    const searchData = (str)=>{
        setIsLoading1(true)
        fetch(str , option).then(res=>res.json()).then(res => {
            console.log(res)
            total.current = res.data.count;
            let main = push_data(res.data.rows)
            setData([...main])
            setIsLoading1(false)
        })
    }

    const push_data = (arr)=>{
        let main = []
        arr.map(item => {
            let t = []
            t.push(item.user_id)
            t.push(item.catalog)
            t.push(item.username)
            t.push(item.email)
            t.push(item.shopify_plan)
            t.push(item.updated_at)
            t.push(item.created_at)
            t.push(item.shop_url)
            main.push(t)
        })
        return main
    }
   

    useEffect(()=>{
        setIsLoading(true)
        fetch(`https://fbapi.sellernext.com/frontend/admin/getAllUsers?activePage=${page}&count=${itemPerPage}` , option )
        .then(res => res.json())
        .then(res => {
            // console.log(res)
            total.current = res.data.count;
            let main = push_data(res.data.rows)
            setIsLoading(false)
            setData([...main])
        })
    },[page , itemPerPage])

    return (
        <div className='dashBoard'>
            <div className='sidebar'>
                <Listbox accessibilityLabel="Basic Listbox example">
                    <Listbox.Option value="UniqueValue-1">Item 1</Listbox.Option>
                    <Listbox.Option value="UniqueValue-2">Item 2</Listbox.Option>
                    <Listbox.Option value="UniqueValue-3">Item 3</Listbox.Option>
                </Listbox>
            </div>
            <div className='main-page'>
                <div className='heading'>
                    <h1>Data Grid.....</h1>
                    <h1>Showing From {((page-1)*itemPerPage)+1} to {page*itemPerPage} From {total.current} User</h1>
                </div>
                <div className='page-header'>
                    <Pagination
                        label={page}
                        hasPrevious
                        onPrevious={() => {
                            page!== 1 && setPage(page => page-1)
                        }}
                        hasNext
                        onNext={() => {
                            let tt = (page+1)*itemPerPage;
                            if(Number(tt) <= Number(total.current)){
                                console.log('changed')
                                setPage(page => page+1)
                            }
                        }}
                    />
                    <Select 
                        options={[{label : '10' , value : '10'} , {label : '20' , value : '20'} , {label : '30' , value : '30'}]}
                        onChange = {(d)=>{
                            let t = Math.ceil((((page-1)*itemPerPage)+1)/d)
                            // console.log(Math.ceil((((page-1)*itemPerPage)+1)/d))
                            setPage(t)
                            setItemPerPage(d)
                        }}
                        label='rows per page'
                        labelInline
                        value={itemPerPage}
                    />
                    <Button>
                        View Columns
                    </Button>
                </div>

                {
                    isLoading === true ?  
                    <Table_skeleton />
                    :
                    <Content_Table data={data} searchData = {searchData} isLoading={isLoading1}/>
                }
                
            </div>
        </div>
    )
}

export default Dashboard