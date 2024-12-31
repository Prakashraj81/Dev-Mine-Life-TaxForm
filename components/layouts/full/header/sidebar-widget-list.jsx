/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React from "react";
import Link from "next/link";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import {
  Typography,
  Box,
} from "@mui/material";

export default function SideBarWidgetList({ RecentSaveList }) {

  let url = "";

  return (
    <>
      <Box className="sidebar-widget-list">
        <Box className="sidebar-heading w-full inline-block border-b">
          <Box className="flex justify-start items-center py-3 mx-5">
            <TextSnippetOutlinedIcon style={{ width: '24px', height: '24px' }}  className="text-custom-black"/>
            <Typography component={"span"} className="pl-2 text-base lg:text-xl xl:text-xl 2xl:text-xl tracking-2 font-medium">
              最近の詳細
            </Typography>
          </Box>
        </Box>
        <Box className="sidebar-list">
          {RecentSaveList.map((lists) => {
            let divisionInfoActivity = lists.activity_description.includes('SPLIT');

            let basicInfoActivity1 = lists.activity_description.startsWith('DECEDENT_DETAILS');
            let basicInfoActivity2 = lists.activity_description.startsWith('HEIR_DETAILS');
            
            let propertyActivity1 = lists.activity_description.startsWith('PD_CASH_DEPOSIT');
            let propertyActivity2 = lists.activity_description.startsWith('PD_SECURITIES');
            let propertyActivity3 = lists.activity_description.startsWith('PD_BUILDINGS');
            let propertyActivity4 = lists.activity_description.startsWith('PD_LAND');
            let propertyActivity5 = lists.activity_description.startsWith('PD_HOUSEHOLD');
            let propertyActivity6 = lists.activity_description.startsWith('PD_DEATH_BENEFIT');
            let propertyActivity7 = lists.activity_description.startsWith('PD_DEATH_RETIREMENT');
            let propertyActivity8 = lists.activity_description.startsWith('PD_OTHER_ASSETS');
            let propertyActivity9 = lists.activity_description.startsWith('PD_DEBT');
            let propertyActivity10 = lists.activity_description.startsWith('PD_FUNERAL_EXPENSES');
            let propertyActivity11 = lists.activity_description.startsWith('PD_LIVING_DONATION');
            
            //let propertyActivity12 = lists.activity_description.startsWith('PD_GIFT_DURING_LIFE');

            let splitActivity = lists.activity_at.split('T');
            let dateParts = splitActivity[0].split('-');
            let formattedDate = `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}`;
            let formattedTime = splitActivity[1];
            
            //Basic info page
            if(basicInfoActivity1 === true){              
              url = "/basic-information";
            }
            if(basicInfoActivity2 === true){              
              url = "/basic-information";
            }

            //Property pages
            if(propertyActivity1 === true){
              url = "/declaration-printing/cash-savings";
            }
            if(propertyActivity2 === true){
              url = "/declaration-printing/securities";
            }
            if(propertyActivity3 === true){
              url = "/declaration-printing/building";
            }
            if(propertyActivity4 === true){
              url = "/declaration-printing/land";
            }
            if(propertyActivity5 === true){
              url = "/declaration-printing/household-property";
            }
            if(propertyActivity6 === true){
              url = "/declaration-printing/death-benefit";
            }
            if(propertyActivity7 === true){
              url = "/declaration-printing/death-retirement-allowance";
            }
            if(propertyActivity8 === true){
              url = "/declaration-printing/other-property";
            }
            if(propertyActivity9 === true){
              url = "/declaration-printing/debt";
            }
            if(propertyActivity10 === true){
              url = "/declaration-printing/funeral-expenses";
            }
            if(propertyActivity11 === true){
              url = "/declaration-printing/living-donation";
            }

            //Division info page
            if(divisionInfoActivity === true){              
              url = "/division-info/division-information";
            }

            return (
              <Link href={url}>
                <Box className="list-details w-full inline-block border-b cursor-pointer hover:bg-custom-light transition">
                  <Box className="mx-2 pt-2">
                    <Box className="w-full inline-block headind">
                      <Typography component={"p"} fontSize={13} color={"#000"}>
                        {lists.activity_message}
                      </Typography>
                      <Box className="flex justify-between mt-2">
                        <Typography component={"span"} fontSize={10} color={"#000"}>
                          {formattedDate}
                        </Typography>
                        <Typography component={"span"} fontSize={10} color={"#000"}>
                          {formattedTime}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Link>
            );
          })}
        </Box>
      </Box>
    </>
  );
}
