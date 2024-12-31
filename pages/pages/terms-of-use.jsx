/* eslint-disable no-irregular-whitespace */
import React from "react";
import Header from '../../components/header';
import Footer from '../../components/footer';
import BlankLayout from '../../components/layouts/blank/BlankLayout';

export default function TermsOfUse() {
    return (
        <>
            <Header />
            <div className="term-of-use-wrapper py-10">
            <div className="w-full bg-custom-light-1 py-12">
                    <p className="text-2xl text-center text-black font-semibold">会員登録(無料)</p>
                </div>
                <div className="px-4 lg:px-0 xl:px-0 2xl:px-0 max-w-full lg:max-w-4xl xl:max-w-4xl 2xl:max-w-4xl mx-auto pt-10">
                    <div className="chapter-1 pb-5">
                        <p className="text-center text-lg pb-5">第１章　総則</p>
                        <div className="sub-chapter">
                            <p className="text-base text-primary-color">第１条　（目的）</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">本規約は、株式会社みなと相続コンシェル（以下「当社」といいます。）が提供するサービス（以下「本サービス」といいます。）の利用に関し、当社と会員の間に適用されます。会員は、本サービスの利用にあたり、本規約に同意したものとみなされます。</p>
                        </div>
                    </div>

                    <div className="chapter-2 pb-5">                        
                        <div className="sub-chapter">
                            <p className="text-base text-primary-color">第２条　（定義）</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">本規約において、次の各号に掲げる用語の意味は、当該各号に定めるとおりとします。</p>
                        </div>

                        <div className="sub-chapter py-3">
                            <p className="text-base">（1）会員</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-2">本規約に同意の上、当社と本サービスの利用に関する契約（以下「本利用契約」といいます。）を締結した法人、団体、組合または個人をいいます。</p>
                        </div>

                        <div className="sub-chapter pb-3">
                            <p className="text-base">（2）本サイト</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-2">当社が本サービスを提供するために運営するウェブサイトをいいます。本サービスは、本サイトまたは次号に定義する本ソフトウェアを介して会員に提供されます。</p>
                        </div>

                        <div className="sub-chapter pb-3">
                            <p className="text-base">（3）本ソフトウェア</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-2">当社が本サービスを提供するために作成・公開するアプリケーション・ソフトウェアをいい、アップデート版、修正版、代替品および複製物を含みます。</p>
                        </div>

                        <div className="sub-chapter pb-3">
                            <p className="text-base">（4）登録情報</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-2">本サービスを利用する前提として登録することが求められる、当社が定める一定の会員に関する情報をいいます。</p>
                        </div>

                        <div className="sub-chapter pb-3">
                            <p className="text-base">（5）会員情報</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-2">本サービスのために当社が管理するサーバーに保存された各種情報や通信記録その他の会員の一切の情報をいい、本サービスを通じて当社が提供し、または会員が取得した情報を含みます。</p>
                        </div>
                    </div>

                    <div className="chapter-1 pb-5">
                        <p className="text-base text-primary-color pb-5">第３条　（規約の変更）</p>
                        <div className="sub-chapter">                            
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">1. 当社は、いつでも、会員の事前の承諾を得ることなく、本規約の内容を変更することができます。</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">2. 当社が本規約の内容を変更した場合には、速やかに、その変更内容を会員に通知するものとし、通知において指定された期日以降は、変更後の本規約が適用されます。なお、会員が通知において指定された期日以後に本サービスを利用した場合には、変更後の本規約に同意したものとみなされます。</p>
                        </div>
                    </div>

                    <div className="chapter-1 pb-5">
                        <p className="text-base text-primary-color pb-5">第４条 　（通知）</p>
                        <div className="sub-chapter">                            
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">1. 当社は、本サービスに関連して会員に通知をする場合には、本サイトに掲示する方法または登録情報として登録された電子メールアドレス・住所に宛てて電子メール・文書を送信する方法等、当社が適当と判断する方法で実施します。</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">2. 前項に定める方法により行われた通知は、前者の場合には通知内容が本サイトに掲示された時点に、後者の場合は当社が電子メール・文書を発信した時点に、それぞれその効力を生じるものとします。</p>
                        </div>
                    </div>

                    <div className="chapter-1 pb-5">
                        <p className="text-center text-lg pb-5">第２章　契約の成立</p>
                        <div className="sub-chapter">
                            <p className="text-base text-primary-color">第５条 　（本利用契約の成立（入会））</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">1. 本利用契約は、本サービスの利用を希望する者が、本規約の内容に同意し、登録情報を登録した上で、当社が指定する方法で申込みを行い、これを当社が受諾した時点で成立するものとします。</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">2. 会員は、当社が前項の申込みを受諾した日（以下「契約成立日」といいます。）から本サービスを利用できます。</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">3. 未成年者が本サービスの利用を希望する場合には、法定代理人の同意が必要になります。未成年者が会員となった場合には、本サービスの利用および本規約の内容について、法定代理人の同意があったものとみなします。</p>
                        </div>
                    </div>

                    <div className="chapter-1 pb-5">
                        <p className="text-center text-lg pb-5">第３章　サービス利用上の注意事項</p>
                        <div className="sub-chapter">
                            <p className="text-base text-primary-color">第６条　（会員ID等）</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">1. 会員は、本サービス申込みの際に指定した会員ID（メールアドレス）および会員パスワードを自己の責任において厳重に管理するものとし、これらを用いてなされた一切の行為についてその責任を負います。</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">2. 会員は、自己の責任において、会員ごとに指定されたユーザーIDおよびユーザーパスワードを厳重に管理し、またユーザーをして厳重に管理させるものとし、これらを用いてなされた一切の行為についてその責任を負います。</p>
                        </div>
                    </div>

                    <div className="chapter-1 pb-5">
                        <p className="text-base text-primary-color pb-5">第７条 （登録情報の変更）</p>
                        <div className="sub-chapter">                            
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">1. 会員は、登録情報に変更が生じた場合には、当社が指定する方法により速やかに届出を行います。当社は、登録情報の変更の届出がなされなかったことにより会員に生じた損害について一切の責任を負いません。</p>
                        </div>
                    </div>

                    <div className="chapter-1 pb-5">                        
                        <div className="sub-chapter">
                            <p className="text-base text-primary-color">第８条　（第三者サイト）</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">1. 本サービスにおける当社以外の第三者により運営されるウェブサイトまたはウェブサービス（以下「第三者サイト・サービス」といいます。）との連携は、当社と第三者サイト･サービスの運営者との間の提携、協調、授権その他の一切の協力関係を意味するものではありません。</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">2. 会員は、自己の責任において、第三者サイト・サービスを利用するものとし、当社は、会員による第三者サイト・サービスの利用およびその結果について一切の責任を負いません。</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">3. 第三者サイト・サービスの利用は、会員と第三者サイト・サービスの運営者との間での別途の契約に従います。</p>
                        </div>
                    </div>

                    <div className="chapter-1 pb-5">                        
                        <div className="sub-chapter">
                            <p className="text-base text-primary-color">第９条　（バックアップ）</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">1. 会員は、本サービスを通じて当社が提供し、または会員が取得した情報の全てについて、自己の責任において記録し、保存・管理します</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">2. 会員は、会員情報について、自己の責任においてバックアップ作業（当社が提供する本サービスの機能を利用する場合を含みますが、それに限りません）を行うものとし、当社は、バックアップデータが存在しないこと、または会員がバックアップ作業を適切に実施しなかったこと等により発生した会員の損害および不利益につき、一切の責任を負いません。</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">3. 当社は、会員情報をバックアップとして記録することがあります。ただし、前項に定める会員の責任において行うバックアップを補完するものではなく、会員情報の復旧を保証するものではありません。</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">4. 会員情報の一部が一定期間をもって自動的に消去されることを予め了承します。</p>
                        </div>
                    </div>

                    <div className="chapter-1 pb-5">                        
                        <div className="sub-chapter">
                            <p className="text-base text-primary-color">第１０条　（禁止行為）</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">1. 当社に対して虚偽の申告をする行為</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">2. 本利用契約に基づき当社から提供された本サイト、および本ソフトウェアを含む情報および役務を本サービスの目的以外のために使用する行為</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">3. 当社もしくは第三者の財産（知的財産権を含む。）、プライバシーもしくは信用等を侵害する行為または侵害するおそれのある行為</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">4. 前号以外で当社もしくは第三者の利益を不法に侵害する行為または侵害するおそれのある行為 　本規約その他本サービスに関する契約類に違反する行為または侵害するおそれのある行為</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">5. 法令または本規約に違反し、もしくは公序良俗に反する行為またはそのおそれのある行為</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">6. 第三者の同期先ID等を不正に使用または取得する行為</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">7. コンピュータウィルスなどの有害なプログラムを使用し、もしくは送信する行為、またはそのおそれのある行為</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">8. 第三者の会員IDおよび会員パスワード、ならびにユーザーIDおよび会員パスワードを不正に使用または取得する行為</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">9. 前号に定めるものの他、不正アクセス行為等当社による業務の遂行、本サービスの実施もしくは当社の電気通信設備に支障を及ぼし、またはそのおそれのある行為</p>
                        </div>
                    </div>

                    <div className="chapter-1 pb-5">
                        <p className="text-center text-lg pb-5">第４章　解約・解除（退会）</p>
                        <div className="sub-chapter">
                            <p className="text-base text-primary-color">第１１条 （会員による本サービスの解約）</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">1. 会員は、本サービスのいずれかを利用契約を解約する場合、当社所定の方法により解約手続きを行うこととし、当該解約手続きの完了をもって、当該サービスの利用契約が解約されるものとします。この場合 、会員は自己の責任において、当社からの解約に関する通知を確認するものとします。</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">2. 会員が前項により本利用契約を解約した場合、当社は会員情報を消去することができます。</p>
                        </div>
                    </div>

                    <div className="chapter-1 pb-5">                        
                        <div className="sub-chapter">
                            <p className="text-base text-primary-color">第１２条 （当社による契約解除）</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">1. 当社は、会員が次の各号の一に該当した場合には、会員に対して何らの通知催告をすることなく、本利用契約の一部または全部を解除して会員に対する退会処分を行い、または本サービスの提供を停止することができます。</p>
                            <div className="pl-6">
                                <p className="text-sm tracking-2 leading-7 font-medium mt-3">1. 本規約に違反する行為を行った場合において、催告後相当期間を経過しても当該違反が是正されないとき</p>
                                <p className="text-sm tracking-2 leading-7 font-medium mt-3">2. 第１０条および第１６条に定める禁止行為のいずれかを行うなど、本規約に違反する行為を行った場合において、当該違反の性質からして事後の是正が困難であるとき</p>
                                <p className="text-sm tracking-2 leading-7 font-medium mt-3">3. 現に制限能力者であるか、または制限能力者になった場合において、催告後相当期間を経過しても法定代理人の記名押印のある同意書または追認書の提出がないとき</p>
                                <p className="text-sm tracking-2 leading-7 font-medium mt-3">4. 暴力団その他の反社会的勢力であると当社が合理的に判断した場合</p>
                                <p className="text-sm tracking-2 leading-7 font-medium mt-3">5. 専門家への支払い遅延、未払いが発生した場合</p>
                                <p className="text-sm tracking-2 leading-7 font-medium mt-3">6. 仮差押、差押、競売、破産手続開始、会社更生手続開始、民事再生手続開始等の申立があった場合、または公租公課等の滞納処分を受けた場合</p>
                                <p className="text-sm tracking-2 leading-7 font-medium mt-3">7. 過去に本サービスについて退会処分を受けたことが判明した場合</p>
                                <p className="text-sm tracking-2 leading-7 font-medium mt-3">8. 会員および運用管理者が90日以上にわたって所在不明または連絡不能となった場合</p>
                                <p className="text-sm tracking-2 leading-7 font-medium mt-3">9. その他、当社が会員として不適当であると合理的に判断した場合</p>
                            </div>       
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">2. 前項に基づき会員が退会処分を受けた場合、当社は会員情報を消去することができます。</p>                     
                        </div>
                    </div>

                    <div className="chapter-1 pb-5">                        
                        <div className="sub-chapter">
                        <p className="text-center text-lg pb-5">第４章　解約・解除（退会）</p>
                            <p className="text-base text-primary-color">第１３条　（サービスの停止）</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">1. 当社は、次の各号のいずれかの事由が生じた場合には、本サービスの一部または全部を停止することができます。</p>
                            <div className="pl-6">
                                <p className="text-sm tracking-2 leading-7 font-medium mt-3">1. 本サービス提供にあたり必要なシステム、設備等に障害が発生し、またはメンテナンス、保守もしくは工事等が必要となった場合</p>
                                <p className="text-sm tracking-2 leading-7 font-medium mt-3">2. 電気通信事業者が電気通信サービスの提供を中止するなど、当社以外の第三者の行為に起因して、本サービスの提供を行うことが困難になった場合</p>
                                <p className="text-sm tracking-2 leading-7 font-medium mt-3">3. 非常事態（天災、戦争、テロ、暴動、騒乱、官の処分、労働争議等）の発生により、本サービスの提供が困難になった場合、または困難になる可能性のある場合</p>
                                <p className="text-sm tracking-2 leading-7 font-medium mt-3">4. 法令規制、行政命令等により、本サービスの提供が困難になった場合</p>
                                <p className="text-sm tracking-2 leading-7 font-medium mt-3">5. その他、当社の責めに帰することができない事由により、当社が必要やむを得ないと判断した場合</p>                                
                            </div>       
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">2. 当社は、前項に基づいて本サービスを停止したことにより会員または第三者に損害が発生した場合でも、一切の責任を負いません。</p>                     
                        </div>
                    </div>

                    <div className="chapter-1 pb-5">                        
                        <div className="sub-chapter">
                            <p className="text-base text-primary-color">第１４条　（サービスの変更、中止および終了）</p>
                            <div className="pl-6">
                                <p className="text-sm tracking-2 leading-7 font-medium mt-3">1. 当社は、事前に会員に通知をしたうえで、本サービスの一部もしくは全部の内容を変更、中止または終了することができます。ただし、変更、中止または終了の内容が重大でない場合には、通知をすることなくこれらを実施することができます。</p>
                                <p className="text-sm tracking-2 leading-7 font-medium mt-3">2. 当社は、前項に基づいて本サービスを変更、中止または終了したことにより会員に損害が発生した場合でも、一切の責任を負いません。</p>                                                              
                            </div>       
                        </div>
                    </div>

                    <div className="chapter-1 pb-5">
                        <p className="text-center text-lg pb-5">第６章　本ソフトウェアの提供</p>
                        <div className="sub-chapter">
                            <p className="text-base text-primary-color">第１５条（使用許諾）</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">当社は、本サービスの利用に際して本ソフトウェアをダウンロードした会員に対し、本規約に従うことを条件に、非独占的な使用を許諾します。なお、本ソフトウェアの著作権は当社に帰属します。</p>
                        </div>
                    </div>

                    <div className="chapter-1 pb-5">                        
                        <div className="sub-chapter">
                            <p className="text-base text-primary-color">第１６条（ソフトウェアに関する禁止事項）</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">1. 会員は、本ソフトウェアの利用にあたり、第１０条に定める事項の他、次の各号に定める行為を行ってはいけません。</p>
                            <div className="pl-6">
                                <p className="text-sm tracking-2 leading-7 font-medium mt-3">1. 本ソフトウェアの複製、翻訳、翻案等の改変を行うこと</p>
                                <p className="text-sm tracking-2 leading-7 font-medium mt-3">2. 本ソフトウェアの販売、配布、再使用許諾、公衆送信（送信可能化を含む）、貸与、譲渡、またはリースその他の処分を行うこと</p>
                                <p className="text-sm tracking-2 leading-7 font-medium mt-3">3. 本ソフトウェアに設けられたコピーガード等の技術的な保護手段を回避する方法で使用すること</p>
                                <p className="text-sm tracking-2 leading-7 font-medium mt-3">4. 本ソフトウェアの一部または全部のリバースエンジニアリング、逆コンパイルもしくは逆アセンブルを行い、またはその他の方法でソースコードを抽出すること</p>
                                <p className="text-sm tracking-2 leading-7 font-medium mt-3">5. 第三者が複製できるように本ソフトウェアを公開すること</p>   
                                <p className="text-sm tracking-2 leading-7 font-medium mt-3">6. 前各号に定める他、本ソフトウェアの利用目的に照らして当社が不適切と判断する行為</p>                                
                            </div>       
                        </div>
                    </div>

                    <div className="chapter-1 pb-5">                        
                        <div className="sub-chapter">
                            <p className="text-base text-primary-color">第１７条（利用制限）</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">1. 次の各号に定める場合、会員による本ソフトウェアの利用の一部または全部が制限されることがあります。</p>
                            <div className="pl-6">
                                <p className="text-sm tracking-2 leading-7 font-medium mt-3">1. 利用資格等の確認を目的としたライセンス認証、会員ID等の認証機能において、利用資格等の確認ができない場合</p>
                                <p className="text-sm tracking-2 leading-7 font-medium mt-3">2. インターネット接続ができない場所において本ソフトウェアを利用する場合</p>
                                <p className="text-sm tracking-2 leading-7 font-medium mt-3">3. リアルタイム通信ができない通信状況において本ソフトウェアを利用する場合</p>                                                         
                            </div>       
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">2. 当社は、本ソフトウェアに関するサポート、修正版（アップデート版を含みます）の提供を行う義務を負いません。またあらかじめ会員へ通知を行うことなく、本ソフトウェアの修正、変更、アップデート、または提供の終了を行う場合があります。</p>                     
                        </div>
                    </div>

                    <div className="chapter-1 pb-5">
                        <div className="sub-chapter">
                            <p className="text-base text-primary-color">第１８条（退会に関する注意事項）</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">会員が退会を希望する場合には、第１１条に定める手続きをとらなければならず、使用される端末上で本ソフトウェアを削除または廃棄しただけでは、退会手続きは完了しません。</p>
                        </div>
                    </div>

                    <div className="chapter-1 pb-5">
                        <p className="text-center text-lg pb-5">第７章　一般条項</p>
                        <div className="sub-chapter">
                            <p className="text-base text-primary-color">第１９条 （保証）</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">1. 当社は、本サービスが推奨環境において機能するように合理的な最大限の努力を行います。ただし、当社は、本サービスを通じて当社が提供し、または会員が取得した情報が正確性、正当性、有用性、完全性等を有することを保証するものではありません。</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">2. 当社は、本サービスにより税理士法・弁護士法・行政書士法・司法書士法に定める業務を会員に提供するものではなく、会員は、本サービスを通じて当社が提供し、または会員が取得した情報について、自らの判断および責任において必要に応じ変更、修正等を行ったうえで利用するものとします。</p>
                        </div>
                    </div>

                    <div className="chapter-1 pb-5">
                        <div className="sub-chapter">
                            <p className="text-base text-primary-color">第２０条 （知的財産権）</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">本サービスに関する著作権、著作者人格権、特許権、意匠権、商標権およびパブリシティ権等の知的財産権は当社および正当な権利者たる第三者に帰属し、本利用契約の成立は、本サービスの利用に必要な範囲を超える知的財産権の利用許諾を意味するものではありません。</p>
                        </div>
                    </div>

                    <div className="chapter-1 pb-5">
                        <div className="sub-chapter">
                            <p className="text-base text-primary-color">第２１条 （損害賠償および免責）</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">1. 当社は、本サービスに関して会員に生じた損害については一切その責任を負いません。</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">2. 本サービスに関して会員と第三者との間に紛争が生じた場合、会員は自己の責任と費用で解決するものとし、当社に何ら迷惑をかけず、またこれにより当社が被った損害（弁護士費用を含む。）を補償します。</p>
                        </div>
                    </div>

                    <div className="chapter-1 pb-5">
                        <div className="sub-chapter">
                            <p className="text-base text-primary-color">第２２条 （委託）</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">当社は、本サービスに関する業務の一部または全部を第三者に委託することができるものとします（以下、その場合の当該第三者を「下請業者」といいます。）。</p>
                        </div>
                    </div>

                    <div className="chapter-1 pb-5">
                        <div className="sub-chapter">
                            <p className="text-base text-primary-color">第２３条 （情報管理）</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">1. 当社は、会員情報について、会員の事前の同意を得ずに第三者に開示しません。ただし、次の各号の場合はこの限りではありません。</p>
                            <div className="pl-6">
                                <p className="text-sm tracking-2 leading-7 font-medium mt-3">1. 法令または公的機関からの要請を受け、要請に応じる必要を認めた場合</p>
                                <p className="text-sm tracking-2 leading-7 font-medium mt-3">2. 人の生命、身体または財産の保護のために必要があり、かつ会員の同意を得ることが困難である場合</p>
                                <p className="text-sm tracking-2 leading-7 font-medium mt-3">3. サービス提供のために必要な受託者、または代理人</p>                                                         
                            </div>       
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">2. 前項にかかわらず、当社は、会員情報の属性集計・分析を行い、会員が識別・特定できないように加工したもの（以下「統計資料」といいます。）を作成し、本サービスおよび当社のその他のサービスのために利用することがあります。また、統計資料を第三者に開示することがあります。</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">3. 当社は、会員情報の紛失、破壊、改鼠、漏洩等の危険に対して、合理的な最大限の安全対策を講じます。</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">4. 当社は、電話応対品質向上等のため、会員との間の電話応対を録音し、および録音内容を業務において使用することができます。</p>
                        </div>
                    </div>

                    <div className="chapter-1 pb-5">
                        <div className="sub-chapter">
                            <p className="text-base text-primary-color">第２４条 （個人情報）</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">1. 当社の個人情報の取扱についてはプライバシーポリシーに定めるとおりとします。</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">2. 当社は、本利用契約の終了後も、プライバシーポリシー記載の利用目的の範囲内で本個人情報を利用できるものとします。</p>
                        </div>
                    </div>

                    <div className="chapter-1 pb-5">
                        <div className="sub-chapter">
                            <p className="text-base text-primary-color"> 第２５条　（権利義務の譲渡禁止）</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">会員は、当社の事前の承諾を得ることなく、本利用契約に基づく権利義務を第三者に譲渡し、または承継させてはならないものとします。</p>
                        </div>
                    </div>

                    <div className="chapter-1 pb-5">
                        <div className="sub-chapter">
                            <p className="text-base text-primary-color">第２６条　（準拠法、管轄裁判所）</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">1. 本規約および本利用契約は、日本法によって解釈され、日本法を準拠法とします。</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-3">2. 本規約および本利用契約に関して会員と当社の間に紛争が生じた場合には、東京地方裁判所を第一審の専属的合意管轄裁判所とします。</p>
                            <p className="text-sm tracking-2 leading-7 font-medium mt-7">（2019年7月29日作成）</p>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

TermsOfUse.getLayout = function getLayout(page) {
    return <BlankLayout>{page}</BlankLayout>;
};