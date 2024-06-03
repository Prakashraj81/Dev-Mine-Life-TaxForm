import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import {
  Typography,
  Box,  
  Chip,
  Button,  
} from "@mui/material";

export default function SideBarWidgetList() {
  let [RecentSaveList, setRecentSaveList] = useState([]);

useEffect(() => {        
    GetRecentSaveList();
}, []);


//Load users list
const GetRecentSaveList = async()=>{
    let auth_key = atob(sessionStorage.getItem("auth_key"));
    const params = { auth_key: auth_key };
    if(auth_key !== null){
        try{
            const response = await axios.get('https://minelife-api.azurewebsites.net/get_user_activities', {params});
            if(response.status === 200){
              setRecentSaveList(response.data.user_actrivities_details);
            }
            else{
              setRecentSaveList([]);
            }
        }catch(error){
            console.log("Errro", error);
        }
    }        
}
  return (
    <>
      <div className="sidebar-widget-list">
        <div className="sidebar-heading border-b">
          <div className="flex justify-start items-center py-5 mx-5">
            <TextSnippetOutlinedIcon />
            <span className="pl-2 text-base lg:text-xl xl:text-xl 2xl:text-xl tracking-2 font-medium">
              最近の詳細
            </span>
          </div>
        </div>
        <div className="sidebar-list">
        {RecentSaveList.map((lists, index) => {                            
          return (          
            <Box className="list-details w-full inline-block border-b">
              <Box className="mx-5 py-3">
                <div className="w-full inline-block heading">
                  <Typography component={"h5"} className="text-sm text-black lg:text-base xl:text-base 2xl:text-base tracking-2 font-bold">
                    {lists.activity_description}
                  </Typography>
                </div>
                <div className="w-full mt-2 inline-block heading">
                  <Typography component={"p"} className="text-sm text-black tracking-2 font-medium leading-7">
                    {lists.activity_message}
                  </Typography>
                </div>
              </Box>
          </Box>   
          );   
          })}    
        </div>
      </div>
    </>
  );
}
