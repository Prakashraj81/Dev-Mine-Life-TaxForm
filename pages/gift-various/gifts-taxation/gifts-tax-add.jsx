"use client";
import Link from "next/link";
import { useState, Fragment, Controller } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

export default function GiftTaxAdd() {    

    let GiftTypeList = [
        { id: 1, value: '一般贈与', label: '一般贈与' },
        { id: 2, value: '特例贈与', label: '特例贈与' },
        { id: 3, value: '相続時精算課税', label: '相続時精算課税' },
        { id: 4, value: '特定贈与', label: '特定贈与' },
    ];

    let PropertyList = [
        { id: 1, value: '現金・預貯金', label: '現金・預貯金' },
        { id: 2, value: '有価証券', label: '有価証券' },
        { id: 3, value: '家屋', label: '家屋' },
        { id: 4, value: '土地', label: '土地' },
        { id: 5, value: 'その他財産', label: 'その他財産' },
        { id: 6, value: '事業用財産', label: '事業用財産' },
        { id: 7, value: '外貨', label: '外貨' },
    ];

    let CashSavingsList = [
        { id: 1, value: '現金', label: '現金' },
        { id: 2, value: '普通預金', label: '普通預金' },
        { id: 3, value: '当座預金', label: '当座預金' },
        { id: 4, value: '定期預金', label: '定期預金' },
        { id: 5, value: '決済用預金', label: '決済用預金' },
        { id: 6, value: '貯蓄預金', label: '貯蓄預金' },
        { id: 7, value: '仕組預金', label: '仕組預金' },
        { id: 8, value: '通知預金', label: '通知預金' },
        { id: 9, value: '納税準備預金', label: '納税準備預金' },
        { id: 10, value: '普通貯金', label: '普通貯金' },
        { id: 11, value: '通常貯金', label: '通常貯金' },
        { id: 12, value: '貯蓄貯金', label: '貯蓄貯金' },
        { id: 13, value: '定期貯金', label: '定期貯金' },
        { id: 13, value: '定額貯金', label: '定額貯金' },
        { id: 14, value: '定期積金', label: '定期積金' },
        { id: 15, value: '金銭信託', label: '金銭信託' },
        { id: 16, value: 'その他', label: 'その他' },
    ];

    let SecuritiesList = [
        { id: 1, value: '特定同族会社の株式出資（配当還元方式）', label: '特定同族会社の株式出資（配当還元方式）' },
        { id: 2, value: '特定同族会社の株式出資（その他の方式）', label: '特定同族会社の株式出資（その他の方式）' },
        { id: 3, value: '上記以外の株式（上場株式など）', label: '上記以外の株式（上場株式など）' },
        { id: 4, value: '出資', label: '出資' },
        { id: 5, value: '公債', label: '公債' },
        { id: 6, value: '社債', label: '社債' },
        { id: 7, value: '証券投資信託の受益証券', label: '証券投資信託の受益証券' },
        { id: 8, value: '貸付信託の受益証券', label: '貸付信託の受益証券' },
    ];

    let HouseList = [
        { id: 1, value: '家屋', label: '家屋' },
        { id: 2, value: '構築物', label: '構築物' },
    ];

    let LandList = [
        { id: 1, value: '宅地', label: '宅地' },
        { id: 2, value: '借地権', label: '借地権' },
        { id: 3, value: '田', label: '田' },
        { id: 4, value: '畑', label: '畑' },
        { id: 5, value: '山林', label: '山林' },
        { id: 6, value: 'その他の土地', label: 'その他の土地' },
    ];

    let BusinessPropertyList = [
        { id: 1, value: '機械', label: '機械' },
        { id: 2, value: '器具', label: '器具' },
        { id: 3, value: '農機具', label: '農機具' },
        { id: 4, value: 'その他の減価償却資産', label: 'その他の減価償却資産' },
        { id: 5, value: '商品', label: '商品' },
        { id: 6, value: '製品', label: '製品' },
        { id: 7, value: '半製品', label: '半製品' },
        { id: 8, value: '原材料', label: '原材料' },
        { id: 9, value: '農産物等', label: '農産物等' },
        { id: 10, value: '売掛金', label: '売掛金' },
        { id: 11, value: 'その他財産', label: 'その他財産' },
    ]


    const [GiftType, setGiftType] = useState("");
    const [DateofGift, setDateofGift] = useState("");
    const [TypeofProperty, setTypeofProperty] = useState("");
    const [PropertyDetails, setPropertyDetails] = useState("");
    const [PostCode, setPostCode] = useState(0);
    const [Address, setAddress] = useState("");
    const [Quantity, setQuantity] = useState(0);
    const [GiftAmount, setGiftAmount] = useState(0);
    const [AmountofGiftTax, setAmountofGiftTax] = useState(0);
    const [GiftTaxReturnType, setGiftTaxReturnType] = useState("");
    const [Location, setLocation] = useState("");
    const [Breadth, setBreadth] = useState(0);


    let [PropertyOptionsData, setPropertyOptionsData] = useState([]);
    let [SelectedPropertList, setSelectedPropertList] = useState('');

    let [ShowPostCode, setShowPostCode] = useState(true);
    let [ShowAddress, setShowAddress] = useState(true);
    let [ShowQuantity, setShowQuantity] = useState(true);
    let [ShowLocation, setShowLocation] = useState(true);
    let [ShowGiftAmountandGiftTax, setShowGiftAmountandGiftTax] = useState(true);
    let [ShowBreadth, setShowBreadth] = useState(true);

    const { control, register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            GiftType: "",
            DateofGift: "",
            TypeofProperty: "",
            PropertyDetails: "",
            PostCode: 0,
            Address: "",
            Quantity: 0,
            GiftAmount: 0,
            AmountofGiftTax: 0,
            GiftTaxReturnType: "",
            Location: "",
            Breadth: 0,
        }
    });

    const handleDropdownChange = (event) => {
        var selectedId = Number(event.target.value);
        setGiftType(selectedId);
    };

    const PropertyDetailsChange = (event) => {
        var selectedOption = event.target.options[event.target.selectedIndex];
        setPropertyDetails(selectedOption.text);
        let DetailsId = Number(selectedOption.value);
        let property_value = TypeofProperty;
        if(property_value === "現金・預貯金" || property_value === "外貨" || property_value === "Cash/savings" || property_value === "foreign currency"){
            if(DetailsId === 2){            
                setShowBreadth(false);            
                setShowPostCode(false);
                setShowAddress(false);
                setShowLocation(true);
                setShowQuantity(true);
            }        
            else{
                setShowBreadth(false);   
                setShowLocation(false);
                setShowQuantity(false);
                setShowPostCode(true);
                setShowAddress(true);
            }
        }
    }

    //Property select box
    const handlePropertyChange = (event) => {
        var selectedOption = event.target.options[event.target.selectedIndex];
        setTypeofProperty(selectedOption.text);
        let selectedId = Number(selectedOption.value);
        if (selectedId === 1) {
            setPropertyOptionsData(CashSavingsList);
            setShowLocation(false);
            setShowBreadth(false);
            setShowPostCode(true);
            setShowAddress(true);
            setShowQuantity(true);
        }
        else if (selectedId === 2) {
            setPropertyOptionsData(SecuritiesList);
            setShowPostCode(false);
            setShowAddress(false);
            setShowBreadth(false);
            setShowLocation(true);
            setShowQuantity(true);
        }
        else if (selectedId === 3) {
            setPropertyOptionsData(HouseList);
            setShowLocation(false);
            setShowQuantity(false);
            setShowBreadth(true);
            setShowPostCode(true);
            setShowAddress(true);
        }
        else if (selectedId === 4) {
            setPropertyOptionsData(LandList);
            setShowLocation(false);
            setShowQuantity(false);
            setShowBreadth(true);
            setShowPostCode(true);
            setShowAddress(true);
        }
        else if (selectedId === 5) {
            setPropertyOptionsData([]);
            setShowLocation(false);
            setShowBreadth(false);
            setShowPostCode(true);
            setShowAddress(true);
            setShowQuantity(true);
        }
        else if (selectedId === 6) {
            setPropertyOptionsData(BusinessPropertyList);
            setShowLocation(false);
            setShowBreadth(false);
            setShowPostCode(true);
            setShowAddress(true);
            setShowQuantity(true);
        }
        else if (selectedId === 7) {
            setPropertyOptionsData(CashSavingsList);
            setShowLocation(false);
            setShowBreadth(false);
            setShowPostCode(true);
            setShowAddress(true);
            setShowQuantity(true);
        }
        else {
            setPropertyOptionsData([]);
            setShowLocation(false);
            setShowBreadth(false);
            setShowPostCode(true);
            setShowAddress(true);
            setShowQuantity(true);
        }
    };



    const onSubmit = async (defaultValues) => {
        var value = JSON.stringify(defaultValues);
        console.log(value);
        if (value.PropertyName != "") {
            var Apiurl = "/";
            const urlresponse = await fetch(Apiurl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(defaultValues),
                mode: "no-cors",
            });
        }
        else {
            //router.push('/declaration-printing/other-property/other-property-others');
        }
        //res.status(200).end()
    };




    return (
        <>
            <div className="other-property-wrapper">
                <div className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <div className="page-heading">
                        <p className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            その他の財産1
                        </p>
                    </div>
                </div>
                <div className="page-description py-8">
                    <p className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        以下の内容を入力して[保存して戻る]ボタンを押して下さい。
                    </p>
                </div>

                <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full flex items-center justify-between mb-7">
                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="user-details">
                                <div className="label w-full inline-block">
                                    <label className="form-label">
                                        贈与の種類
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2'>
                                        <option value=''>select an option</option>
                                        {GiftTypeList.map((option) => (
                                            <option key={option.value} value={option.id}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="label w-full inline-block">
                                <label htmlFor="DateofGift" className="form-label">
                                    贈与を受けた日
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <input
                                    type="date"
                                    id="DateofGift"
                                    className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                    {...register("DateofGift", { required: "DateofGift is required" })}
                                    aria-invalid={errors.DateofGift ? "true" : "false"}
                                />
                                {errors.DateofGift && <p className="text-red-500 mt-2" role="alert">{errors.DateofGift?.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex items-center justify-between mb-7">
                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="user-details">
                                <div className="label w-full inline-block">
                                    <label htmlFor="TypeofProperty" className="form-label">
                                        財産の種類
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' onChange={handlePropertyChange}>
                                        <option value=''>select an option</option>
                                        {PropertyList.map((option) => (
                                            <option key={option.value} value={option.id}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                            <div className="label w-full inline-block">
                                <label htmlFor="PropertyDetails" className="form-label">
                                    財産の細目
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2' onChange={PropertyDetailsChange}>
                                    <option value=''>select an option</option>
                                    {PropertyOptionsData.map((option) => (
                                        <option key={option.value} value={option.id}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {ShowPostCode && (
                        <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <div className="label w-full inline-block">
                                    <label className="form-label">
                                        所在場所
                                    </label>
                                    <label className="form-label mt-3">
                                        郵便番号
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="PostCode"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("PostCode", { required: "PostCode is required" })}
                                        aria-invalid={errors.PostCode ? "true" : "false"}
                                    />
                                    {errors.PostCode && <p className="text-red-500 mt-2" role="alert">{errors.PostCode?.message}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {ShowAddress && (
                        <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details w-full inline-block">
                                <div className="label w-full inline-block">
                                    <label className="form-label">
                                        住所
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="Address"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("Address", { required: "Address is required" })}
                                        aria-invalid={errors.Address ? "true" : "false"}
                                    />
                                    {errors.Address && <p className="text-red-500 mt-2" role="alert">{errors.Address?.message}</p>}
                                </div>
                            </div>
                        </div>
                    )}

                    {ShowBreadth && (
                        <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <div className="label w-full inline-block">
                                    <label className="form-label">
                                        広さ
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="Breadth"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("Breadth", { required: "Breadth is required" })}
                                        aria-invalid={errors.Breadth ? "true" : "false"}
                                    />
                                    {errors.Breadth && <p className="text-red-500 mt-2" role="alert">{errors.Breadth?.message}</p>}
                                </div>
                            </div>
                        </div>

                    )}

                    {ShowLocation && (
                        <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details w-full block">
                                <div className="label w-full inline-block">
                                    <label className="form-label">
                                        所在場所
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="Location"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("Location", { required: "Location is required" })}
                                        aria-invalid={errors.Location ? "true" : "false"}
                                    />
                                    {errors.Location && <p className="text-red-500 mt-2" role="alert">{errors.Location?.message}</p>}
                                </div>
                            </div>
                        </div>

                    )}

                    {ShowQuantity && (
                        <div className="w-full block items-center justify-between mb-7">
                            <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                                <div className="label w-full inline-block">
                                    <label className="form-label">
                                        数量
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="Quantity"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("Quantity", { required: "Quantity is required" })}
                                        aria-invalid={errors.Quantity ? "true" : "false"}
                                    />
                                    {errors.Quantity && <p className="text-red-500 mt-2" role="alert">{errors.Quantity?.message}</p>}
                                </div>
                            </div>
                        </div>

                    )}

                    {ShowGiftAmountandGiftTax && (
                        <div className="w-full flex items-center justify-between mb-7">
                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="user-details">
                                    <div className="label w-full inline-block">
                                        <label htmlFor="GiftAmount" className="form-label">
                                            贈与を受けた額
                                        </label>
                                    </div>
                                    <div className="w-full inline-block mt-2">
                                        <input
                                            type="text"
                                            id="GiftAmount"
                                            className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                            {...register("GiftAmount", { required: "GiftAmount is required" })}
                                            aria-invalid={errors.GiftAmount ? "true" : "false"}
                                        />
                                        {errors.GiftAmount && <p className="text-red-500 mt-2" role="alert">{errors.GiftAmount?.message}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="w-full lg:w-48 xl:w-48 2xl:w-48 inline-block float-left">
                                <div className="label w-full inline-block">
                                    <label htmlFor="AmountofGiftTax" className="form-label">
                                        贈与に伴って支払った贈与税額
                                    </label>
                                </div>
                                <div className="w-full inline-block mt-2">
                                    <input
                                        type="text"
                                        id="AmountofGiftTax"
                                        className="form-control w-full bg-custom-gray focus:outline-none rounded h-12 pl-3"
                                        {...register("AmountofGiftTax", { required: "AmountofGiftTax is required" })}
                                        aria-invalid={errors.AmountofGiftTax ? "true" : "false"}
                                    />
                                    {errors.AmountofGiftTax && <p className="text-red-500 mt-2" role="alert">{errors.AmountofGiftTax?.message}</p>}
                                </div>
                            </div>
                        </div>
                    )}


                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label className="form-label">
                                    贈与税申告書の提出先
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2'>
                                    <option value=''>select an option</option>                                    
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="w-full block items-center justify-between mb-7">
                        <div className="user-details w-full lg:w-48 xl:w-48 2xl:w-48 block">
                            <div className="label w-full inline-block">
                                <label className="form-label">
                                    贈与を受けた人
                                </label>
                            </div>
                            <div className="w-full inline-block mt-2">
                                <select className='form-control w-full bg-custom-gray focus:outline-none rounded h-12 px-2'>
                                    <option value=''>select an option</option>                                    
                                </select>
                            </div>
                        </div>
                    </div>





                    <div className="w-full block lg:flex xl:flex 2xl:flex justify-evenly items-center">
                        <div className="save-btn text-center">
                            <Link href="/">
                                <button
                                    className="bg-return-bg rounded px-10 py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                                >
                                    <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                                        戻る
                                    </span>
                                </button>
                            </Link>
                        </div>
                        <div className="save-btn text-center">
                            <Link href="/declaration-printing/other-property/other-property-others">
                                <button

                                    className="bg-primary-color rounded  px-10 py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                                >
                                    <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                                        保存して戻る
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="heading text-center pt-8">
                        <h5 className="text-sm text-black tracking-2 font-medium">必須入力項目があります。</h5>
                    </div>
                </form>


            </div>
        </>
    )
}