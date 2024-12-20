import React, { useState, useEffect, useRef, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router';
import { List, ListItem, ListItemText, ListItemIcon, Boxider, Box, Stepper, Step, StepLabel, StepButton, Button, Typography } from '@mui/material';
import BackButton from "../../../components/back-btn";
import SubmitButton from "../../../components/submit-btn";
import HeirListBox from "../../../components/heir-list-box/heir-list-box";
import IncorrectError from "../../../components/heir-list-box/incorrect-error";
import FullLayout from '../../../components/layouts/full/FullLayout';
import PostcodeIcon from "../../../components/inputbox-icon/textbox-postcode-icon";
import BackdropLoader from '../../../components/loader/backdrop-loader';
import AreaIcon from "../../../components/inputbox-icon/textbox-area-icon";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TableOne from '../../../components/land-tables/table-one';
import TableTwo from '../../../components/land-tables/table-two';
import TableThree from '../../../components/land-tables/table-three';
import TableFour from '../../../components/land-tables/table-four';
import TableFive from '../../../components/land-tables/table-five';

export default function LandAdd() {
    let [ShowImageOne, setShowImageOne] = useState(true);
    let [ShowImageTwo, setShowImageTwo] = useState(false);
    let [ShowImageThree, setShowImageThree] = useState(false);
    let [ShowImageFour, setShowImageFour] = useState(false);
    let [ShowImageFive, setShowImageFive] = useState(false);

    let [ShowTableOne, setShowTableOne] = useState(true);
    let [ShowTableTwo, setShowTableTwo] = useState(false);
    let [ShowTableThree, setShowTableThree] = useState(false);
    let [ShowTableFour, setShowTableFour] = useState(false);
    let [ShowTableFive, setShowTableFive] = useState(false);
    let [DisabledRadioValue, setDisabledRadioValue] = useState('1');


    let [ShowQuestionYes, setShowQuestionYes] = useState(false);
    let [ShowQuestionNo, setShowQuestionNo] = useState(false);

    let [QuestionTwo, setQuestionTwo] = useState("");
    let [QuestionTwoImageYes, setQuestionTwoImageYes] = useState(false);
    let [QuestionTwoImageNo, setQuestionTwoImageNo] = useState(false);
    const [QuestionTwoImageBoth, setQuestionTwoImageBoth] = useState(true);

    let [QuestionThree, setQuestionThree] = useState("");
    let [ShowYesOption3, setShowYesOption3] = useState(false);
    let [ShowNoOption3, setShowNoOption3] = useState(false);

    let [QuestionFour, setQuestionFour] = useState("");
    let [ShowYesOption4, setShowYesOption4] = useState(false);
    let [ShowNoOption4, setShowNoOption4] = useState(false);

    //Input items
    let [LocationLotNumberYes, setLocationLotNumberYes] = useState("");
    let [GroundGrainYes, setGroundGrainYes] = useState("");
    let [LandAreaYes, setLandAreaYes] = useState("");
    let [TypesofSiteRightsYes, setTypesofSiteRightsYes] = useState("");
    let [PercentageofSiteRightsYes, setPercentageofSiteRightsYes] = useState("");

    let [LocationNo, setLocationNo] = useState("");
    let [LotNumberNo, setLotNumberNo] = useState("");
    let [GroundGrainNo, setGroundGrainNo] = useState("");
    let [LandAreaNo, setLandAreaNo] = useState("");

    let [SharePercentage, setSharePercentage] = useState("");

    let [LandYesImage, setLandYesImage] = useState(false);
    let [LandNoImage, setLandNoImage] = useState(false);

    let [AmountofMoney, setAmountofMoney] = useState(0);
    let [UndecidedHeir, setUndecidedHeir] = useState(0);
    let [totalPrice, settotalPrice] = useState(0);
    let [boxValues, setBoxValues] = useState([]);
    let [isSumbitDisabled, setisSumbitDisabled] = useState(false);
    let [ShowIncorrectError, setShowIncorrectError] = useState(false);
    let [ShowLoader, setShowLoader] = useState(false);

    const [is_room_in_condominium, setis_room_in_condominium] = useState(null);
    const [location_and_lot_number, setlocation_and_lot_number] = useState("");
    const [ground_grain, setground_grain] = useState("");
    const [land_area, setland_area] = useState(0);
    const [land_use, setland_use] = useState(0);
    const [type_of_site_rights, settype_of_site_rights] = useState("");
    const [percentage_of_site_rights, setpercentage_of_site_rights] = useState(0);
    const [is_owned_by_decedent, setis_owned_by_decedent] = useState(null);
    const [details, setdetails] = useState("");
    const [road_price_1, setroad_price_1] = useState(0);
    const [regional_distinction_1, setregional_distinction_1] = useState("");
    const [corner_semi_corner_1, setcorner_semi_corner_1] = useState("");

    const [road_price_2, setroad_price_2] = useState(0);
    const [regional_distinction_2, setregional_distinction_2] = useState("");
    const [corner_semi_corner_2, setcorner_semi_corner_2] = useState("");

    const [road_price_3, setroad_price_3] = useState(0);
    const [regional_distinction_3, setregional_distinction_3] = useState("");
    const [corner_semi_corner_3, setcorner_semi_corner_3] = useState("");

    const [road_price_4, setroad_price_4] = useState(0);
    const [regional_distinction_4, setregional_distinction_4] = useState("");
    const [corner_semi_corner_4, setcorner_semi_corner_4] = useState("");

    const [is_co_owners_in_property, setis_co_owners_in_property] = useState(null);
    const [co_owner_share_percentage_numerator, setco_owner_share_percentage_numerator] = useState(0);
    const [co_owner_share_percentage_denominator, setco_owner_share_percentage_denominator] = useState(0);
    const [appraisal_value, setappraisal_value] = useState(0);
    const [is_land_with_3_or_more_floors, setis_land_with_3_or_more_floors] = useState(null);
    const [condominium_correction_rate, setcondominium_correction_rate] = useState(0);

    const [appraisal_value_error, setappraisal_value_error] = useState(false);
    const [condominium_correction_rate_error, setcondominium_correction_rate_error] = useState(false);

    const [land_details, setland_details] = useState("");
    const [magnification, setmagnification] = useState("");
    const [magnification_red_frame_details, setmagnification_red_frame_details] = useState("");

    //Input keypress
    let handleKeyPress = (e) => {
        const keyCode = e.keyCode || e.which;
        const keyValue = String.fromCharCode(keyCode);
        const numericRegex = /^[0-9\b]+$/;
        if (!numericRegex.test(keyValue)) {
            e.preventDefault();
        }
    };

    const handleQuestionOne = (event) => {
        let radioValue = event.target.value;
        setis_room_in_condominium(Number(radioValue));
    };

    const handleQuestionTwo = (event) => {
        let radioValue = event.target.value;
        setis_owned_by_decedent(Number(radioValue));
        setQuestionTwoImageBoth(false);
    };

    const handleQuestionThree = () => {
        let radioValue = event.target.value;
        setis_co_owners_in_property(Number(radioValue));
    };

    const handleQuestionFour = () => {
        let radioValue = event.target.value;
        setis_land_with_3_or_more_floors(Number(radioValue));
    };

    //Disabled deduction radio button
    const handleDisabledRadio = (event) => {
        let SelectValue = Number(event.target.value);
        setDisabledRadioValue(SelectValue);
        if (SelectValue === 1) {
            setShowImageOne(true);
            setShowImageTwo(false);
            setShowImageThree(false);
            setShowImageFour(false);
            setShowImageFive(false);
            setShowTableOne(true);
            setShowTableTwo(false);
            setShowTableThree(false);
            setShowTableFour(false);
            setShowTableFive(false);
        }
        else if (SelectValue === 2) {
            setShowImageOne(false);
            setShowImageTwo(true);
            setShowImageThree(false);
            setShowImageFour(false);
            setShowImageFive(false);
            setShowTableOne(false);
            setShowTableTwo(true);
            setShowTableThree(false);
            setShowTableFour(false);
            setShowTableFive(false);
        }
        else if (SelectValue === 3) {
            setShowImageOne(false);
            setShowImageTwo(false);
            setShowImageThree(true);
            setShowImageFour(false);
            setShowImageFive(false);
            setShowTableOne(false);
            setShowTableTwo(false);
            setShowTableThree(true);
            setShowTableFour(false);
            setShowTableFive(false);
        }
        else if (SelectValue === 4) {
            setShowImageOne(false);
            setShowImageTwo(false);
            setShowImageThree(false);
            setShowImageFour(true);
            setShowImageFive(false);
            setShowTableOne(false);
            setShowTableTwo(false);
            setShowTableThree(false);
            setShowTableFour(true);
            setShowTableFive(false);
        }
        else if (SelectValue === 5) {
            setShowImageOne(false);
            setShowImageTwo(false);
            setShowImageThree(false);
            setShowImageFour(false);
            setShowImageFive(true);
            setShowTableOne(false);
            setShowTableTwo(false);
            setShowTableThree(false);
            setShowTableFour(false);
            setShowTableFive(true);
        }
    };

    const inputHandlingFunction = (event) => {
        let inputValue = event.target.value;
        let inputId = event.currentTarget.id;
        if(inputId === "location_and_lot_number"){
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
        else if(inputId === "type_of_site_rights"){
            settype_of_site_rights(inputValue);
        }
        else if(inputId === "percentage_of_site_rights"){
            setpercentage_of_site_rights(inputValue);
        }
        else if(inputId === "details"){
            setdetails(inputValue);
        }
        else if(inputId === "road_price_1"){
            setroad_price_1(inputValue);
        }
        else if(inputId === "regional_distinction_1"){
            setregional_distinction_1(inputValue);
        }
        else if(inputId === "corner_semi_corner_1"){
            setcorner_semi_corner_1(inputValue);
        }
        else if(inputId === "road_price_2"){
            setroad_price_2(inputValue);
        }
        else if(inputId === "regional_distinction_2"){
            setregional_distinction_2(inputValue);
        }
        else if(inputId === "corner_semi_corner_2"){
            setcorner_semi_corner_2(inputValue);
        }
        else if(inputId === "road_price_3"){
            setroad_price_3(inputValue);
        }
        else if(inputId === "regional_distinction_3"){
            setregional_distinction_3(inputValue);
        }
        else if(inputId === "corner_semi_corner_3"){
            setcorner_semi_corner_3(inputValue);
        }
        else if(inputId === "road_price_4"){
            setroad_price_4(inputValue);
        }
        else if(inputId === "regional_distinction_4"){
            setregional_distinction_4(inputValue);
        }
        else if(inputId === "corner_semi_corner_4"){
            setcorner_semi_corner_4(inputValue);
        }
        else if(inputId === "co_owner_share_percentage_numerator"){
            setco_owner_share_percentage_numerator(inputValue);
        }
        else if(inputId === "co_owner_share_percentage_denominator"){
            setco_owner_share_percentage_denominator(inputValue);
        }
        else if(inputId === "appraisal_value"){
            setappraisal_value(inputValue);
        }
        else if(inputId === "condominium_correction_rate"){
            setcondominium_correction_rate(inputValue);
        }
        else if(inputId === "location_and_lot_number"){
            setlocation_and_lot_number(inputValue);
        }
    };
    

    //Submit API function 
    const router = useRouter();
    let defaultValues = {};
    const onSubmit = async() => {        
        if (appraisal_value <= 0) {
            setappraisal_value_error(true);
            setisSumbitDisabled(true);
        }        

        const auth_key = atob(sessionStorage.getItem("auth_key"));
        if (!isSumbitDisabled && auth_key) {
            let data;
            let response = "";
            let landId = 0;
            let url = router.asPath;
            let searchParams = new URLSearchParams(url.split('?')[1]);
            searchParams = searchParams.get("edit");
            if (searchParams !== null) {
                landId = Number(atob(searchParams));
            }
            const formData = new FormData();
            formData.append("auth_key", auth_key);
            formData.append("id", landId !== 0 ? landId : 0);
            formData.append("is_room_in_condominium", is_room_in_condominium === null ? 0 : is_room_in_condominium);
            formData.append("location_and_lot_number", location_and_lot_number);
            formData.append("ground_grain", ground_grain);
            formData.append("land_area", land_area);
            formData.append("land_use", land_use);
            formData.append("type_of_site_rights", type_of_site_rights);
            formData.append("percentage_of_site_rights", percentage_of_site_rights);
            formData.append("land_area", land_area);
            formData.append("land_use", land_use);
            formData.append("is_owned_by_decedent", is_owned_by_decedent === null ? 0 : is_owned_by_decedent);
            formData.append("details", details);

            formData.append("road_price_1", road_price_1);
            formData.append("regional_distinction_1", regional_distinction_1);
            formData.append("corner_semi_corner_1", corner_semi_corner_1);

            formData.append("road_price_2", road_price_2);
            formData.append("regional_distinction_2", regional_distinction_2);
            formData.append("corner_semi_corner_2", corner_semi_corner_2);

            formData.append("road_price_3", road_price_3);
            formData.append("regional_distinction_3", regional_distinction_3);
            formData.append("corner_semi_corner_3", corner_semi_corner_3);

            // formData.append("road_price_4", road_price_4);
            // formData.append("regional_distinction_4", regional_distinction_4);
            // formData.append("corner_semi_corner_4", corner_semi_corner_4);

            formData.append("is_co_owners_in_property", is_co_owners_in_property === null ? 0 : is_co_owners_in_property);
            formData.append("co_owner_share_percentage_numerator", co_owner_share_percentage_numerator);
            formData.append("co_owner_share_percentage_denominator", co_owner_share_percentage_denominator);
            formData.append("appraisal_value", appraisal_value);            
            formData.append("is_land_with_3_or_more_floors", is_land_with_3_or_more_floors === null ? 0 : is_land_with_3_or_more_floors);
            formData.append("condominium_correction_rate", condominium_correction_rate);
            try {
                if (landId === 0) {
                    response = await fetch(`https://minelife-api.azurewebsites.net/add_lands`, {
                        method: 'POST',
                        body: formData
                    });
                }
                else {
                    response = await fetch(`https://minelife-api.azurewebsites.net/edit_lands`, {
                        method: 'POST',
                        body: formData
                    });
                }
                data = await response.json();
                if (!response.ok) throw new Error(data);
                
                if (response.ok) {
                    router.push(`/declaration-printing/land`);
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

    useEffect(() => {        
        let depositId = 0;
        let url = router.asPath;
        let searchParams = new URLSearchParams(url.split('?')[1]);
        searchParams = searchParams.get("edit");
        if (searchParams) {
            depositId = Number(atob(searchParams));
            GetLandDetails(depositId);
        }
    }, []);

    //Load land details    
    const GetLandDetails = async (depositId) => {
        let data;
        const auth_key = atob(sessionStorage.getItem("auth_key"));
        const params = { auth_key: auth_key, id: depositId };
        if (auth_key !== null && depositId !== 0) {
            try {
                const response = await fetch(`https://minelife-api.azurewebsites.net/get_land_details?auth_key=${params.auth_key}&id=${params.id}`);
                data = await response.json();

                if (!response.ok) throw new Error(data);

                if (data && data.land_details) {
                    setis_room_in_condominium(data.land_details.is_room_in_condominium === 'Yes' ? 1 : 0);
                    setlocation_and_lot_number(data.land_details.location_and_lot_number);
                    setground_grain(data.land_details.ground_grain);
                    setland_area(data.land_details.land_area);
                    settype_of_site_rights(data.land_details.type_of_site_rights);
                    setpercentage_of_site_rights(data.land_details.percentage_of_site_rights);
                    setis_owned_by_decedent(data.land_details.is_owned_by_decedent);
                    setland_details(data.land_details.land_details);
                    setroad_price_1(data.land_details.road_price_1);
                    setregional_distinction_1(data.land_details.regional_distinction_1);
                    setcorner_semi_corner_1(data.land_details.corner_semi_corner_1);

                    setroad_price_2(data.land_details.road_price_2);
                    setregional_distinction_2(data.land_details.regional_distinction_1);
                    setcorner_semi_corner_2(data.land_details.corner_semi_corner_2);
                    
                    setroad_price_3(data.land_details.road_price_3);
                    setregional_distinction_3(data.land_details.regional_distinction_3);
                    setcorner_semi_corner_3(data.land_details.corner_semi_corner_3);

                    setroad_price_4(data.land_details.road_price_4);
                    setregional_distinction_4(data.land_details.regional_distinction_4);
                    setcorner_semi_corner_4(data.land_details.corner_semi_corner_4);                  
                    
                    setmagnification(data.land_details.magnification);
                    setmagnification_red_frame_details(data.land_details.magnification_red_frame_details);
                    setis_co_owners_in_property(data.land_details.is_co_owners_in_property === 'Yes' ? 1 : 0);

                    setco_owner_share_percentage_numerator(data.land_details.co_owner_share_percentage_numerator);
                    setco_owner_share_percentage_denominator(data.land_details.co_owner_share_percentage_denominator);
                    setappraisal_value(data.land_details.appraisal_value);                    
                }                
            } catch (error) {
                console.error('Error:', error);
            }
        }        
    };

    return (
        <>
            <>
                {ShowLoader && (
                    <BackdropLoader ShowLoader={ShowLoader} />
                )}
            </>
            <Box className="land-wrapper">
                <Box className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <Box className="page-heading">
                        <Typography component={"p"} className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            土地1
                        </Typography>
                    </Box>
                </Box>
                <Box className="page-description py-8">
                    <Typography component={"p"} className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        以下の内容を入力して[保存]ボタンを押して下さい。
                    </Typography>
                </Box>
                <form action="#" method="POST">
                    <FormControl>
                        <Typography component={"label"} className="form-label text-lg" id="demo-row-radio-buttons-group-label">1. 被相続人が所有されていた不動産は分譲マンションの１室でしょうか。</Typography>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={is_room_in_condominium}
                        >
                            <FormControlLabel value="1" control={<Radio />} onChange={handleQuestionOne} label="はい" sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 16,
                                },
                            }} />
                            <FormControlLabel value="0" control={<Radio />} onChange={handleQuestionOne} label="いいえ" sx={{
                                '& .MuiSvgIcon-root': {
                                    fontSize: 16,
                                },
                            }} />
                        </RadioGroup>
                    </FormControl>

                    <Box className="w-full inline-block">
                        {is_room_in_condominium === 1 ?
                            <img src="/screenshots/land-yes.png" className="w-full" alt="image" height={500} width={200} />
                            : is_room_in_condominium === 0 ?
                                <img src="/screenshots/land-no.png" className="w-full" alt="image" height={500} width={200} />
                                :
                                <></>
                        }
                    </Box>

                    {is_room_in_condominium === 1 ?
                        <>
                            <Box className="w-full flex items-center justify-between mb-7">
                                <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <Box className="label w-full inline-block">
                                        <Typography component={"label"} className="form-label flex items-center"><Box className="circle-no">1</Box>所在及び地番</Typography>
                                    </Box>
                                    <Box className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            id="location_and_lot_number"
                                            value={location_and_lot_number}
                                            onChange={inputHandlingFunction}
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        />
                                    </Box>
                                </Box>

                                <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <Box className="label w-full inline-block">
                                        <Typography component={"label"} className="form-label flex items-center"><Box className="circle-no">2</Box>地目</Typography>
                                    </Box>
                                    <Box className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            id="ground_grain"
                                            value={ground_grain}
                                            onChange={inputHandlingFunction}
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        />
                                    </Box>
                                </Box>
                            </Box>

                            <Box className="w-full flex items-center justify-between mb-7">
                                <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <Box className="label w-full inline-block">
                                        <Typography component={"label"} className="form-label flex items-center"><Box className="circle-no">3</Box>地積㎡</Typography>
                                    </Box>
                                    <Box className="w-full inline-block mt-2 relative">
                                        <input
                                            type="text"
                                            id="land_area"
                                            value={land_area}
                                            onChange={inputHandlingFunction}
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        />
                                        <AreaIcon />
                                    </Box>
                                </Box>

                                <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <Box className="label w-full inline-block">
                                        <Typography component={"label"} className="form-label flex items-center"><Box className="circle-no">4</Box>敷地権の種類</Typography>
                                    </Box>
                                    <Box className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            id="land_use"
                                            value={land_use}
                                            onChange={inputHandlingFunction}
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        />
                                    </Box>
                                </Box>
                            </Box>

                            <Box className="w-full flex items-center justify-between mb-7">
                                <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                    <Box className="label w-full inline-block">
                                        <Typography component={"label"} className="form-label flex items-center"><Box className="circle-no">5</Box>敷地権の割合</Typography>
                                    </Box>
                                    <Box className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            id="type_of_site_rights"
                                            value={type_of_site_rights}
                                            onChange={inputHandlingFunction}
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </>
                        : is_room_in_condominium === 0 ?
                            <>
                                <Box className="w-full flex items-center justify-between mb-7">
                                    <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                        <Box className="label w-full inline-block">
                                            <Typography component={"label"} className="form-label flex items-center"><Box className="circle-no">1</Box>所在</Typography>
                                        </Box>
                                        <Box className="w-full inline-block mt-2">
                                            <input
                                                type="text"
                                                id="location_and_lot_number"
                                                value={location_and_lot_number}
                                                onChange={inputHandlingFunction}
                                                className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            />
                                        </Box>
                                    </Box>

                                    <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                        <Box className="label w-full inline-block">
                                            <Typography component={"label"} className="form-label flex items-center"><Box className="circle-no">2</Box>地番</Typography>
                                        </Box>
                                        <Box className="w-full inline-block mt-2">
                                            <input
                                                type="text"
                                                id="land_use"
                                                value={land_use}
                                                onChange={inputHandlingFunction}
                                                className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            />
                                        </Box>
                                    </Box>
                                </Box>

                                <Box className="w-full flex items-center justify-between mb-7">
                                    <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                        <Box className="label w-full inline-block">
                                            <Typography component={"label"} className="form-label flex items-center"><Box className="circle-no">3</Box>地目</Typography>
                                        </Box>
                                        <Box className="w-full inline-block mt-2">
                                            <input
                                                type="text"
                                                id="land_area"
                                                value={land_area}
                                                onChange={inputHandlingFunction}
                                                className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            />
                                        </Box>
                                    </Box>

                                    <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                        <Box className="label w-full inline-block">
                                            <Typography component={"label"} className="form-label flex items-center"><Box className="circle-no">4</Box>地積 ㎡</Typography>
                                        </Box>
                                        <Box className="w-full inline-block mt-2 relative">
                                            <input
                                                type="text"
                                                id="type_of_site_rights"
                                                value={type_of_site_rights}
                                                onChange={inputHandlingFunction}
                                                className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            />
                                            <AreaIcon />
                                        </Box>
                                    </Box>
                                </Box>
                            </>
                            :
                            <></>
                    }


                    <Box className="mt-2">
                        <FormControl>
                            <Typography component={"label"} className="form-label text-lg" id="demo-row-radio-buttons-group-label">2. 被相続人が所有されていた不動産は路線価地域の土地でしょうか。</Typography>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={is_owned_by_decedent}
                            >
                                <FormControlLabel value="1" control={<Radio />} onChange={handleQuestionTwo} label="はい" sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 16,
                                    },
                                }} />
                                <FormControlLabel value="0" control={<Radio />} onChange={handleQuestionTwo} label="いいえ" sx={{
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 16,
                                    },
                                }} />
                            </RadioGroup>
                        </FormControl>
                    </Box>
                    <Box className="w-full inline-block mb-7">
                        <Box className="py-2">
                            <Typography component={"label"}>※該当の土地が路線価地域の土地かどうかの確認方法</Typography>
                            <Box className="mt-2 steps-details">
                                <Typography fontSize={14} lineHeight={2} letterSpacing={1.8}><Typography letterSpacing={0} component={"span"}>Step１</Typography> 下記リンク先の国税庁HPから該当年分の路線価図を見つけます。</Typography>
                                <Typography fontSize={14} target="blank" lineHeight={2} letterSpacing={0} component={Link} href={"https://www.rosenka.nta.go.jp/"} className="text-blue-600 mt-1">https://www.rosenka.nta.go.jp/</Typography>
                            </Box>
                            <Box className="mt-2 steps-details">
                                <Typography fontSize={14} lineHeight={2} letterSpacing={1.8}><Typography letterSpacing={0} component={"span"}>Step２</Typography> 該当地の地名の路線価図が見つからない場合</Typography>
                                <Typography fontSize={14} lineHeight={2} letterSpacing={1.8} className="mt-1">⇒該当地は路線価地域の土地ではありません。「いいえ」を選択し倍率表を確認してください。</Typography>
                            </Box>
                        </Box>
                        {QuestionTwoImageBoth && (
                            <>
                                <Box className="mt-5">
                                    <img src="/screenshots/land-second-no.png" className="w-full" alt="image" height={500} width={200} />
                                </Box>
                                <Box className="mt-5 steps-details">
                                    <Typography fontSize={14} lineHeight={2} letterSpacing={1.8}><Typography letterSpacing={0} component={"span"}>Step３</Typography> 該当地が路線価が付された道路に接しておらず、倍率地域と記載された地域に位置する場合</Typography>
                                    <Typography fontSize={14} lineHeight={2} letterSpacing={1.8} className="mt-1">⇒該当地は路線価地域の土地ではありません。「いいえ」を選択して倍率表を確認してください。</Typography>
                                </Box>
                                <Box className="mt-5">
                                    <img src="/screenshots/land-second-no-1.png" className="w-full" alt="image" height={500} width={200} />
                                </Box>

                            </>
                        )}

                        {is_owned_by_decedent === 1 ?
                            <>
                                <Box className="mt-5">
                                    <img src="/screenshots/land-second-no.png" className="w-full" alt="image" height={500} width={200} />
                                </Box>
                                <Box className="mt-5 steps-details">
                                    <Typography fontSize={14} lineHeight={2} letterSpacing={1.8}><Typography letterSpacing={0} component={"span"}>Step３</Typography> 該当地が路線価が付された道路に接しておらず、倍率地域と記載された地域に位置する場合</Typography>
                                    <Typography fontSize={14} lineHeight={2} letterSpacing={1.8} className="mt-1">⇒該当地は路線価地域の土地ではありません。「いいえ」を選択して倍率表を確認してください。</Typography>
                                </Box>
                                <Box className="mt-5">
                                    <img src="/screenshots/land-second-no-1.png" className="w-full" alt="image" height={500} width={200} />
                                </Box>
                                <Box className="mt-5">
                                    <img src="/screenshots/land-second-yes-1.png" className="w-full" alt="image" height={500} width={200} />
                                </Box>
                            </>
                            : is_owned_by_decedent === 0 ?
                                <>
                                    <Box className="mt-5">
                                        <img src="/screenshots/land-second-no.png" className="w-full" alt="image" height={500} width={200} />
                                    </Box>
                                    <Box className="mt-5">
                                        <img src="/screenshots/land-second-no-1.png" className="w-full" alt="image" height={500} width={200} />
                                    </Box>
                                    <Box className="mt-5">
                                        <img src="/screenshots/land-second-no-2.png" className="w-full bg-white" alt="image" height={500} width={200} />
                                    </Box>

                                    <Box className="w-full flex items-center justify-between pt-7 mb-7">
                                        <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                            <Box className="label w-full inline-block">
                                                <Typography component={"label"} className="form-label flex items-center">倍率</Typography>
                                            </Box>
                                            <Box className="w-full inline-block mt-2">
                                                <input
                                                    type="text"
                                                    id="details"
                                                    value={details}
                                                    onChange={inputHandlingFunction}
                                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                                />
                                            </Box>
                                        </Box>
                                    </Box>

                                    <Box className="label w-full inline-block">
                                        <Typography component={"label"} className="form-label flex items-center">【固定資産税課税明細の情報の入力】</Typography>
                                    </Box>

                                    <Box className="mt-5">
                                        <img src="/screenshots/land-question-2.png" className="w-full" alt="image" height={500} width={200} />
                                    </Box>

                                    <Box className="w-full flex items-center justify-between pt-7 mb-7">
                                        <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                            <Box className="label w-full inline-block">
                                                <Typography component={"label"} className="form-label flex items-center">上図の赤枠部分を入力してください。</Typography>
                                            </Box>
                                            <Box className="w-full inline-block mt-2">
                                                <input
                                                    type="text"
                                                    id="details"
                                                    value={details}
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

                    {is_owned_by_decedent === 1 ?
                        <>
                            <Box className="bg-custom-light mt-10 py-3 px-5 w-full inline-block">
                                <Typography component={"label"} className="form-label" id="demo-row-radio-buttons-group-label">土地の詳細の入力</Typography>
                            </Box>
                            <Box className="mt-5">
                                <Typography component={"label"}>※当システムでは最も高い路線価が付されている土地を正面路線として自動的に評価額を計算しております。</Typography><br />
                                <Typography component={"label"}>※角地準角地の違いについては、下記のリンクをご参照ください。</Typography>
                                <Box className="mt-1 steps-details">
                                    <Typography fontSize={14} target="blank" lineHeight={2} letterSpacing={0} component={Link} href={"https://www.nta.go.jp/law/tsutatsu/kihon/sisan/hyoka_new/02/07.htm"} className="text-blue-600 mt-1">　https://www.nta.go.jp/law/tsutatsu/kihon/sisan/hyoka_new/02/07.htm</Typography>
                                </Box>
                                <Box className="mt-1 steps-details">
                                    <Typography component={"label"}>※奥行き価格補正、不整形地補正、地籍規模の大きな宅地の評価減等の補正の適用をご希望の場合は、</Typography>
                                    <Typography component={"label"}>　上部の「ご相談・お問い合わせ」からお問い合わせください。税理士による有料サポートにて対応いたします。</Typography>
                                </Box>
                            </Box>
                            <Box className="w-full flex items-center justify-between mt-3 mb-7">
                                <Box className="w-full lg:w-65 xl:w-65 2xl:w-65 block float-left">
                                    <Box className="w-full inline-block mt-2 relative">
                                        <FormControl>
                                            <RadioGroup
                                                aria-labelledby="demo-row-radio-buttons-group-label"
                                                name="row-radio-buttons-group"
                                                value={DisabledRadioValue}>
                                                <FormControlLabel value="1" className="mt-3" control={<Radio />} onChange={handleDisabledRadio} label="パターン1(1つの道路 (正面)のみに接している場 合)" sx={{
                                                    '& .MuiSvgIcon-root': {
                                                        fontSize: 16,
                                                    },
                                                }} />
                                                <FormControlLabel value="2" className="mt-3" control={<Radio />} onChange={handleDisabledRadio} label="パターン2(2つの道路 (正面と裏面) に接している場 合)" sx={{
                                                    '& .MuiSvgIcon-root': {
                                                        fontSize: 16,
                                                    },
                                                }} />
                                                <FormControlLabel value="3" className="mt-3" control={<Radio />} onChange={handleDisabledRadio} label="パターン３（２つの道路（正面と側方）に接している場合）" sx={{
                                                    '& .MuiSvgIcon-root': {
                                                        fontSize: 16,
                                                    },
                                                }} />
                                                <FormControlLabel value="4" className="mt-3" control={<Radio />} onChange={handleDisabledRadio} label="パターン４（３つの道路に接している場合）" sx={{
                                                    '& .MuiSvgIcon-root': {
                                                        fontSize: 16,
                                                    },
                                                }} />
                                                <FormControlLabel value="5" className="mt-3" control={<Radio />} onChange={handleDisabledRadio} label="パターン5（4つの道路に接している場合）" sx={{
                                                    '& .MuiSvgIcon-root': {
                                                        fontSize: 16,
                                                    },
                                                }} />
                                            </RadioGroup>
                                        </FormControl>
                                    </Box>
                                </Box>

                                <Box className="w-full lg:w-35 xl:w-35 2xl:w-35 inline-block float-left">
                                    <Box className="w-full inline-block mt-2">
                                        {ShowImageOne && (
                                            <Image className="mx-auto w-full" src="/land_item01.png" alt="image-one" height={100} width={200} priority />
                                        )}
                                        {ShowImageTwo && (
                                            <Image className="mx-auto w-full" src="/land_item02.png" alt="image-one" height={100} width={200} priority />
                                        )}
                                        {ShowImageThree && (
                                            <Image className="mx-auto w-full" src="/land_item03.png" alt="image-one" height={100} width={200} priority />
                                        )}
                                        {ShowImageFour && (
                                            <Image className="mx-auto w-full" src="/land_item04.png" alt="image-one" height={100} width={200} priority />
                                        )}
                                        {ShowImageFive && (
                                            <Image className="mx-auto w-full" src="/land_item05.png" alt="image-one" height={100} width={200} priority />
                                        )}
                                    </Box>
                                </Box>
                            </Box>

                            <Box className="w-full inline-block py-5">
                                <Box classsName="table-columns">
                                    {ShowTableOne && (
                                        <TableOne road_price_1={road_price_1} setroad_price_1={setroad_price_1} regional_distinction_1={regional_distinction_1} setregional_distinction_1={setregional_distinction_1} corner_semi_corner_1={corner_semi_corner_1} setcorner_semi_corner_1={setcorner_semi_corner_1} />
                                    )}
                                    {ShowTableTwo && (
                                        <TableTwo road_price_2={road_price_2} setroad_price_2={setroad_price_2} regional_distinction_2={regional_distinction_2} setregional_distinction_2={setregional_distinction_2} corner_semi_corner_3={corner_semi_corner_2} setcorner_semi_corner_2={setcorner_semi_corner_2}  />
                                    )}
                                    {ShowTableThree && (
                                        <TableThree road_price_3={road_price_3} setroad_price_3={setroad_price_3} regional_distinction_3={regional_distinction_3} setregional_distinction_3={setregional_distinction_3} corner_semi_corner_3={corner_semi_corner_3} setcorner_semi_corner_3={setcorner_semi_corner_3}  />
                                    )}
                                    {ShowTableFour && (
                                        <TableFour road_price_4={road_price_4} setroad_price_4={setroad_price_4} regional_distinction_4={regional_distinction_4} setregional_distinction_4={setregional_distinction_4} corner_semi_corner_4={corner_semi_corner_4} setcorner_semi_corner_4={setcorner_semi_corner_4}  />
                                    )}
                                    {ShowTableFive && (
                                        <TableFive road_price_4={road_price_4} setroad_price_4={setroad_price_4} regional_distinction_4={regional_distinction_4} setregional_distinction_4={setregional_distinction_4} corner_semi_corner_4={corner_semi_corner_4} setcorner_semi_corner_4={setcorner_semi_corner_4}  />
                                    )}
                                </Box>
                            </Box>
                        </>
                        :
                        <></>
                    }

                    <Box className="mb-7">
                        <FormControl>
                            <Typography component={"label"} className="form-label text-lg" id="demo-row-radio-buttons-group-label">3. 所有されていた物件に共有者はいましたか。</Typography>
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
                                <Box className="w-full block items-center justify-between mb-7">
                                    <Box className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                        <Box className="label w-full inline-block">
                                            <Typography component={"label"} className="form-label">共有割合の入力</Typography>
                                        </Box>
                                        <Box className="w-full inline-block mt-2">
                                            <Box className="flex justify-between items-center">
                                                <Box><input
                                                    type="text"
                                                    id="co_owner_share_percentage_numerator"
                                                    value={co_owner_share_percentage_numerator}
                                                    onChange={inputHandlingFunction}
                                                    className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                                /></Box>
                                                <Box>
                                                    <span className="text-3xl text-gray-500">/</span>
                                                </Box>
                                                <Box><input
                                                    type="text"
                                                    id="co_owner_share_percentage_denominator"
                                                    value={co_owner_share_percentage_denominator}
                                                    onChange={inputHandlingFunction}
                                                    className="text-right form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                                /></Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </>
                            :
                            <></>
                        }
                    </Box>

                    <Box className="mb-7">
                        <FormControl>
                            <Typography component={"label"} className="form-label text-lg" id="demo-row-radio-buttons-group-label">4. 総階数3階以上のマンションでしょうか</Typography>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={is_land_with_3_or_more_floors}
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
                        {is_land_with_3_or_more_floors === 1 ?
                            <>
                                <Box className="w-full inline-block">
                                    <Box className="w-full mb-2"><Typography component={"label"}>建物の入力時に自動計算された区分所有補正率を入力してください</Typography></Box>
                                    <Box className="w-full">
                                        <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                            <input
                                                type="text"
                                                id="condominium_correction_rate"
                                                value={condominium_correction_rate}
                                                onChange={inputHandlingFunction}
                                                onKeyPress={handleKeyPress}
                                                className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            />
                                            {condominium_correction_rate_error && (
                                                <Typography component={"p"} className="text-red-500" role="alert">この項目は必須です</Typography>
                                            )}
                                        </Box>
                                    </Box>
                                </Box>
                            </>
                            :
                            <></>
                        }
                    </Box>

                    <Box className="w-full inline-block">
                        <Box className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left mb-16">
                            <Box className="label w-full inline-block">
                                <Typography component={"label"} className="form-label text-lg" htmlFor="Valuation">
                                    5. 評価額
                                </Typography>
                            </Box>
                            <Box className="w-full inline-block mt-2">
                                <input
                                    type="text"
                                    id="appraisal_value"
                                    value={appraisal_value}
                                    onChange={inputHandlingFunction}
                                    onKeyPress={handleKeyPress}
                                    className="form-control text-right w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                />
                                {appraisal_value_error && (
                                    <Typography component={"p"} className="text-red-500" role="alert">この項目は必須です</Typography>
                                )}
                            </Box>
                        </Box>
                    </Box>
                    <Box className="Total-property-section py-10 lg:py-20 xl:py-20 2xl:py-20 px-20 lg:px-36 xl:px-36 2xl:px-36 mx-auto w-full lg:max-w-screen-md xl:max-w-screen-md 2xl:max-w-screen-md">
                        <Box className="w-full block lg:flex xl:flex 2xl:flex justify-evenly items-center">
                            <BackButton />
                            <SubmitButton onSubmit={onSubmit} isSumbitDisabled={isSumbitDisabled} />
                        </Box>
                    </Box>
                </form>
            </Box>
        </>
    )
}

LandAdd.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};