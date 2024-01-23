import React from 'react';
import { useRouter } from 'next/router';

const BackButton = () => {
    const router = useRouter();

    const goToPreviousPage = () => {
        router.back(); // This navigates to the previous page
    };

    return (
        <>
            <div className="back-btn text-center">
                <button
                    type='button'
                    onClick={goToPreviousPage}
                    className="bg-return-bg rounded px-4 md:px-6 lg:px-10 xl:px-10 2xl:px-10 py-1 md:py-2 lg:py-3 xl:py-3 2xl:py-3 text-white hover:text-black hover:bg-gray-200 transition-colors duration-300"
                >
                    <span className="text-sm lg:text-base xl:text-base 2xl:text-base font-medium">
                    保存せず戻る
                    </span>
                </button>
            </div>
        </>
    )
};

export default BackButton;
