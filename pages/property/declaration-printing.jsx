/* eslint-disable react/jsx-key */
import React, { useState, Fragment } from "react";
import { Box, Typography } from '@mui/material';
import BackButton from "../../components/back-btn";
import FullLayout from '../../components/layouts/full/FullLayout';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const tableList = [
    {
        id: 1,
        class: "",
        heading: "第1表",
        secondheading: "相続税の申告書",
        icon: <PictureAsPdfIcon className="text-white" />,
        path: "/gift-various/exceptions-residential-land",
    },
    {
        id: 2,
        class: "",
        heading: "第2表",
        secondheading: "相続税の総額の計算書",
        icon: <PictureAsPdfIcon className="text-white" />,
        path: "/gift-various/gifts-taxation",
    },
    {
        id: 3,
        class: "",
        heading: "第4表",
        secondheading: "相続税額の加算金額の計算書",
        icon: <PictureAsPdfIcon className="text-white" />,
        path: "/gift-various/deduction-minors",
    },
    {
        id: 4,
        class: "",
        heading: "第4表の2",
        secondheading: "暦年課税分の贈与税額控除額の計算書",
        icon: <PictureAsPdfIcon className="text-white" />,
        path: "",
    },
    {
        id: 5,
        class: "",
        heading: "第5表",
        secondheading: "配偶者の税額軽減額の計算書",
        icon: <PictureAsPdfIcon className="text-white" />,
        path: "",
    },
    {
        id: 6,
        class: "",
        heading: "第6表",
        secondheading: "未成年者・障害者控除額の計算書",
        icon: <PictureAsPdfIcon className="text-white" />,
        path: "/gift-various/allocation-amount",
    },
    {
        id: 7,
        class: "",
        heading: "第7表",
        secondheading: "相次相続控除額の計算書",
        icon: <PictureAsPdfIcon className="text-white" />,
        path: "/gift-various/successive-inheritance",
    },
    {
        id: 8,
        class: "",
        heading: "第9表",
        secondheading: "生命保険金などの明細書",
        icon: <PictureAsPdfIcon className="text-white" />,
        path: "",
    },
    {
        id: 9,
        class: "",
        heading: "第10表",
        secondheading: "退職手当金などの明細書",
        icon: <PictureAsPdfIcon className="text-white" />,
        path: "",
    },
    {
        id: 10,
        class: "",
        heading: "第11表",
        secondheading: "相続税がかかる財産の合計表（相続時精算課税適用財産を除きます。）",
        icon: <PictureAsPdfIcon className="text-white" />,
        path: "",
    },
    {
        id: 11,
        class: "",
        heading: "第11表の付表1",
        secondheading: "相続税がかかる財産の明細書（土地・家屋等用）",
        icon: <PictureAsPdfIcon className="text-white" />,
        path: "",
    },
    {
        id: 12,
        class: "",
        heading: "第11表の付表2",
        secondheading: "相続税がかかる財産の明細書（有価証券用）",
        icon: <PictureAsPdfIcon className="text-white" />,
        path: "",
    },
    {
        id: 13,
        class: "",
        heading: "第11表の付表3",
        secondheading: "相続税がかかる財産の明細書（現金・預貯金等用）",
        icon: <PictureAsPdfIcon className="text-white" />,
        path: "",
    },
    {
        id: 14,
        class: "",
        heading: "第11表の付表4",
        secondheading: "相続税がかかる財産の明細書（事業（農業）用財産・家庭用財産・その他の財産用）",
        icon: <PictureAsPdfIcon className="text-white" />,
        path: "",
    },
    {
        id: 15,
        class: "",
        heading: "第11・11の2表の付表1",
        secondheading: "小規模宅地等についての課税価格の計算明細書",
        icon: <PictureAsPdfIcon className="text-white" />,
        path: "",
    },
    {
        id: 16,
        class: "",
        heading: "第13表",
        secondheading: "債務及び葬式費用の明細書",
        icon: <PictureAsPdfIcon className="text-white" />,
        path: "",
    },
    {
        id: 17,
        class: "",
        heading: "第13表",
        secondheading: "債務及び葬式費用の明細書",
        icon: <PictureAsPdfIcon className="text-white" />,
        path: "",
    },
    {
        id: 18,
        class: "",
        heading: "第14表",
        secondheading: "純資産価額に加算される暦年課税分の贈与財産価額及び特定",
        secondheading1: "贈与財産価額明細書",
        secondheading2: "遺贈・寄附した財産の明細書",
        icon: <PictureAsPdfIcon className="text-white" />,
        path: "/gift-various/successive-inheritance",
    },
    {
        id: 19,
        class: "",
        heading: "第15表",
        secondheading: "相続財産の種類別価額表",
        icon: <PictureAsPdfIcon className="text-white" />,
        path: "",
    },
    {
        id: 20,
        class: "",
        heading: "第15表（続）",
        secondheading: "相続財産の種類別価額表（続）",
        icon: <PictureAsPdfIcon className="text-white" />,
        path: "",
    },
];


export default function DeclarationPrinting() {
    let [ApiRoute, setApiRoute] = useState("");
    let [auth_key, setauth_key] = useState("");
    let [SnackbarOpen, setSnackbarOpen] = useState(false);
    let [SnackbarMsg, setSnackbarMsg] = useState("success");
    let [VariantSnackbar, setVariantSnackbar] = useState("success");

    const TargetBlankClick = async (event) => {
        setApiRoute("");
        auth_key = atob(localStorage.getItem("mine_life_auth_key"));
        setauth_key(auth_key);
        let tableHeading = event.currentTarget.id;
        if (tableHeading === "第1表") {
            ApiRoute = "generate_table_1_pdf";
        }
        else if (tableHeading === "第2表") {
            ApiRoute = "generate_table_2_pdf";
        }
        else if (tableHeading === "第4表") {
            ApiRoute = "generate_table_4_pdf";
        }
        else if (tableHeading === "第4表の2") {
            ApiRoute = "generate_table_4_2_pdf";
        }
        else if (tableHeading === "第5表") {
            ApiRoute = "generate_table_5_pdf";
        }
        else if (tableHeading === "第6表") {
            ApiRoute = "generate_table_6_pdf";
        }
        else if (tableHeading === "第7表") {
            ApiRoute = "generate_table_7_pdf";
        }
        else if (tableHeading === "第9表") {
            ApiRoute = "generate_table_9_pdf";
        }
        else if (tableHeading === "第10表") {
            ApiRoute = "generate_table_10_pdf";
        }
        else if (tableHeading === "第11表") {
            ApiRoute = "generate_table_11_pdf";
        }
        else if (tableHeading === "第11表の付表1") {
            ApiRoute = "generate_table_11_1_pdf";
        }
        else if (tableHeading === "第11表の付表2") {
            ApiRoute = "generate_table_11_2_pdf";
        }
        else if (tableHeading === "第11表の付表3") {
            ApiRoute = "generate_table_11_3_pdf";
        }
        else if (tableHeading === "第11表の付表4") {
            ApiRoute = "generate_table_11_4_pdf";
        }
        else if (tableHeading === "第11・11の2表の付表1") {
            ApiRoute = "generate_table_11_11_pdf";
        }
        else if (tableHeading === "第13表") {
            ApiRoute = "generate_table_13_pdf";
        }
        else if (tableHeading === "第14表") {
            ApiRoute = "generate_table_14_pdf";
        }
        else if (tableHeading === "第15表") {
            ApiRoute = "generate_table_15_pdf";
        }
        else if (tableHeading === "第15表（続）") {
            ApiRoute = "generate_table_15_1_pdf";
        }
        if (ApiRoute !== "") {
            let response;
            try {
                response = await fetch(`https://minelife-api.azurewebsites.net/${ApiRoute}?auth_key=${auth_key}`);
                if (!response.ok) throw new Error(response);
                if (response.ok) {
                    window.open(response.url, '_blank');
                }
            } catch (error) {
                setVariantSnackbar("error");
                setSnackbarMsg(response?.error.message);
                setSnackbarOpen(true);
                console.log("Error", error);
            }
        }
        else {
            setVariantSnackbar("error");
            setSnackbarMsg("No data found!");
            setSnackbarOpen(true);
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };


    return (
        <>
            <Snackbar open={SnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert
                    onClose={handleSnackbarClose}
                    severity={VariantSnackbar}
                    variant="filled"
                    sx={{ width: '100%', color: "#FFF" }}
                >
                    {SnackbarMsg}
                </Alert>
            </Snackbar>

            <Box className="summary-property-wrapper">
                <Box className="bg-custom-light rounded-sm px-8 h-14 flex items-center">
                    <Box className="page-heading">
                        <Typography component={"p"} className="text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-xl text-black text-left font-medium">
                            3年以内贈与・各種特例・税額控除の入力
                        </Typography>
                    </Box>
                </Box>
                <Box className="page-description py-8">
                    <Typography component={"p"} className="text-sm lg:text-base xl:text-base 2xl:text-base tracking-2 text-black text-left font-medium">
                        入力おつかれさまでした。ご入力いただいた情報を基に作成された相続税申告書のダウンロードができます。<br />
                        マイナンバーおよび提出日を手書きしてください。
                    </Typography>
                </Box>

                <Box className="summary-tables-wrapper max-w-screen-md mx-auto">
                    <Box className="py-5 text-center w-full inline-block">
                        <Typography component={"h5"} className="text-xl font-medium tracking-2">個別ダウンロード</Typography>
                    </Box>
                    <table className="text-left table">
                        <tbody>
                            {tableList.map((list) => {
                                return (
                                    <tr className="border-t w-full" id={list.id}>
                                        <td className={list.class ? "line-through w-50 py-5" : "w-50 py-5"}>{list.heading}</td>
                                        <td className={list.class ? "line-through w-50 py-5" : "w-50 py-5"}>{list.secondheading}</td>
                                        <td className="pl-10">
                                            <button onClick={TargetBlankClick} id={list.heading} className="text-sm bg-primary-color rounded-sm hover:bg-primary-color px-1 py-1 tracking-2 text-custom-black">
                                                {list.icon}
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </Box>

                <Box className="w-full hidden justify-evenly items-center py-10">
                    <BackButton />
                    <Box className="save-btn text-center">
                        <button
                            type="submit"
                            className="bg-primary-color rounded px-4 md:px-6 lg:px-10 xl:px-10 2xl:px-10 py-1 md:py-2 lg:py-3 xl:py-3 2xl:py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                        >
                            <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                                保存
                            </span>
                        </button>
                    </Box>
                </Box>
            </Box>
        </>
    )
}


DeclarationPrinting.getLayout = function getLayout(page) {
    return <FullLayout>{page}</FullLayout>;
};