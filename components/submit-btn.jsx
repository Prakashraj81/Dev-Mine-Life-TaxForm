import React, { useState, useEffect } from "react";

export default function SubmitButton({ onSubmit, isSumbitDisabled }) {
    let [ShowLoader, setShowLoader] = useState(true);
    return (
        <>     
            <div className="save-btn text-center">
                <button
                    type="button"
                    onClick={onSubmit}
                    disabled={isSumbitDisabled}
                    className={isSumbitDisabled ? "cursor-not-allowed bg-custom-light rounded px-10 py-3 text-white" : "cursor-pointer bg-primary-color rounded px-10 py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"}
                >                   
                    <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                        保存
                    </span>
                </button>
            </div>
        </>
    )
}