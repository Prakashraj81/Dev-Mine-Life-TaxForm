export default function IncorrectError({ IncorrectError }) {
    return (
        <>
            {IncorrectError && (
                <div className="show-error py-5">
                    <p className="text-left text-red-500">金額配分が正しくありません</p>
                </div>
            )}
        </>
    )
}