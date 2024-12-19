"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import { List, ListItem, ListItemText, ListItemIcon, Divider, Box, Stepper, Step, StepLabel, StepButton, Button, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import BackButton from "../../../components/back-btn";
import SubmitButton from "../../../components/submit-btn";
import HeirListBox from "../../../components/heir-list-box/heir-list-box";
import IncorrectError from "../../../components/heir-list-box/incorrect-error";
import FullLayout from '../../../components/layouts/full/FullLayout';
import PostcodeIcon from "../../../components/inputbox-icon/textbox-postcode-icon";
import BackdropLoader from '../../../components/loader/backdrop-loader';
import FloorIcon from "../../../components/inputbox-icon/textbox-floor-icon";
import AreaIcon from "../../../components/inputbox-icon/textbox-area-icon";
import JapaneseCalendar from "../../../components/inputbox-icon/japanese-calender";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { set } from "date-fns";

export default function HouseAdd() {
    const [isSumbitDisabled, setisSumbitDisabled] = useState(false);
    const [ShowLoader, setShowLoader] = useState(false);

    const [is_room_in_condominium, setis_room_in_condominium] = useState(null);
    const [is_co_owners_in_property, setis_co_owners_in_property] = useState(null);
    const [is_property_tax_building_with_3_or_more_floors, setis_property_tax_building_with_3_or_more_floors] = useState(null);

    const [location, setlocation] = useState("");
    const [building_name, setbuilding_name] = useState("");
    const [structure_1, setstructure_1] = useState("");
    const [floor_area, setfloor_area] = useState("");
    const [location_and_lot_number, setlocation_and_lot_number] = useState("");
    const [ground_grain, setground_grain] = useState("");
    const [land_area, setland_area] = useState("");
    const [land_use, setland_use] = useState("");
    const [house_number, sethouse_number] = useState("");
    const [kinds, setkinds] = useState("");
    const [structure_2, setstructure_2] = useState("");
    const [floor_area_2, setfloor_area_2] = useState("");
    const [floor_number, setfloor_number] = useState("");
    const [total_number_of_floor, settotal_number_of_floor] = useState("");
    const [building_level, setbuilding_level] = useState("");
    const [type_of_site_rights, settype_of_site_rights] = useState("");
    const [year_build, setyear_build] = useState('');
    const [percentage_of_site_rights_numerator, setpercentage_of_site_rights_numerator] = useState(0);
    const [percentage_of_site_rights_denominator, setpercentage_of_site_rights_denominator] = useState(0);
    const [property_tax_details_location, setproperty_tax_details_location] = useState("");
    const [property_tax_details_house_number, setproperty_tax_details_house_number] = useState("");
    const [property_tax_details_type, setproperty_tax_details_type] = useState("");
    const [property_tax_details_price, setproperty_tax_details_price] = useState(0);

    const [co_owner_share_percentage_numerator, setco_owner_share_percentage_numerator] = useState(0);
    const [co_owner_share_percentage_denominator, setco_owner_share_percentage_denominator] = useState(0);    
    const [property_tax_auto_calculate_adjustment_rate, setproperty_tax_auto_calculate_adjustment_rate] = useState(0);
    const [appraisal_value, setappraisal_value] = useState(0);

    const [appraisal_value_error, setappraisal_value_error] = useState(false);

    //Input keypress
    let handleKeyPress = (e) => {
        const keyCode = e.keyCode || e.which;
        const keyValue = String.fromCharCode(keyCode);
        const numericRegex = /^[0-9\b]+$/;
        if (!numericRegex.test(keyValue)) {
            e.preventDefault();
        }
    };

    useEffect(() => {        
        let depositId = 0;
        let url = router.asPath;
        let searchParams = new URLSearchParams(url.split('?')[1]);
        searchParams = searchParams.get("edit");
        if (searchParams !== null) {
            depositId = Number(atob(searchParams));
            GetBuildingDetails(depositId);
        }
    }, []);

    //Load cash savings details    
    const GetBuildingDetails = async (depositId) => {
        let data;
        let auth_key = atob(sessionStorage.getItem("auth_key"));
        const params = { auth_key: auth_key, id: depositId };
        if (auth_key !== null && depositId !== 0) {
            try {
                const response = await axios.get('https://minelife-api.azurewebsites.net/get_cash_deposit', { params });
                data = await response.json();
                if (!response.ok) throw new Error('Failed to fetch data');
                if (data) {
                    setis_room_in_condominium(data.buildings_details.is_room_in_condominium === 'Yes' ? 1 : 0);
                    setlocation(data.buildings_details.location);
                    setbuilding_name(data.buildings_details.building_name);
                    setstructure_1(data.buildings_details.structure_1);
                    setfloor_area(data.buildings_details.floor_area);
                    setlocation_and_lot_number(data.buildings_details.location_and_lot_number);
                    setground_grain(data.buildings_details.ground_grain);
                    setland_area(data.buildings_details.land_area);
                    sethouse_number(data.buildings_details.house_number);
                    setkinds(data.buildings_details.kinds);
                    setstructure_2(data.buildings_details.structure_2);
                    setfloor_area_2(data.buildings_details.floor_area_2);
                    settype_of_site_rights(data.buildings_details.type_of_site_rights);
                    setsite_rights_numerator(data.buildings_details.site_rights_numerator);
                    setsite_rights_denominator(data.buildings_details.site_rights_denominator);
                    setsite_rights_ratio(data.buildings_details.site_rights_ratio);
                    setis_property_tax_details_available(data.buildings_details.is_property_tax_details_available === 'Yes' ? 1 : 0);
                    setproperty_tax_details_location(data.buildings_details.property_tax_details_location);
                    setproperty_tax_details_house_number(data.buildings_details.property_tax_details_house_number);
                    setproperty_tax_details_type(data.buildings_details.property_tax_details_type);
                    setproperty_tax_details_price(data.buildings_details.property_tax_details_price);
                    setis_co_owners_in_property(data.buildings_details.is_co_owners_in_property === 'Yes' ? 1 : 0);
                    setco_owner_share_percentage_numerator(data.buildings_details.co_owner_share_percentage_numerator);
                    setco_owner_share_percentage_denominator(data.buildings_details.co_owner_share_percentage_denominator);
                    setco_owner_share_percentage_ratio(data.buildings_details.co_owner_share_percentage_ratio);
                    setappraisal_value(data.buildings_details.appraisal_value);
                }                
            } catch (error) {
                console.error('Error:', error);
            }
        }        
    };

    //Radio button
    const handleRadio = (event) => {
        setis_room_in_condominium(Number(event.target.value));
    };

    //Question three
    const handleQuestionThree = (event) => {
        setis_co_owners_in_property(Number(event.target.value));
    };

    const handleQuestionFour = () => {
        setis_property_tax_building_with_3_or_more_floors(Number(event.target.value));
    };

    const inputHandlingFunction = (event) => {
        let inputValue = event.target.value;
        let inputId = event.currentTarget.id;
        if(inputId === "location"){
            setlocation(inputValue);
        }
        else if(inputId === "building_name"){
            setbuilding_name(inputValue);
        }
        else if(inputId === "structure_1"){
            setstructure_1(inputValue);
        }
        else if(inputId === "floor_area"){
            setfloor_area(inputValue);
        }
        else if(inputId === "location_and_lot_number"){
            setlocation_and_lot_number(inputValue);
        }
        else if(inputId === "ground_grain"){
            setground_grain(inputValue);
        }
        else if(inputId === "land_area"){
            setland_area(inputValue);
        }
        else if(inputId === "land_use"){
            setland_use(inputValue);
        }
        else if(inputId === "house_number"){
            sethouse_number(inputValue);
        }
        else if(inputId === "kinds"){
            setkinds(inputValue);
        }
        else if(inputId === "structure_2"){
            setstructure_2(inputValue);
        }
        else if(inputId === "floor_area_2"){
            setfloor_area_2(inputValue);
        }
        else if(inputId === "floor_number"){
            setfloor_number(inputValue);
        }
        else if(inputId === "total_number_of_floor"){
            settotal_number_of_floor(inputValue);
        }
        else if(inputId === "building_level"){
            setbuilding_level(inputValue);
        }
        else if(inputId === "type_of_site_rights"){
            settype_of_site_rights(inputValue);
        }
        else if(inputId === "year_build"){
            setyear_build(inputValue);
        }
        else if(inputId === "percentage_of_site_rights_numerator"){
            setpercentage_of_site_rights_numerator(inputValue);
        }
        else if(inputId === "percentage_of_site_rights_denominator"){
            setpercentage_of_site_rights_denominator(inputValue);
        }
        else if(inputId === "property_tax_details_location"){
            setproperty_tax_details_location(inputValue);
        }
        else if(inputId === "property_tax_details_house_number"){
            setproperty_tax_details_house_number(inputValue);
        }
        else if(inputId === "property_tax_details_type"){
            setproperty_tax_details_type(inputValue);
        }
        else if(inputId === "property_tax_details_price"){
            setproperty_tax_details_price(inputValue);
        }
        else if(inputId === "co_owner_share_percentage_numerator"){
            setco_owner_share_percentage_numerator(inputValue);
        }
        else if(inputId === "co_owner_share_percentage_denominator"){
            setco_owner_share_percentage_denominator(inputValue);
        }
        else if(inputId === "property_tax_auto_calculate_adjustment_rate"){
            setproperty_tax_auto_calculate_adjustment_rate(inputValue);
        }
        else if(inputId === "appraisal_value"){
            setappraisal_value(inputValue);
            setappraisal_value_error(inputValue > 0 ? false : true);
            setisSumbitDisabled(false);
        }
    };

    //Submit API function 
    const router = useRouter();
    const onSubmit = async() => {
        if (appraisal_value <= 0) {
            setappraisal_value_error(true);
            setisSumbitDisabled(true);
        }        

        const auth_key = atob(sessionStorage.getItem("auth_key"));
        if (!isSumbitDisabled && auth_key) {
            let response = "";
            let buildingId = 0;
            let url = router.asPath;
            let searchParams = new URLSearchParams(url.split('?')[1]);
            searchParams = searchParams.get("edit");
            if (searchParams !== null) {
                buildingId = Number(atob(searchParams));
            }
            const formData = new FormData();
            formData.append("auth_key", auth_key);
            formData.append("is_room_in_condominium", is_room_in_condominium === null ? 0 : is_room_in_condominium);
            formData.append("location", location);
            formData.append("building_name", building_name);
            formData.append("structure_1", structure_1);
            formData.append("floor_area", floor_area);
            formData.append("location_and_lot_number", location_and_lot_number);
            formData.append("ground_grain", ground_grain);
            formData.append("land_area", land_area);
            formData.append("land_use", land_use);
            formData.append("house_number", house_number);
            formData.append("kinds", kinds);
            formData.append("structure_2", structure_2);
            formData.append("floor_area_2", floor_area_2);
            formData.append("floor_number", floor_number);
            formData.append("total_number_of_floor", total_number_of_floor);
            formData.append("building_level", building_level);
            formData.append("type_of_site_rights", type_of_site_rights);
            formData.append("year_build", year_build);
            formData.append("percentage_of_site_rights_numerator", percentage_of_site_rights_numerator);
            formData.append("percentage_of_site_rights_denominator", percentage_of_site_rights_denominator);
            formData.append("property_tax_details_location", property_tax_details_location);
            formData.append("property_tax_details_house_number", property_tax_details_house_number);
            formData.append("property_tax_details_type", property_tax_details_type);
            formData.append("property_tax_details_price", property_tax_details_price);
            formData.append("is_co_owners_in_property", is_co_owners_in_property === null ? 0 : is_co_owners_in_property);
            formData.append("co_owner_share_percentage_numerator", co_owner_share_percentage_numerator);
            formData.append("co_owner_share_percentage_denominator", co_owner_share_percentage_denominator);
            formData.append("is_property_tax_building_with_3_or_more_floors", is_property_tax_building_with_3_or_more_floors === null ? 0 : is_property_tax_building_with_3_or_more_floors);
            formData.append("property_tax_auto_calculate_adjustment_rate", property_tax_auto_calculate_adjustment_rate);
            formData.append("appraisal_value", appraisal_value);            
            try {
                if (buildingId === 0) {
                    response = await axios.post('https://minelife-api.azurewebsites.net/add_buildings', formData);
                }
                else {
                    response = await axios.post('https://minelife-api.azurewebsites.net/edit_buildings', formData);
                }
                if (response.status === 200) {
                    router.push(`/declaration-printing/building`);
                }
            } catch (error) {
                console.log('Error:', error);
            }
        }
        else {
            setisSumbitDisabled(true);
            setShowLoader(false);
        }       
    };

    return (
        <>
            <>
                {ShowLoader && (
                    <BackdropLoader ShowLoader={ShowLoader} />
                )}
            </>

            <div className="house-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            家屋1
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        以下の内容を入力して[保存]ボタンを押して下さい。
                    </p>
                </div>


                <form action="#" method="POST">
                    <FormControl>
                        <label className="form-label text-lg py-2" id="demo-row-radio-buttons-group-label">1. 被相続人が所有されていた不動産は分譲マンションの１室でしょうか。</label>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={is_room_in_condominium}
                        >
                            <FormControlLabel value="1" control={<Radio />} onChange={handleRadio} label="はい" sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 16,
                                },
                            }} />
                            <FormControlLabel value="0" control={<Radio />} onChange={handleRadio} label="いいえ" sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 16,
                                },
                            }} />
                        </RadioGroup>
                    </FormControl>
                    {is_room_in_condominium === 1 ?
                        <div className="w-full inline-block mb-7">
                            <img src="/screenshots/building-yes.png" className="w-full" alt="image" height={500} width={200} />
                        </div>
                        : is_room_in_condominium === 0 ?
                            <div className="w-full inline-block mb-7">
                                <img src="/screenshots/building-no.png" className="w-full" alt="image" height={500} width={200} />
                            </div>
                            :
                            <></>
                    }

                    {is_room_in_condominium === 1 ?
                        <>
                            <div className="w-full flex items-center justify-between mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                        <label className="form-label flex items-center"><div className="circle-no">1</div>所在</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="location"
                                            value={location}
                                            onChange={inputHandlingFunction}
                                        />
                                    </div>
                                </div>

                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                        <label className="form-label flex items-center"><div className="circle-no">2</div>建物の名称</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="building_name"
                                            value={building_name}
                                            onChange={inputHandlingFunction}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full flex items-center justify-between mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                        <label className="form-label flex items-center"><div className="circle-no">3</div>構造</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="structure_1"
                                            value={structure_1}
                                            onChange={inputHandlingFunction}
                                        />
                                    </div>
                                </div>

                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                        <label className="form-label flex items-center"><div className="circle-no">4</div>床面積m²</label>
                                    </div>
                                    <div className="w-full inline-block mt-2 relative">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="floor_area"
                                            value={floor_area}
                                            onChange={inputHandlingFunction}
                                        />
                                        <AreaIcon />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-between mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                        <label className="form-label flex items-center"><div className="circle-no">5</div>所在及び地番</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="location_and_lot_number"
                                            value={location_and_lot_number}
                                            onChange={inputHandlingFunction}
                                        />
                                    </div>
                                </div>

                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                        <label className="form-label flex items-center"><div className="circle-no">6</div>地目</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="ground_grain"
                                            value={ground_grain}
                                            onChange={inputHandlingFunction}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-between mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                        <label className="form-label flex items-center"><div className="circle-no">7</div>地積㎡</label>
                                    </div>
                                    <div className="w-full inline-block mt-2 relative">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="land_area"
                                            value={land_area}
                                            onChange={inputHandlingFunction}
                                        />
                                        <AreaIcon />
                                    </div>
                                </div>

                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                        <label className="form-label flex items-center"><div className="circle-no">8</div>家屋番号</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="house_number"
                                            value={house_number}
                                            onChange={inputHandlingFunction}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-between mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                        <label className="form-label flex items-center"><div className="circle-no">9</div>種類</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="kinds"
                                            value={kinds}
                                            onChange={inputHandlingFunction}
                                        />
                                    </div>
                                </div>

                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                        <label className="form-label flex items-center"><div className="circle-no">10</div>構造</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="structure_2"
                                            value={structure_2}
                                            onChange={inputHandlingFunction}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full flex items-center justify-between mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                        <label className="form-label flex items-center"><div className="circle-no">11</div>床面積 ㎡</label>
                                    </div>
                                    <div className="w-full inline-block mt-2 relative">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="floor_area_2"
                                            value={floor_area_2}
                                            onChange={inputHandlingFunction}
                                        />
                                        <AreaIcon />
                                    </div>
                                </div>

                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                        <label className="form-label flex items-center"><div className="circle-no">12</div>総階数</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="floor_number"
                                            value={floor_number}
                                            onChange={inputHandlingFunction}
                                        />
                                    </div>
                                </div>
                            </div>


                            <div className="w-full flex items-center justify-between">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left mb-7">
                                    <div className="label w-full inline-block">
                                        <label className="form-label flex items-center"><div className="circle-no">13</div>敷地権の種類</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="type_of_site_rights"
                                            value={type_of_site_rights}
                                            onChange={inputHandlingFunction}
                                        />
                                    </div>
                                </div>

                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left mb-7">
                                    <div className="label w-full inline-block">
                                        <label className="form-label flex items-center"><div className="circle-no">14</div>所在階</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            id="building_level"
                                            value={building_level}
                                            onChange={inputHandlingFunction}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="w-full inline-block mb-7">
                                <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <div className="label w-full inline-block">
                                        <label className="form-label flex items-center"><div className="circle-no">15</div>築年数</label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <JapaneseCalendar id={"year_build"} DateValue={year_build} setyear_build={setyear_build} />
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left mb-7">
                                <div className="label w-full inline-block">
                                    <label className="form-label flex items-center"><div className="circle-no">16</div>敷地権の割合</label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <div className="flex justify-between items-center">
                                        <div><input
                                            type="text"
                                            id="percentage_of_site_rights_numerator"
                                            value={percentage_of_site_rights_numerator}
                                            onChange={inputHandlingFunction}
                                            className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        /></div>
                                        <div>
                                            <span className="text-3xl text-gray-500">/</span>
                                        </div>
                                        <div><input
                                            type="text"
                                            id="percentage_of_site_rights_denominator"
                                            value={percentage_of_site_rights_denominator}
                                            onChange={inputHandlingFunction}
                                            className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        /></div>
                                    </div>
                                </div>
                                <div className="w-full hidden mt-2">
                                    <input
                                        type="text"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        id="property_tax_details_location"
                                        value={property_tax_details_location}
                                        onChange={inputHandlingFunction}
                                    />
                                </div>
                            </div>
                        </>
                        : is_room_in_condominium === 0 ?
                            <>
                                <div className="w-full flex items-center justify-between pt-5 mb-7">
                                    <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                        <div className="label w-full inline-block">
                                            <label className="form-label flex items-center"><div className="circle-no">1</div>所在</label>
                                        </div>
                                        <div className="w-full inline-block mt-2">
                                            <input
                                                type="text"
                                                className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                                id="location"
                                                value={location}
                                                onChange={inputHandlingFunction}
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                        <div className="label w-full inline-block">
                                            <label className="form-label flex items-center"><div className="circle-no">2</div>家屋番号</label>
                                        </div>
                                        <div className="w-full inline-block mt-2">
                                            <input
                                                type="text"
                                                className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                                id="house_number"
                                                value={house_number}
                                                onChange={inputHandlingFunction}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full flex items-center justify-between mb-7">
                                    <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                        <div className="label w-full inline-block">
                                            <label className="form-label flex items-center"><div className="circle-no">3</div>種類</label>
                                        </div>
                                        <div className="w-full inline-block mt-2">
                                            <input
                                                type="text"
                                                className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                                id="kinds"
                                                value={kinds}
                                                onChange={inputHandlingFunction}
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                        <div className="label w-full inline-block">
                                            <label className="form-label flex items-center"><div className="circle-no">4</div>構造</label>
                                        </div>
                                        <div className="w-full inline-block mt-2">
                                            <input
                                                type="text"
                                                className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                                id="structure_1"
                                                value={structure_1}
                                                onChange={inputHandlingFunction}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full flex items-center justify-between mb-7">
                                    <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                        <div className="label w-full inline-block">
                                            <label className="form-label flex items-center"><div className="circle-no">5</div>床面積 ㎡</label>
                                        </div>
                                        <div className="w-full inline-block mt-2 relative">
                                            <input
                                                type="text"
                                                className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                                id="floor_area"
                                                value={floor_area}
                                                onChange={inputHandlingFunction}
                                            />
                                            <AreaIcon />
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <></>
                    }

                    <FormControl>
                        <label className="form-label text-lg" id="demo-row-radio-buttons-group-label">2．固定資産税課税明細（固定資産税評価証明書）の情報の入力</label>
                    </FormControl>
                    <div className="w-full inline-block mt-3 mb-7">
                        <img src="/screenshots/building-screenshot.png" className="w-full" alt="image" height={500} width={200} />
                    </div>

                    <Box className="pb-7">
                        <Box className="w-full">
                            <Typography component={"p"} fontSize={13} className="text-red-600 tracking-2">※記載例は一般的なひな型のため各市区町村のものと記載位置がずれている可能性があります。</Typography>
                        </Box>
                        <Box className="mt-3 w-full">
                            <Typography component={"p"} fontSize={13} className="text-red-600 tracking-2">※マンションの場合は④の金額がマンション一棟の価格が記載されている場合がありますのでご注意ください</Typography>
                        </Box>
                    </Box>

                    <div className="w-full flex items-center justify-between mb-7">
                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="label w-full inline-block">
                                <label className="form-label flex items-center"><div className="circle-no">1</div>家屋の所在</label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    id="property_tax_details_location"
                                    value={property_tax_details_location}
                                    onChange={inputHandlingFunction}
                                />
                            </div>
                        </div>

                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="label w-full inline-block">
                                <label className="form-label flex items-center"><div className="circle-no">2</div>家屋番号</label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    id="property_tax_details_house_number"
                                    value={property_tax_details_house_number}
                                    onChange={inputHandlingFunction}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex items-center justify-between mb-4">
                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="label w-full inline-block">
                                <label className="form-label flex items-center"><div className="circle-no">3</div>種類・用途</label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    id="property_tax_details_type"
                                    value={property_tax_details_type}
                                    onChange={inputHandlingFunction}
                                />
                            </div>
                        </div>

                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="label w-full inline-block">
                                <label className="form-label flex items-center"><div className="circle-no">4</div>価格</label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    id="property_tax_details_price"
                                    value={property_tax_details_price}
                                    onChange={inputHandlingFunction}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-7">
                        <FormControl>
                            <label className="form-label text-lg" id="demo-row-radio-buttons-group-label">3. 所有されていた物件に共有者はいましたか。</label>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={is_co_owners_in_property}
                            >
                                <FormControlLabel value="1" control={<Radio />} onChange={handleQuestionThree} label="はい" sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 16,
                                    },
                                }} />
                                <FormControlLabel value="0" control={<Radio />} onChange={handleQuestionThree} label="いいえ" sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 16,
                                    },
                                }} />
                            </RadioGroup>
                        </FormControl>
                        {is_co_owners_in_property === 1 ?
                            <>
                                <div className="w-full block items-center justify-between mb-7">
                                    <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                        <div className="label w-full inline-block">
                                            <label className="form-label">共有割合の入力</label>
                                        </div>
                                        <div className="w-full inline-block mt-2">
                                            <div className="flex justify-between items-center">
                                                <div><input
                                                    type="text"
                                                    id="co_owner_share_percentage_numerator"
                                                    value={co_owner_share_percentage_numerator}
                                                    onChange={inputHandlingFunction}
                                                    className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                                /></div>
                                                <div>
                                                    <span className="text-3xl text-gray-500">/</span>
                                                </div>
                                                <div><input
                                                    type="text"
                                                    id="co_owner_share_percentage_denominator"
                                                    value={co_owner_share_percentage_denominator}
                                                    onChange={inputHandlingFunction}
                                                    className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                                /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                            :
                            <></>
                        }
                    </div>

                    <Box className="mb-7">
                        <FormControl>
                            <Typography component={"label"} className="form-label text-lg" id="demo-row-radio-buttons-group-label">4. 該当地は総階数3階以上のマンションの敷地でしょうか</Typography>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={is_property_tax_building_with_3_or_more_floors}
                            >
                                <FormControlLabel value="1" control={<Radio />} onChange={handleQuestionFour} label="はい" sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 16,
                                    },
                                }} />
                                <FormControlLabel value="0" control={<Radio />} onChange={handleQuestionFour} label="いいえ" sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 16,
                                    },
                                }} />
                            </RadioGroup>
                        </FormControl>
                        {is_property_tax_building_with_3_or_more_floors === 1 ?
                            <>
                                <Box className="w-full inline-block">
                                    <Box className="w-full mb-2 hidden"><Typography component={"label"}>建物の入力時に自動計算された区分所有補正率を入力してください</Typography></Box>
                                    <Box className="w-full">
                                        <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                            <input
                                                type="text"
                                                id="property_tax_auto_calculate_adjustment_rate"
                                                value={property_tax_auto_calculate_adjustment_rate}
                                                onChange={inputHandlingFunction}
                                                className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </>
                            :
                            <></>
                        }
                    </Box>


                    <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left mb-16">
                        <div className="label w-full inline-block">
                            <label className="form-label text-lg" htmlFor="appraisal_value">
                                5. 評価額 <i className="text-red-500" role="alert">*</i>
                            </label>
                        </div>
                        <div className="w-full inline-block mt-2">
                            <input
                                type="text"
                                id="appraisal_value"
                                value={appraisal_value}
                                onChange={inputHandlingFunction}
                                onKeyPress={handleKeyPress}
                                className="form-control text-right w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                            />
                            {appraisal_value_error && (
                                <p className="text-red-500" role="alert">この項目は必須です</p>
                            )}
                        </div>
                    </div>
                    <div className="Total-property-section py-10 lg:py-20 xl:py-20 2xl:py-20 px-20 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-md xl:max-w-screen-md 2xl:max-w-screen-md">
                        <div className="w-full block lg:flex xl:flex 2xl:flex justify-evenly items-center">
                            <BackButton />
                            <SubmitButton onSubmit={onSubmit} isSumbitDisabled={isSumbitDisabled} />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

HouseAdd.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};