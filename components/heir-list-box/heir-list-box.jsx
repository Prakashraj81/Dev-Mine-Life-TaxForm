export default function HeirListBox({ FunhandleBoxValueChange, FunHandleKeyPress, VarUndecidedHeir, VarAmountofMoney }) {

    let HeirList = [
        { id: 1, name: "User", name1: "山田　太郎" },
        { id: 2, name: "Shree", name1: "Shree" },
        { id: 3, name: "Prakashraj", name1: "Prakashraj" },
        { id: 4, name: "Gowtham", name1: "Gowtham" },
    ];

    return (
        <>
            <ul>
                <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                    <span>受取人</span>
                    <span>取得財産の価額</span>
                </li>
                {HeirList.map((heirlist, index) => (
                    <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                        <span>{heirlist.name}</span>
                        <div className="text-right"><input id={heirlist.id} type="text" autoComplete="off" className="border-2 h-10 text-right form-control w-50 outline-none"
                            onChange={(e) => FunhandleBoxValueChange(e, index)}
                            onKeyPress={FunHandleKeyPress}
                        /></div>
                    </li>
                ))}
                <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                    <span>相続人未決定</span>
                    <span>{VarUndecidedHeir}</span>
                </li>
                <li className="w-full flex justify-between items-center text-sm tracking-2 font-medium border-t-2 py-3">
                    <span>合計</span>
                    <span>{VarAmountofMoney}</span>
                </li>
            </ul>
        </>
    )
}