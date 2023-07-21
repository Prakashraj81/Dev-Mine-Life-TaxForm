const Menuitems = [
  //First
  {
    id: 1,
    title: "基礎情報の入力",
    icon: "home",
    href: "",
    child: [
      {        
        title: "基礎情報の入力",
        icon: "disc",
        href: "/",    
      },
      {
        title: "被相続人",
        icon: "disc",
        href: "/basic-information/decendent",
      },
      {
        title: "相続人",
        icon: "disc",
        href: "/basic-information/heir-1",
      },
      {
        title: "相続人2",
        icon: "disc",
        href: "/basic-information/heir-2",
      },
    ],
  },  

  //Second  
  {
    id:2,
    title: "財産の入力",
    icon: "home",
    href: "",
    text: "Enter property",
    child: [
      {        
        title: "現金・預貯金",
        icon: "disc",
        href: "/declaration-printing/cash-savings", 
        text: "Cash/savings",   
      },
      {
        title: "有価証券-株式、公債、社債など",
        icon: "disc",
        href: "/declaration-printing/securities",
        text: "Securities - stocks, bonds, corporate bonds, etc.",
      },
      {
        title: "家屋-自宅・賃貸など",
        icon: "disc",
        href: "/declaration-printing/house/",
        text: "House - home, rental, etc.",
      },
      {
        title: "土地",
        icon: "disc",
        href: "/declaration-printing/other-property",
        text: "land",
      },
      {
        title: "その他の財産-自動車 管理残額 代償財産など",
        icon: "disc",
        href: "/declaration-printing/other-property",
        text: "Other Assets - Automobile balance under management Compensatory assets, etc.",
      },
      {
        title: "生命保険金・死亡退職手当金",
        icon: "disc",
        href: "/declaration-printing/life-insurance",
        text: "Life Insurance Benefits/Death and Retirement Benefits",
      },
      {
        title: "葬儀費用",
        icon: "disc",
        href: "/declaration-printing/funeral-expenses",
        text: "funeral expenses",
      },  
      {
        title: "債務",
        icon: "disc",
        href: "/declaration-printing/debt",
        text: "debt",
      },
    ],
  },
  //Third  
  {
    id:3,
    title: "贈与・各種控除",
    icon: "home",
    href: "",
    child: [
      {        
        title: "配偶者居住権の設定",
        icon: "disc",
        href: "/declaration-printing/cash-savings",    
      },
      {
        title: "小規模宅地の特例",
        icon: "disc",
        href: "/declaration-printing/cash-savings-add",
      },
      {
        title: "3年以内贈与・相続時精算課税",
        icon: "disc",
        href: "/declaration-printing/cash-savings/cash-savings-add",
      },
      {
        title: "未成年控除額が本人の税額を超える場合の割振り",
        icon: "disc",
        href: "/declaration-printing/cash-savings/cash-savings-cash",
      },
      {
        title: "障害者控除額が本人の税額を超える場合の割振り",
        icon: "disc",
        href: "/declaration-printing/cash-savings/cash-savings-list",
      },
      {        
        title: "相次相続控除",
        icon: "disc",
        href: "/declaration-printing/cash-savings",    
      },
      {        
        title: "公益法人等への寄附・遺贈",
        icon: "disc",
        href: "/declaration-printing/cash-savings/cash-savings",    
      },
    ],
  },
  {
    id:4,
    title: "申告書の印刷",
    icon: "home",
    href: "/property/declaration-printing",
  },
];

export default Menuitems;
