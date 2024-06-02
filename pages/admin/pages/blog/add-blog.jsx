import React from "react";
import FullLayout from "../../../components/layouts/full/FullLayout";

export default function AddBlog() {
    return(
        <>
        </>
    )
}

AddBlog.getLayout = function getLayout(page) {
  return <FullLayout>{page}</FullLayout>;
};