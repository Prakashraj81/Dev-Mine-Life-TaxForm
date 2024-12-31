/* eslint-disable no-irregular-whitespace */
import React from "react";
import Header from '../../components/header';
import Footer from '../../components/footer';
import BlankLayout from '../../components/layouts/blank/BlankLayout';

export default function PrivacyPolicy() {
    return(
        <>
            <Header />
            <div className="privacy-policy-wrapper py-10">
                <div className="w-full bg-custom-light-1 py-12">
                    <p className="text-2xl text-center text-black font-semibold">プライバシーポリシー</p>
                </div>
                <div className="px-4 lg:px-28 xl:px-28 2xl:px-28 mx-auto pt-10">
                    <div className="py-3">
                        <p className="text-black text-lg tracking-2 leading-7">このプライバシーポリシーは「株式会社みなと相続コンシェル」（以下「当社」といいます。）が無料相続税申告書作成システム「AI相続」（以下「本サービス」といいます。）の会員から収集した個人情報について、そのプライバシーを保護するために行っている内容を開示しています。</p>
                    </div>
                    <div className="w-full inline-block">
                       <div className="pb-10">
                            <label className="w-full inline-block text-black text-xl font-medium pb-5">1.  基本方針</label>
                            <p className="w-full inline-block text-black text-base tracking-2 leading-7">当社は、以下のとおり個人情報保護方針を定め、個人情報保護の仕組みを構築し、全従業員に個人情報保護の重要性の認識と取組みを徹底させることにより、個人情報の保護を推進します。当社は、このプライバシーポリシーを継続的に見直し改善します。改定する場合はこのページにおいてお知らせします。</p>
                       </div>
                    </div>

                    <div className="w-full inline-block">
                       <div className="pb-10">
                            <label className="w-full inline-block text-black text-xl font-medium pb-5">2. 個人情報の収集方法</label>
                            <p className="w-full inline-block text-black text-sm tracking-2 leading-7 pb-5">当社は、当ウェブサイト及び当サービス内で以下の情報を取得することがあります。</p>
                            <ul className="pb-5 list-disc pl-5">
                                <li>氏名、郵便番号、住所、連絡先に関する情報、会員ID、パスワード</li>
                                <li className="mt-2">会員及び会員の被相続人の名前、生年月日、住所、その他相続税申告書を作成・入力するにあたり当社に提供した情報</li>
                            </ul>
                            <p className="w-full inline-block text-black text-base tracking-2 leading-7">当社は、当ウェブサイト及び当サービス内において適正に個人情報を取得し、不正な手段によって取得することはありません。また、当社が個人情報を第三者から間接的に取得する場合は、当該第三者が本人から適正に取得したものかを確認した上で、利用目的の範囲内で利用します。</p>
                       </div>
                    </div>

                    <div className="w-full inline-block">
                       <div className="pb-10">
                            <label className="w-full inline-block text-black text-xl font-medium pb-5">3. 個人情報の利用目的</label>
                            <p className="w-full inline-block text-black text-sm tracking-2 leading-7 pb-5">当社は、当ウェブサイト及び当サービス内で取得した情報は、以下の目的の範囲内で使用します。</p>
                            <ul className="pb-3 list-disc pl-5">
                                <li>本サービスの提供及び管理の為</li>
                                <li className="mt-2">ユーザーの本サービスの利用状況、稼働状況を案内するため</li>
                                <li className="mt-2">当社のサービス及び、本サービスの改善及び開発のため</li>
                                <li className="mt-2">当社へのお問い合わせ等に対応するため</li>
                                <li className="mt-2">アンケートの実施のため</li>
                                <li className="mt-2">会員に合わせたカスタマイズしたコンテンツを提供するため</li>
                                <li className="mt-2">当社に関する情報等を告知するため</li>
                                <li className="mt-2">本サービス及び当社が実施する関連サービスの提供・改善・開発・マーケティングのため</li>
                            </ul>                            
                       </div>
                    </div>

                    <div className="w-full inline-block">
                       <div className="pb-10">
                            <label className="w-full inline-block text-black text-xl font-medium pb-5">4. 個人情報の第三者への提供</label>
                            <p className="w-full inline-block text-black text-sm tracking-2 leading-7 pb-5">当社は、会員よりお預かりした個人情報を適切に管理し、次のいずれかに該当する場合を除き、個人情報を第三者に開示しません。</p>
                            <ul className="pb-3 list-disc pl-5">
                                <li>会員の同意がある場合</li>
                                <li className="mt-2">会員が希望されるサービスを行なうために、当社が業務を委託する業者に対して開示する場合</li>
                                <li className="mt-2">法令に基づき開示することが必要である場合</li>
                                <li className="mt-2">会員及びその法定代理人または成年後見人が同意を与えた場合</li>
                                <li className="mt-2">人の生命、身体または財産の保護のために必要がある場合であって、ご本人の同意を得ることが困難である場合</li>
                                <li className="mt-2">国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、ご本人の同意を得ることによって当該事務の遂行に支障を及ぼすおそれがある場合</li>
                                <li className="mt-2">当社の利用目的の範囲内で外部の委託先との個人情報の共有が必要になった場合など、委託先への個人情報の提供が必要になった際には、委託先に対し情報管理に関する適切な監督を行った上で提供します。</li>
                            </ul>                            
                       </div>
                    </div>

                    <div className="w-full inline-block">
                       <div className="pb-10">
                            <label className="w-full inline-block text-black text-xl font-medium pb-5">5. ログファイル・クッキー・ウェブビーコン等の技術的情報</label>
                            <ul className="pb-3 pl-5">
                                <li>当ウェブサイト及び当サービスでは、ログファイルの収集、クッキーの送信（広告の効果測定を目的とした第三者サーバーからのクッキー送信を含む）、ウェブビーコンの設置などにより皆様のIPアドレス、アクセス回数、ご利用ブラウザ、OSその他利用端末などの情報を収集しています。</li>
                                <li className="mt-3">スマートフォンアプリをご利用の場合、アプリからご利用の端末のID、Wi-Fi接続に関する情報も取得致します。クッキーは皆様がご利用のブラウザの設定によって受け入れを拒否することができますが、その場合にはウェブサイトのサービスの一部がご利用頂けなくなる可能性があります。</li>
                                <li className="mt-3">これらの情報は、当ウェブサイト及び当アプリの利用傾向の分析や問題発生時の原因究明を目的に収集しており、個人を特定する目的の利用はしておりません。</li>
                            </ul>                            
                       </div>
                    </div>

                    <div className="w-full inline-block">
                       <div className="pb-10">
                            <label className="w-full inline-block text-black text-xl font-medium pb-5">6. 個人情報の本人による開示請求</label>
                            <ul className="pb-3 pl-5">
                                <li>会員は、個人情報保護法に従い、会員ご本人の個人情報の開示、訂正、削除及び利用停止等を請求することができます。</li>
                                <li className="mt-3">個人情報の開示、訂正、削除、消去及び利用停止等のご請求に関するお問い合わせは弊社ホームページのお問い合わせよりご連絡ください。</li>
                                <li className="mt-3">なお、個人情報の開示を行う場合には、当社指定の本人確認書類と手数料（1件あたり1,000円）が必要となり、原則として電磁的記録の提供による方法で通知します。</li>
                            </ul>                            
                       </div>
                    </div>

                    <div className="w-full inline-block">
                       <div className="pb-10">
                            <label className="w-full inline-block text-black text-xl font-medium pb-5">7.  開示に対する法的免責事項</label>
                            <p className="w-full inline-block text-black text-base tracking-2 leading-7">法律の定めにより、国、地方自治体、裁判所、警察その他法律や条例などで認められた権限を持つ機関より要請があった場合には、これに応じて皆様の許可なく情報を開示することがあります。</p>
                       </div>
                    </div>

                    <div className="w-full inline-block">
                       <div className="pb-10">
                            <label className="w-full inline-block text-black text-xl font-medium pb-5">8. 安全管理</label>
                            <p className="w-full inline-block text-black text-base font-medium pb-3">1. 基本方針の策定</p>
                            <ul className="pb-3 pl-6">
                                <li>個人情報の適正な取扱いの確保のため、プライバシーポリシーのほか、個人情報等を含む情報セキュリティに関する基本方針を策定しています。</li>
                            </ul>       

                            <p className="w-full inline-block text-black text-base font-medium pb-3">2. 個人データ等の取り扱いに係る規律の整備</p>
                            <ul className="pb-3 pl-6">
                                <li>個人情報等の取扱いの段階ごとに、その取扱方法、責任者・担当者、及びその任務等について定めた取扱規程を策定しています。</li>
                            </ul>    

                            <p className="w-full inline-block text-black text-base font-medium pb-3">3. 組織的安全管理措置</p>
                            <ul className="pb-3 list-disc pl-10">
                                <li>個人データを取り扱う従業者及び取り扱う個人データの範囲を明確化しています。またアクセス権限の定期的な見直しを実施しています。</li>
                                <li>インシデントへの対応を速やかにできるよう体制を整備しています。</li>
                                <li>個人情報の取り扱いに関して定期的に社内でセキュリティレビューを行います。</li>
                            </ul>      

                            <p className="w-full inline-block text-black text-base font-medium pb-3">4. 人的安全管理措置</p>
                            <ul className="pb-3 list-disc pl-10">
                                <li>個人データの取扱い及び情報セキュリティに関して、全従業者に定期的な研修とその理解度の確認を実施し、さらなる意識の向上を図ります。</li>
                            </ul>    

                            <p className="w-full inline-block text-black text-base font-medium pb-3">5. 物理的安全管理措置</p>
                            <ul className="pb-3 list-disc pl-10">
                                <li>個人情報等が記載・記録された書類や電子記録媒体等を破棄する際は、個人情報等が復元不可能または容易に復元できない方法で行います。</li>
                                <li>個人データを取り扱う機器、電子媒体及び書類等の盗難または紛失を防止するための措置を講じます。</li>
                            </ul>  
                            
                            <p className="w-full inline-block text-black text-base font-medium pb-3">6. 技術的安全管理措置</p>
                            <ul className="pb-3 list-disc pl-10">
                                <li>個人データを取り扱う従業者及び取り扱う個人データを限定しています。</li>
                                <li>ファイアウォール等による外部からの不正アクセスまたは不正ソフトウェアから保護する仕組みを導入しています。</li>
                                <li>個人データを取り扱うシステムに対し、定期的にアップデートを行い最新のセキュリティ情報を取得するように努めます。</li>
                            </ul>                                  
                       </div>
                    </div>

                    <div className="w-full inline-block">
                       <div className="pb-10">
                            <label className="w-full inline-block text-black text-xl font-medium pb-5">9. セキュリティ対策</label>
                            <ul className="pb-3 pl-5">
                                <li>当社は、収集した個人情報保護のためにあらゆる予防措置を講じ、オンライン・オフラインの両方において保護します。</li>
                                <li className="mt-3">ファイアウォール、不正侵入検知、SSLなどの技術を用いて個人情報の取扱には細心の注意を払うと共に、業務上必要とされる権限を与えられた者のみがアクセス可能としています。</li>
                            </ul>                            
                       </div>
                    </div>

                    <div className="w-full inline-block">
                       <div className="pb-10">
                            <label className="w-full inline-block text-black text-xl font-medium pb-5">10. 収集当初の規約と異なった利用に該当する場合</label>
                            <ul className="pb-3 pl-5">
                                <li>当社では収集時点のプライバシーポリシーに記載されている利用目的の範囲を超えて皆様の個人情報を利用することはありません。</li>
                                <li className="mt-3">もし当初の利用目的の範囲を超えて個人情報を利用することになった際には、事前に皆様の同意を得た上で行います。</li>
                            </ul>                            
                       </div>
                    </div>                    

                    <div className="w-full inline-block">
                       <div className="pb-10">
                            <label className="w-full inline-block text-black text-xl font-medium pb-5">11. 収集当初の規約と異なった利用に該当する場合</label>
                            <ul className="pb-3 pl-5">
                                <li>本サービスのウェブサイトには外部のリンクが複数存在します。本プライバシーポリシーの適用範囲はhttps://minatosc.comとなりますので、外部のウェブサイト等での個人情報の取扱についてはリンク先ウェブサイトのプライバシーポリシーをご参照ください。</li>
                            </ul>                            
                       </div>
                    </div>

                    <div className="w-full inline-block">
                       <div className="pb-10">
                            <label className="w-full inline-block text-black text-xl font-medium pb-5">12. お問い合わせ窓口</label>
                            <ul className="pb-3 pl-5">
                                <li>ご意見、ご質問、その他会員情報の取扱に関するお問い合わせは、弊社ホームページのお問い合わせよりご連絡ください。</li>
                            </ul>                            
                       </div>
                    </div>

                    <div className="w-full inline-block">
                       <div className="pb-10">
                            <label className="w-full inline-block text-black text-xl font-medium pb-5">13. 保証及び責任制限（免責事項）</label>
                            <ul className="pb-3 pl-5">
                                <li>当社のウェブサイト及び本サービスの利用は、会員の責任において行われるものとします。</li>
                                <li className="mt-3">当社のウェブサイト及び本サービスにリンクが設定されている他のウェブサイトから取得された各種情報の利用によって生じたあらゆる障害に関して、当社は一切の責任を負いません。</li>
                                <li className="mt-5">株式会社みなと相続コンシェル</li>
                                <li>代表取締役　弥田有三</li>
                                <li className="mt-5">2019年2月1日 制定・施行</li>
                                <li>2022年4月1日 改定</li>
                            </ul>                            
                       </div>
                    </div>       

                </div>
            </div>
            <Footer />
        </>
    )
}

PrivacyPolicy.getLayout = function getLayout(page) {
    return <BlankLayout>{page}</BlankLayout>;
};