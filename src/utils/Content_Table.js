import React, { useEffect, useMemo, useRef, useState } from 'react'
import {Page, Card, DataTable, Select, TextField, SkeletonPage, SkeletonTabs} from '@shopify/polaris';
import Table_skeleton from './Table_skeleton';
const Content_Table = ({data , searchData , isLoading}) => {
    const label = [
        { label: "Equals", value: "1" },
        { label: "Not Equals", value: "2" },
        { label: "Contains", value: "3" },
        { label: "Does Not Contains", value: "4" },
        { label: "Starts With", value: "5" },
        { label: "Ends With", value: "6" },
    ];
    const [selectArr , SetSelectArray] = useState(Array(8).fill('1'))
    const [inputArr , setInputArr] = useState(Array(8).fill(''))
    const headingArr = [
        'user_id',
        'catalog',
        'username',
        'shops.email',
        'shopify_plan',
        'updated_at',
        'created_at',
        'shop_url'
    ]

    var timer = useRef()



    const myFun = ()=>{
        clearTimeout(timer.current)
        timer.current = setTimeout(fetchData , 2000)
    }

    const fetchData = ()=>{
        let t = 0
        console.log('dataFetch')
        let str = 'https://fbapi.sellernext.com/frontend/admin/getAllUsers?activePage=1&count=10'
        inputArr.map((item , i)=>{
            if(item!==''){
                t = 1
                str+=`&filter[${headingArr[i]}][${selectArr[i]}]=${item}`
            }
        })
        console.log(str)
        if(t)   searchData(str)
    }



    


    const sel = 

        Array(8).fill(0).map((item , i)=>
            <><Select
                        options={label}
                        onChange = {(d)=>{
                            myFun()
                            selectArr[Number(i)] = d
                            SetSelectArray([...selectArr])
                        }}
                        value={selectArr[Number(i)]}
                    />
             <TextField
                            placeholder={headingArr[i]}
                            value={inputArr[i]}
                            onChange={(d)=>{
                                myFun()
                                inputArr[i] = d
                                setInputArr([...inputArr]) 
                            }}
                        /></>
        )
        


    
  return (
    <>
    {
        isLoading === true ?  
        <>
        <Page>
            <Card>
                <DataTable
                columnContentTypes={[
                    'numeric',
                    'text',
                    'text',
                    'text',
                    'text',
                    'text',
                    'text',
                    'text'
                ]}
                headings={headingArr}
                rows={[sel , [Array(7).fill(1).map((item , i) => <SkeletonTabs count={7}/>)]]}
                />
            </Card>
        </Page>
        </>
        :
        <Page>
            <Card>
                <DataTable
                columnContentTypes={[
                    'numeric',
                    'text',
                    'text',
                    'text',
                    'text',
                    'text',
                    'text',
                    'text'
                ]}
                headings={headingArr}
                rows={[sel,...data]}
                />
            </Card>
        </Page>
    }

    
    </>
  )
}

export default Content_Table